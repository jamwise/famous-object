#Famous Object

Famous Object is the combination of a service and directive in order to access famous objects directly in your scope.

##Usage

Include faObject in your html after famous-angular:

    <script src="famous-angular/dist/famous-angular.js"></script>
    <script src="famous-object/famous-object.js"></script>

In your markup you can set your object name: 

    <fa-scroll-view fa-object="scrollObject" fa-pipe-from="pipe">

And in your controller you need to inject the faObject service:

    .controller('famousController', function($scope, $famous, faObject)
    
Unfortunately we can't directly access the objects in faObject because famous-angular adds them after the controller is made, so instead we'll have to put in a callback function and faObject will handle listening for changes and applying the code to the object:

    .controller('famousController', function($scope, $famous, faObject) {
      
      faObject("scrollObject",function(scrollObject){
        
        scrollObject.sync.on("start",function(){
          console.log("Scroll Started");
        });
        
      });
      
    });
