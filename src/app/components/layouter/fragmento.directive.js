/**
 * Created by JeanLucas on 21/06/2015.
 */

const FN = new WeakMap();

class FragmentoDirective {
  constructor (fn) {
    FN.set(this, fn);
      this.restrict = 'E';
      this.replace = true;
      this.scope = {
          variaveis: '=',
          item: '=',
          atualizaContent: '=',
          onRemove: '&'
        };
      this.templateUrl =  'app/components/layouter/fragmento.html';
    };

    link (scope, element) {
      var fn = FN.get(FragmentoDirective.instance);
      var draggie = new Draggabilly( element[0], {
        grid: [5,5],
        containment: true,
        handle: '.draggableHandle'
      });

      draggie.on('dragEnd', function() {
        scope.atualizaContent();
      });

      var resizable = element.resizeThis({ noNative: true });

      resizable.on( 'rt:start', function() {
        scope.onHover = true;
        scope.$digest();
      });

      resizable.on( 'rt:stop', function() {
        scope.onHover = false;
        scope.$digest();
        scope.atualizaContent();
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
        removerFragmento: function(){
          scope.onRemove({$item: scope.item});
        },
        left: function(){
          element.find('.draggableContent').css('text-align', 'left');
          scope.atualizaContent();
        },
        right: function(){
          element.find('.draggableContent').css('text-align', 'right');
          scope.atualizaContent();
        },
        center: function () {
          element.find('.draggableContent').css('text-align', 'center');
          scope.atualizaContent();
        },
        size: function (value) {
          element.find('.draggableContent').css('font-size', value);
          scope.atualizaContent();
        },
        variavel: function (value) {
          element.find('.draggableContent').append(' ' + value + ' ');
          scope.selectedVariavel = false;
          scope.onHover = false;
          scope.atualizaContent();
        },
        novaVariavel: function (variavel) {
          variavel = '{' + variavel + '}';
          element.find('.draggableContent').append(' ' + variavel + ' ');
          if(scope.variaveis.indexOf(variavel) === -1){
            scope.variaveis.push(variavel);
          }
          scope.onHover = false;
          scope.atualizaContent();
        },
        corTexto: fn.debounce(function (value) {
          element.find('.draggableContent').css('color', value);
          scope.onHover = false;
          scope.atualizaContent();
        }, 1000)
      };
    }

  static directiveFactory(fn) {
    FragmentoDirective.instance = new FragmentoDirective(fn);
    return FragmentoDirective.instance;
  }
}

FragmentoDirective.directiveFactory.$inject = ['fn'];

export default FragmentoDirective;
