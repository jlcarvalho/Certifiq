class HomeController {
  constructor (Restangular) {

    this.certificados = [];

    var certificados = Restangular.one('certificados');

    certificados
      .get()
      .then((res) => {
          this.certificados = res.data;
      });
  }
}

HomeController.$inject = ['Restangular'];

export default HomeController;
