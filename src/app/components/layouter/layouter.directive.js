/**
 * Created by JeanLucas on 21/06/2015.
 */

class LayouterDirective {
  constructor () {
    let directive = {
      restrict: 'E',
      scope: {
          content: '=',
          variaveis: '=',
          template: '='
      },
      templateUrl:  'app/components/layouter/layouter.html',
        link: function (scope, element) {
        scope.fragmentos = [];

        scope.atualizaContent = atualizaContent;

        scope.ui = {
          selecionarBackground: function() {
            let widget = uploadcare.openDialog(null, {
              imagesOnly: true,
              previewStep: true
            });

            widget.done(function(info) {
              info.then(function(file){
                scope.background = file.cdnUrl + file.name;
                atualizaContent();
              })
            });
          },
          removerBackground: function(){
            scope.background = '';
            atualizaContent();
          },
          selecionarImagem: function() {
            let widget = uploadcare.openDialog(null, {
              imagesOnly: true,
              previewStep: true
            });

            widget.done(function(info) {
              info.then(function(file){
                scope.ui.adicionarFragmento({
                  imagem: file.cdnUrl + file.name
                })
              })
            });
          },
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

          scope.removerFragmento = function(item){
            scope.fragmentos.splice(scope.fragmentos.indexOf(item), 1);
          };

        scope.$watch('template', function(value){
          if(value){
            var html = angular.element($.parseHTML(value));
            var draggable = html.find('.draggable');

            for(var i = 0, l = draggable.length; i < l; i++){
              var draggie = angular.element(draggable[i]);
              var draggableContent = draggie.find('.draggableContent');

              let obj = !draggableContent.attr('src') ? {
                texto: draggableContent.html(),
                style: draggableContent.attr('style'),
                position: draggie.attr('style')
              } : {
                imagem: draggableContent.attr('src'),
                style: draggableContent.attr('style'),
                position: draggie.attr('style')
              };

              scope.fragmentos.push(obj);
            }
            scope.background = html.css('background-image');
          }
        });

        function atualizaContent () {
          scope.content = element.find('.pagina').clone().wrap('<div>').parent().html();
          scope.$apply();
        }
      }
    };

    return directive;
  }
}

export default LayouterDirective;
