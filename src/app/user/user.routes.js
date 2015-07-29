function routes ($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/user/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login',
      data: {
        authorizedRoles: ['all']
      }
    })
    .state('confirm', {
      url: '/confirm',
      templateUrl: 'app/user/confirm/confirm.html',
      data: {
        authorizedRoles: ['all']
      }
    });
}

routes.$inject = ['$stateProvider'];

export default routes;
