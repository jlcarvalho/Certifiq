import core from '../core/core.module';

import routes from './main.routes';

import HomeController from './home/home.controller';
import LayouterController from './layouter/layouter.controller';
import CertificadoController from './certificado/certificado.controller';

import LayouterDirective from '../../app/components/layouter/layouter.directive';
import FragmentoDirective from '../../app/components/layouter/fragmento.directive';
import ContentEditableDirective from '../../app/components/contenteditable/contenteditable.directive';

export default angular.module('app.main', [core, 'flow', 'mgo-angular-wizard'])
  .config(routes)

  .controller('HomeController', HomeController)
  .controller('LayouterController', LayouterController)
  .controller('CertificadoController', CertificadoController)
    
  .directive('layouter', () => new LayouterDirective())
  .directive('draggableItem', () => new FragmentoDirective())
  .directive('contenteditable', () => new ContentEditableDirective())
    
  .name;