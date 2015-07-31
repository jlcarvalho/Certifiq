class CertificadoCtrl {
  constructor ($stateParams, Restangular, $scope, csv, QueryBuilder) {
    this.Restangular = Restangular;
    this.$stateParams = $stateParams;
    this.$scope = $scope;
    this.csvService = csv;
    var qb = new QueryBuilder();
    var query = qb.isNull('admin', true)
                  .gte('permissao', 5)
                  .fields('nome,email')
                  .query();

    this.info = {};
    this.form = {};
    this.csvFile = false;
    this.pessoas = [];

    var certificado = Restangular.one('certificados', $stateParams.id);

    certificado
      .get()
      .then((res) => {
        this.info = res.data;

        var modelo = Restangular.one('modelos', res.data.modelo);
        modelo.get()
              .then(res => {
                this.variaveis = [];
                for(var i = 0, len = res.data.variaveis.length; i < len; i++){
                  var variavel = res.data.variaveis[i];
                  var string = variavel.substr(1).substr(0, variavel.length - 2);

                  this.variaveis.push(string.charAt(0).toUpperCase() + string.slice(1).toLowerCase());
                }
              });
      });

    certificado
      .one('pessoas')
      .get()
      .then((res) => {
        if(res.error === 1) {
          this.errorMessage = res.data;
        } else {
          this.pessoas = res.data;
        }
      });
  }

  setCSV (file){
    if(['csv'].indexOf(file.getExtension()) === -1) {
        return false;
    }

    var fileReader = new FileReader();
    fileReader.readAsText(file.file);
    fileReader.onload = (event) => {
      this.csvFile = event.target.result;
      this.$scope.$digest();
    };
    return true;
  }

  certificar (form) {
    var certificar = this.Restangular.all('certificar/' + this.$stateParams.id);
    if(!!this.csvFile){
      certificar.post(this.csvService.toJSON(this.csvFile)).then(() => {
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

  codificarDownload (variaveis) {
    if(!!variaveis){
      return encodeURIComponent(variaveis.join(',').toLocaleLowerCase() + '\n');
    }
  }
}

CertificadoCtrl.$inject = ['$stateParams', 'Restangular', '$scope', 'csv', 'QueryBuilder'];

export default CertificadoCtrl;
