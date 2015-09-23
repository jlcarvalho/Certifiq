import config from './core.config';
import routes from './core.routes';
import run from './core.run';
import Constructor from '../components/constructor/constructor.service.js';

export default angular.module('app.core', [
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'restangular',
    'angular-loading-bar',
    'angularMoment',
    Constructor
   ])
  .config(config)
  .config(routes)
  .run(run)
  .name;
