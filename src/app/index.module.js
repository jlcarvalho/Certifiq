import core from './core/core.module';
import main from './main/main.module';
import user from './user/user.module';

import config from './index.config';
import routes from './index.routes';
import run from './index.run';

import NavbarDirective from '../app/components/navbar/navbar.directive';

angular.module('app', [core, main, user])
  .config(config)
  .config(routes)
  .run(run)

  .directive('navbar', () => new NavbarDirective());
