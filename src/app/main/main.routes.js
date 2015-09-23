function routes ($stateProvider) {
  var resolver = {
    auth: ['AuthResolver', function (AuthResolver) {
        return AuthResolver.resolve();
    }]
  };

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'app/main/home/home.html',
      controller: 'HomeController',
      controllerAs: 'home',
      data: {
        authorizedRoles: ['all']
      }
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/main/dashboard/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboard',
      data: {
        authorizedRoles: ['guest']
      },
      resolve: resolver
    })
    .state('layouter', {
      url: '/certificado/novo/:id',
      templateUrl: 'app/main/layouter/layouter.html',
      controller: 'LayouterController',
      controllerAs: 'layouter',
      data: {
        authorizedRoles: ['guest']
      },
      resolve: resolver
    })
    .state('certificado', {
      url: '/certificado/:id',
      templateUrl: 'app/main/certificado/certificado.html',
      controller: 'CertificadoController',
      controllerAs: 'certificado',
      data: {
        authorizedRoles: ['guest']
      },
      resolve: resolver
    });
}

routes.$inject = ['$stateProvider'];

export default routes;
