class LayouterCtrl {
  constructor ($state, Restangular, Session) {
    this.userId = Session.user['µ:id'];

    this.form = {};
    this.form.variaveis = ['{nome}', '{email}'];

    this.$state = $state;
    this.modelos = Restangular.all('modelos');

    if($state.params.id) {
      this.certificado = Restangular.one('modelos', $state.params.id);
      this.certificado.get().then((res) => {
        this.form.email = res['@graph'][0].conteudo;
        this.form.nome = res['@graph'][0].nome;
        this.form.variaveis = JSON.parse(res['@graph'][0].variaveis);
        this.form.template = res['@graph'][0].html;
      });
    }

    //var qb = new QueryBuilder();
    //var query = qb.isNull('admin', true)
    //              .gte('permissao', 5)
    //              .fields('nome,email')
    //              .query();
  }

  salvar () {
    if(this.form && this.form.nome && this.form.template){
      if(this.$state.params.id){
        this.modelos.patch({
          "µ:id": this.$state.params.id,
          nome: this.form.nome,
          html: this.form.html,
          conteudo: this.form.email,
          variaveis: JSON.stringify(this.form.variaveis)
        })
        .then((modelo) => {
            console.dir(modelo)
          this.$state.go('certificado', {id: encodeURIComponent(modelo['@graph'][0]['µ:id'])});
        });
      } else {
        console.dir(this.form)
        this.modelos.post({
          nome: this.form.nome,
          html: this.form.html,
          conteudo: this.form.email,
          variaveis: JSON.stringify(this.form.variaveis)
        }).then((modelo) => {
          console.dir(modelo)
          this.$state.go('certificado', {id: encodeURIComponent(modelo['@graph'][0]['µ:id'])});
        })
      }
    }
  }

  exitValidation () {
    var form = this.$parent.$parent.$parent.layouter.form;
    return !!(form && form.nome);
  }

  exitLayouterValidation () {
    var form = this.$parent.$parent.$parent.layouter.form;
    return !!(form && form.template);
  }
}

LayouterCtrl.$inject = ['$state', 'Restangular', 'Session'];

export default LayouterCtrl;
