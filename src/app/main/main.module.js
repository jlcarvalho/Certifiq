import core from '../core/core.module';

import config from './main.config';
import routes from './main.routes';

import csv2json from '../components/csv2json/csv2json.service.js';

import HomeController from './home/home.controller';
import LayouterController from './layouter/layouter.controller';
import CertificadoController from './certificado/certificado.controller';

import LayouterDirective from '../../app/components/layouter/layouter.directive';
import FragmentoDirective from '../../app/components/layouter/fragmento.directive';
import ContentEditableDirective from '../../app/components/contenteditable/contenteditable.directive';

export default angular.module('app.main', [core, 'flow', 'mgo-angular-wizard'])
  .config(config)
  .config(routes)

  .service('csv', csv2json)

  .controller('HomeController', HomeController)
  .controller('LayouterController', LayouterController)
  .controller('CertificadoController', CertificadoController)

  .directive('layouter', () => new LayouterDirective())
  .directive('draggableItem', () => new FragmentoDirective())
  .directive('contenteditable', () => new ContentEditableDirective())

  .name;
