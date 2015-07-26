function routes ($stateProvider) {
  'ngInject';
    
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/user/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login',
      data: {
        authorizedRoles: ['all']
      }
    });
}

export default routes;
