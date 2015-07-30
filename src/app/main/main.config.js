/**
 * Created by jeanlucasdecarvalhosilva on 29/07/15.
 */
function config ($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
}

config.$inject = ['$compileProvider'];

export default config;
