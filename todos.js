var eventBus = require("vertx/event_bus");
var console= require("vertx/console");

// Listens for the client initiated event
eventBus.registerHandler("todos.get", function(args, responder) {
   console.log("todos.get");
   eventBus.send('todos.persistor', { action:"find", collection: "todos", matcher: {}}, function(reply) {
     if (reply.status === "ok") {
        responder({todos: reply.results});
     } else {
        console.log(reply.message);
     }
   }); // Mongo find all
}); // registerHandler todos.list

eventBus.registerHandler("todos.put", function (todos, responder) {
   console.log("todos.put"); 
   eventBus.send('todos.persistor', { action:"save", collection: "todos", document: todos}, function(reply) {
     if (reply.status === "ok") {
        todo._id = reply._id;
        console.log("todos.save " + reply._id);
        responder(todo); // respond with the created/updated item 
        // alert others
        console.log("alert: " + reply);
        eventBus.publish("todo.was.saved",todo);
     } else {
        console.log(reply.message);
     }    
   }) // Mongo save
});

