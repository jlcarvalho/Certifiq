function config (RestangularProvider) {
  RestangularProvider.addResponseInterceptor(function(res, operation, what, url, response) {
    if(response.status === 401){
      toastr.error('Acesso não autorizado. Faça login e tente novamente.');
      window.location.href = "#/login";
    }
    if(res.error === 1){
      toastr.error(res.message || res.data);
    }
    return res;
  });
}

config.$inject = ['RestangularProvider'];

export default config;
