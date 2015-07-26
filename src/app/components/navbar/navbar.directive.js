class NavbarDirective {
  constructor () {
    'ngInject';

    let directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'navbar',
      bindToController: true
    };

    return directive;
  }
}

class NavbarController {
  constructor (AuthService, AUTH_EVENTS, Session, $scope, $state) {
      'ngInject';
      this.currentState = '';
      
      this.logged = AuthService.isAuthenticated();
      this.Session = Session;
      
      $scope.$watch(function(){
          return $state.current.name;
      }, (state) => {
          this.currentState = state;
      });
    
      
      $scope.$on(AUTH_EVENTS.logoutSuccess, () => {
         this.logged = AuthService.isAuthenticated(); 
      });
      
      $scope.$on(AUTH_EVENTS.loginSuccess, () => {
         this.logged = AuthService.isAuthenticated(); 
      });
  }

  logout () {
    this.Session.destroy();
  }
}

export default NavbarDirective;
