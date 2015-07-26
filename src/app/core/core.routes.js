function routes ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
}

routes.$inject = ['$urlRouterProvider'];

export default routes;
