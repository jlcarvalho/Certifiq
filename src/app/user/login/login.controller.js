class LoginCtrl {
  constructor ($rootScope, $state, Restangular, AuthService, AUTH_EVENTS) {
    if(AuthService.isAuthenticated()) {
        $state.go('dashboard');
    }

    this.credentials = {};
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.AuthService = AuthService;
    this.AUTH_EVENTS = AUTH_EVENTS;
    this.service = {
      usuarios: Restangular.all('usuarios')
    };
  }

  cadastro (novo) {
    var self = this;
    if(!!novo && !!novo.username && !!novo.password && !!novo.nome && !!novo.email){
      this.AuthService.newUser({
        username: novo.username,
        password: novo.password,
        nome: novo.nome,
        email: novo.email
      }).then((user) => {
        if(!!user) {
          //self.$rootScope.$broadcast(self.AUTH_EVENTS.loginSuccess);
          //self.$state.go('home');
          self.$state.go('confirm');
        }
      });
    }
  }

  auth (credentials) {
    this.AuthService.login({username: credentials.username, password: credentials.password}).then((user) => {
      if(!!user) {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess);
        this.$state.go('dashboard');
      }
    });
  }

  resetPassaword () {

  }
}

LoginCtrl.$inject = ['$rootScope', '$state', 'Restangular', 'AuthService', 'AUTH_EVENTS'];

export default LoginCtrl;
