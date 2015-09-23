class CertificadoCtrl {
  constructor ($stateParams, Restangular, $scope, csv, QueryBuilder) {
    this.Restangular = Restangular;
    this.$stateParams = $stateParams;
    this.$scope = $scope;
    this.csvService = csv;
    //var qb = new QueryBuilder();
    //var query = qb.isNull('admin', true)
    //              .gte('permissao', 5)
    //              .fields('nome,email')
    //              .query();

    this.info = {};
    this.form = {};
    this.csvFile = false;
    this.pessoas = [];

    let modelo = Restangular.one('modelos', $stateParams.id);

    modelo
      .get()
      .then((res) => {
        this.info = res['@graph'][0];
        this.info.id = $stateParams.id;
        this.variaveis = _.map(JSON.parse(res['@graph'][0].variaveis), (variavel) => {
          let string = variavel.substr(1).substr(0, variavel.length - 2);
          return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        })

        let certificados = Restangular.one('modelos', $stateParams.id).one('certificados');
        certificados.get({
          include: 'pessoas'
        }).then((res) => {
          this.info.total = res['µ:meta'].count;
          this.pessoas = res['@graph'];
        })
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
    var certificar = this.Restangular.all('certificados');
    if(!!this.csvFile){
      certificar.post(_.map(JSON.parse(this.csvService.toJSON(this.csvFile)), (item) => {
        return {
          variaveis: item,
          modelo: {
            "µ:id": this.$stateParams.id
          }
        }
      })).then(() => {
        location.reload();
      });
    } else {
      if(form && form.nome && form.email){
        certificar.post({
          modelo: {
            "µ:id": this.$stateParams.id
          },
          variaveis: {
            nome: form.nome,
            email: form.email
          }
        }).then(() => {
          // ToDo: Sumir com esse reload() daqui e adicionar os itens a lista dinamicamente
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
