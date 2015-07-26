/**
 * Created by JeanLucas on 21/06/2015.
 */

class FragmentoDirective {
  constructor () {
    let directive = {
      restrict: 'E',
      scope: {
          variaveis: '=',
          item: '=',
          atualizaContent: '='
        },
        templateUrl:  'app/components/layouter/fragmento.html',
        link: function (scope, element) {
        var draggie = new Draggabilly( element[0], {
          grid: [5,5],
          containment: true,
          handle: '.draggableHandle'
        });

        draggie.on( 'dragEnd', function() {
          scope.$apply();
        });

        scope.popover = {
          template: 'myPopoverTemplate.html'
        };

        scope.sizes = [
          { name: '10px', size: '10px' },
          { name: '12px', size: '12px' },
          { name: '14px', size: '14px' },
          { name: '16px', size: '16px' },
          { name: '20px', size: '20px' },
          { name: '24px', size: '24px' },
          { name: '32px', size: '32px' },
          { name: '48px', size: '48px' },
          { name: '60px', size: '60px' }
        ];
        scope.selectedSize = scope.sizes[3];
        scope.selectedCor = '#000';

        scope.ui = {
          left: function(){
            element.find('.draggableContent').css('text-align', 'left');
            scope.atualizaContent();
            scope.$apply();
          },
          right: function(){
            element.find('.draggableContent').css('text-align', 'right');
            scope.atualizaContent();
            scope.$apply();
          },
          center: function () {
            element.find('.draggableContent').css('text-align', 'center');
            scope.atualizaContent();
            scope.$apply();
          },
          size: function (value) {
            element.find('.draggableContent').css('font-size', value);
            scope.atualizaContent();
            scope.$apply();
          },
          variavel: function (value) {
            element.find('.draggableContent').append(' ' + value + ' ');
            scope.selectedVariavel = false;
            scope.atualizaContent();
            scope.$apply();
          },
          novaVariavel: function (variavel) {
            variavel = '{' + variavel + '}';
            element.find('.draggableContent').append(' ' + variavel + ' ');
            if(scope.variaveis.indexOf(variavel) === -1){
              scope.variaveis.push(variavel);
            }
            scope.atualizaContent();
            scope.$apply();
          },
          corTexto: function (value) {
            element.find('.draggableContent').css('color', value);
            scope.atualizaContent();
            scope.$apply();
          }
        };
      }
    };

    return directive;
  }
}

export default FragmentoDirective;
