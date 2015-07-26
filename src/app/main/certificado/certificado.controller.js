class CertificadoCtrl {
  constructor ($stateParams, Restangular, $scope) {
    this.Restangular = Restangular;
    this.$stateParams = $stateParams;
    this.$scope = $scope;
    //var qb = new QueryBuilder();
    //var query = qb.isNull('admin', true)
    //              .gte('permissao', 5)
    //              .fields('nome,email')
    //              .query();

    this.info = {};
    this.form = {};
    this.csv = false;
    this.pessoas = [];

    var certificado = Restangular.one('certificados', $stateParams.id);

    certificado
      .get()
      .then((res) => {
        this.info = res.data;

        var modelo = Restangular.one('modelos', res.data.modelo);
        modelo.get()
              .then(res => {
                this.variaveis = _.map(res.data.variaveis, function(variavel) {
                  return _.capitalize(variavel.substr(1).substr(0, variavel.length - 2));
                });
              });
      });

    certificado
      .one('pessoas')
      .get()
      .then((res) => {
        this.pessoas = res.data;
      });
  }

  setCSV (csv){
    if(['csv'].indexOf(csv.getExtension()) === -1) {
        return false;
    }

    var fileReader = new FileReader();
    fileReader.readAsText(csv.file);
    fileReader.onload = (event) => {
      this.csv = event.target.result;
      this.$scope.$apply();
    };
    return true;
  }

  certificar (form) {
    var certificar = this.Restangular.all('certificar/' + this.$stateParams.id);
    if(!!this.csv){
      certificar.post(CSV2JSON(this.csv)).then(() => {
        location.reload();
      });
    } else {
      if(form && form.nome && form.email){
        certificar.post([{
          nome: form.nome,
          email: form.email
        }]).then(() => {
          location.reload();
        });
      }
    }
  }
}

CertificadoCtrl.$inject = ['$stateParams', 'Restangular', '$scope'];

export default CertificadoCtrl;
