/**
 * Created by JeanLucas on 26/07/2015.
 */
function run (amMoment, $rootScope, $location, $anchorScroll) {
  amMoment.changeLocale('pt_BR');
  $anchorScroll.yOffset = 71;

  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    if($location.hash()) $anchorScroll();
  });
}

run.$inject = ['amMoment', '$rootScope', '$location', '$anchorScroll'];

export default run;
