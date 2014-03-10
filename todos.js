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
}); // registerHandler todos.get

eventBus.registerHandler("todos.put", function(todo, responder) {
   console.log("todos.put: " + todo);

	 // iterate through all todos

		  var stringyTodo = JSON.stringify(todo)
			console.log(stringyTodo);
			
	   eventBus.send('todos.persistor', { action:"save", collection: "todos", document: todo}, function(reply) {
	     if (reply.status === "ok") {
	        todo._id = reply._id;
	        console.log("save " + reply._id);
	   			responder(todo); // respond with the created/updated item 
	     } else {
	        console.log("error: " + reply.message);
	     }    
	   }); // Mongo save
}); // registerHandler todos.put

