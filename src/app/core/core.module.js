import config from './core.config';
import routes from './core.routes';

export default angular.module('app.core', [
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'restangular',
    'Constructor',
    'angular-loading-bar'
   ])
  .config(config)
  .config(routes)
  .name;