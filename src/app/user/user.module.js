import core from '../core/core.module';

import routes from './user.routes';

import LoginController from './login/login.controller';
import ProfileController from './profile/profile.controller';

export default angular.module('app.user', [core])
  .config(routes)

  .controller('LoginController', LoginController)
  .controller('ProfileController', ProfileController)

  .name;
