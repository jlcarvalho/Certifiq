function routes ($urlRouterProvider) {
  $urlRouterProvider.otherwise('/home');
}

routes.$inject = ['$urlRouterProvider'];

export default routes;
