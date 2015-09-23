function config (RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost:1337/api/');
}

config.$inject = ['RestangularProvider'];

export default config;
