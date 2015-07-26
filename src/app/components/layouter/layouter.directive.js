/**
 * Created by JeanLucas on 21/06/2015.
 */

class LayouterDirective {
  constructor () {
    'ngInject';

    let directive = {
      restrict: 'E',
      scope: {
          content: '=',
          variaveis: '=',
          template: '='
      },
      templateUrl:  'app/components/layouter/layouter.html',
        link: function (scope) {
        scope.fragmentos = [];

        scope.atualizaContent = atualizaContent;

        scope.ui = {
          adicionarFragmento: function(obj) {
            obj = obj || {
              texto: 'Novo fragmento de texto',
              style: '',
              position: ''
            };

            scope.fragmentos.push(obj);

            atualizaContent();
          }
        };

        scope.setBackground = function (image){
          if(['png','gif','jpg','jpeg'].indexOf(image.getExtension()) === -1){
              return false;
          }

          var fileReader = new FileReader();
          fileReader.readAsDataURL(image.file);
          fileReader.onload = (event) => {
            scope.background = 'url(' + event.target.result + ')';
            scope.$apply();
            atualizaContent();
            scope.$apply();
          };
          return true;
        };

        scope.$watch('template', function(value){
          if(value){
            var html = angular.element($.parseHTML(value));
            var draggable = html.find('.draggable');

            for(var i = 0, l = draggable.length; i < l; i++){
              var draggie = angular.element(draggable[i]);
              var draggableContent = draggie.find('.draggableContent');

              scope.fragmentos.push({
                texto: draggableContent.html(),
                style: draggableContent.attr('style'),
                position: draggie.attr('style')
              });
            }
            scope.background = html.css('background-image');
          }
        });

        function atualizaContent () {
          scope.content = document.querySelectorAll("#layouter .pagina")[0].outerHTML;
        }
      }
    };

    return directive;
  }
}

export default LayouterDirective;