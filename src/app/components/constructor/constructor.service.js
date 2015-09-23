/**
 * Created by JeanLucas on 17/04/2015.
 */
'use strict';

var module = angular.module('Constructor', ['restangular', 'LocalStorageModule']);

module.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

module.constant('USER_ROLES', {
  all: 'all',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});

module.service('Session', ['$rootScope', 'Restangular', 'localStorageService', 'AUTH_EVENTS',
  function ($rootScope, Restangular, localStorageService, AUTH_EVENTS) {
  this.create = (token, user, userRole) => {
    this.token = token;
    this.user = user;
    this.userRole = userRole;

    localStorageService.set('token', token);
    localStorageService.set('user', user);
    localStorageService.set('userRole', userRole);

    Restangular.setDefaultHeaders({"access-token": token});

    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
  };
  this.destroy = () => {
    this.token = null;
    this.user = null;
    this.userRole = null;

    localStorageService.remove('token');
    localStorageService.remove('user');
    localStorageService.remove('userRole');

    delete Restangular.configuration.defaultHeaders["access-token"];

    $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
  };
}]);

module.factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS) {

  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
        403: AUTH_EVENTS.notAuthorized,
        419: AUTH_EVENTS.sessionTimeout,
        440: AUTH_EVENTS.sessionTimeout
      }[response.status], response);
      return $q.reject(response);
    }
  };
}]);

module.factory('AuthService', ['Restangular', 'Session', 'USER_ROLES', function (Restangular, Session, USER_ROLES) {
  var authService = {};

  authService.newUser = function (data) {
    return Restangular.all('usuarios').post(data);
  };

  authService.login = function (credentials) {
    return Restangular.all('authenticate').post(credentials, {}, {
      "Content-Type": "application/json"
    }).then(function(res) {
      if(res.success){
        Session.create(
          res.data.token,
          res.data.user,
          res.data.user.isAdmin ? USER_ROLES.admin : USER_ROLES.guest
        );
        return res.data.user;
      }
    });
  };

  authService.isAuthenticated = function () {
    return !!Session.user;
  };

  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return authorizedRoles.indexOf(USER_ROLES.all) !== -1 ||
      (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
  };

  return authService;
}]);

module.factory('AuthResolver', ['$q', '$rootScope', '$state', 'localStorageService', function ($q, $rootScope, $state, localStorageService) {

  return {
    resolve: function () {
      var deferred = $q.defer();
      var unwatch = $rootScope.$watch(function(){
        return localStorageService.get('token');
      }, function (currentUser) {
        if (angular.isDefined(currentUser)) {
          if (currentUser) {
            deferred.resolve(currentUser);
          } else {
            deferred.reject();
            $state.go('login');
          }
          unwatch();
        }
      });
      return deferred.promise;
    }
  };
}]);

module.config(['$httpProvider', 'localStorageServiceProvider', function ($httpProvider, localStorageServiceProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);

  localStorageServiceProvider.setStorageType('sessionStorage');
}]);

module.run(['$rootScope', '$state', 'AUTH_EVENTS', 'USER_ROLES', 'AuthService', 'localStorageService', 'Session',
  function ($rootScope, $state, AUTH_EVENTS, USER_ROLES, AuthService, localStorageService, Session) {
  $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    if (!!localStorageService.get('token')) {
      Session.create(
        localStorageService.get('token'),
        localStorageService.get('user'),
        localStorageService.get('user').isAdmin ? USER_ROLES.admin : USER_ROLES.guest
      );
    } else {
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (AuthService.isAuthenticated()) {
          // user is not allowed
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          // user is not logged in
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
          $state.go('login');
        }
      }
    }
  });

  $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
    $state.go('login');
  });
}]);

module.controller('AppCtrl', ['$scope', 'USER_ROLES', 'AuthService' ,function ($scope, USER_ROLES, AuthService) {
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };
}]);

module.factory('QueryBuilder', function () {
  return QueryBuilder;
});

export default module.name;
