function config (RestangularProvider) {
  RestangularProvider.setBaseUrl('http://certifiq.me/api/v1/');
}

config.$inject = ['RestangularProvider'];

export default config;
