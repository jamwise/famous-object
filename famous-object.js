angular.module('famous.angular')
.directive('faObject', ['$famous', '$famousDecorator', 'faObject', function ($famous, $famousDecorator, faObject) {
  return {
    compile: function() {
      var Engine = $famous['famous/core/Engine'];

      return {
        post: function(scope, element, attrs) {
          var isolate = $famousDecorator.ensureIsolate(scope);
          faObject(attrs.faObject,isolate.renderNode);
        }
      };
    }
  };
}]).
factory('faObject', function($rootScope) {
  var faObjects = {};

  return function(name,objectOrMethod) {
    var type = (typeof objectOrMethod === "function") ? "function" : 
               (typeof objectOrMethod === "object") ? "object" : false;

    if(type === "function") {
      $rootScope.$watch(function(){
        return faObjects;
      },function(faObjects){
        objectOrMethod(faObjects[name]);
      });
    } else if(type === "object") {
      faObjects[name] = objectOrMethod;
    }

  };
});