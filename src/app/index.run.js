/**
 * Created by JeanLucas on 26/07/2015.
 */
function run (Restangular) {
  Restangular.setDefaultRequestParams({app_key: "5192d7f2-cdac-4e01-9a48-f3ab4f7518ac"});
}

run.$inject = ['Restangular'];

export default run;
