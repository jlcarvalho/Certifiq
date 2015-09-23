class DashboardController {
  constructor (Restangular, Session) {

    this.certificados = [];

    var certificados = Restangular.one('usuarios', Session.user['µ:id']).one('modelos');

    certificados
      .get()
      .then((res) => {
        console.dir(res['@graph'])
          this.certificados = res['@graph'];
      });
  }
}

DashboardController.$inject = ['Restangular', 'Session'];

export default DashboardController;
