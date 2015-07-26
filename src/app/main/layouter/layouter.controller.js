class LayouterCtrl {
  constructor ($state, Restangular) {
    'ngInject';
    this.form = {};
    this.form.variaveis = ['{nome}', '{email}'];

    this.$state = $state;
    this.modelos = Restangular.all('modelos');
    this.certificados = Restangular.all('certificados');

    if($state.params.id) {
      this.certificado = Restangular.one('certificados', $state.params.id);
      this.certificado.get().then((res) => {
        this.form.email = res.data.content;
        this.form.nome = res.data.nome;

        this.modelo = Restangular.one('modelos', res.data.modelo);
        this.modelo.get().then((res) => {
          this.form.variaveis = res.data.variaveis;
          this.form.template = res.data.content;
          this.form.content = res.data.content;
        });
      });
    }

    //var qb = new QueryBuilder();
    //var query = qb.isNull('admin', true)
    //              .gte('permissao', 5)
    //              .fields('nome,email')
    //              .query();
  }

  salvar () {
    if(this.form && this.form.nome && this.form.content){
      if(this.$state.params.id){
        this.modelo.nome = this.form.nome;
        this.modelo.content = this.form.content;
        this.modelo.variaveis = this.form.variaveis;

        this.modelo.put()
                    .then(() => {
                      this.certificado.nome = this.form.nome;
                      this.certificado.content = this.form.email;

                      return this.certificado.put();
                    })
                    .then((certificado) => {
                      this.$state.go('certifiq.certificado', {id: certificado.data.id});
                    });
      } else {
        this.modelos.post({
                      nome: this.form.nome,
                      content: this.form.content,
                      variaveis: this.form.variaveis
                    }).then((modelo) => {
                      return this.certificados.post({
                        nome: this.form.nome,
                        content: this.form.email,
                        modelo: modelo.data.id
                      });
                    }).then((certificado) => {
                      this.$state.go('certifiq.certificado', {id: certificado.data.id});
                    });
      }
    }
  }

  exitValidation () {
    var form = this.$parent.$parent.$parent.layouter.form;
    return !!(form && form.nome);
  }

  exitLayouterValidation () {
    var form = this.$parent.$parent.$parent.layouter.form;
    return !!(form && form.content);
  }
}

export default LayouterCtrl;