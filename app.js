//angular.js Concrete Factory example

var app = angular.module('plunker', ['ngWebSocket']);
app.controller('HelloCtrl',HelloCtrl) 

// Concrete Factory
app.factory('ChoirBoyFactory', function () {

});

function HelloCtrl($scope, ChoirBoyFactory,$websocket) {
  console.log("heelo"); 
   var vm = this;
   vm.name = "trinethra";
   vm.messagesList = [];
    var dataStream = $websocket('wss://echo.websocket.org');

      var collection = [];
      vm.send = function(){
        vm.messagesList.push({'value':vm.newMessage,"type":"send"});
          // dataStream.send(JSON.stringify(vm.newMessage));
          dataStream.send(vm.newMessage);
          console.log("sent");
          vm.newMessage ="";
      };
      dataStream.onClose(function(message){
        console.log("onClose:",message);
      });
      dataStream.onError(function(message){
        console.log("onError:",message);
      })
      dataStream.onMessage(function(message) {
        // collection.push(JSON.parse(message.data));
        vm.messagesList.push({'value':message.data,"type":"receive"});
        debugger;
        console.log("onMessage::",message);
      });
      dataStream.onOpen(function(data){
        console.log("onOpen:",data);
        
      })
  // wss://echo.websocket.org
}
