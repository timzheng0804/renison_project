import angular from 'angular';
export default angular.module('exceptionOverride', []).factory('$exceptionHandler', function() {
  return function(exception, cause) {
    exception.message += ' (caused by "' + cause + '")';
    console.log('I caught exception', exception.message);
    throw exception;
  };
})
.name;