class HomeController {
  constructor (QueryBuilder, Restangular) {
    'ngInject';
      
    this.certificados = [];

    var certificados = Restangular.one('certificados');

    certificados
      .get()
      .then((res) => {
          this.certificados = res.data;
      });
  }
}

export default HomeController;
