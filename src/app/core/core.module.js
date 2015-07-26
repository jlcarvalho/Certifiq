import config from './core.config';
import routes from './core.routes';
import Constructor from '../components/constructor/constructor.service.js';

export default angular.module('app.core', [
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'restangular',
    'angular-loading-bar',
    Constructor
   ])
  .config(config)
  .config(routes)
  .name;
