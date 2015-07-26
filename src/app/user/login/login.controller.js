class LoginCtrl {
  constructor ($rootScope, $state, Restangular, AuthService, AUTH_EVENTS) {
      'ngInject';
    if(AuthService.isAuthenticated()) {
        $state.go('home');
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
    this.AuthService.newUser({
      user: novo.username,
      password: novo.password,
      nome: novo.nome,
      email: novo.email
    }).then((user) => {
      if(!!user) {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess);
        this.$state.go('home');
      }
    });
  }

  auth (credentials) {
    this.AuthService.login({user: credentials.username, password: credentials.password}).then((user) => {
      if(!!user) {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess);
        this.$state.go('home');
      }
    });
  }

  resetPassaword () {

  }
}

export default LoginCtrl;