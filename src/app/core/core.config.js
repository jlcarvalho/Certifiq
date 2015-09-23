function config (RestangularProvider) {
  RestangularProvider.setDefaultHeaders({"Content-Type": "application/vnd.micro+json"});
  RestangularProvider.addFullRequestInterceptor(function(element, operation, route, url) {
    if(route === 'authenticate') {
      return element;
    }
    if(['post', 'patch'].indexOf(operation) !== -1) {
      let graph = Array.isArray(element) ?
        _.forEach(element, (elem) => {
          return _.assign(elem, {'@type': _.capitalize(route.slice(-1) === 's' ? route.slice(0,-1) : route)})
        }) : [_.assign(element, {'@type': _.capitalize(route.slice(-1) === 's' ? route.slice(0,-1) : route)})];

      element = {};

      element['@graph'] = graph;

      element['@context'] = {};
      element['@context']['@vocab'] = "http://schema.org/";
      element['@context']['µ'] = "http://micro-api.org/";
    }
    return {
      element: element,
      headers: {"Content-Type": "application/vnd.micro+json"}
    };
  });
  RestangularProvider.addResponseInterceptor(function(res, operation, what, url, response) {
    if(response.status === 401){
      toastr.error('Acesso não autorizado. Faça login e tente novamente.');
      window.location.href = "#/login";
    }

    return res;
  });

  RestangularProvider.setErrorInterceptor(function(res, deferred, responseHandler) {
    toastr.error(res.data['µ:error'].description || res.statusText);
    return true;
  })
}

config.$inject = ['RestangularProvider'];

export default config;
