var container = require("vertx/container"); 
container.deployModule("io.vertx~mod-web-server~2.0.0-final", 
{ port: 8000, 
	host: "localhost", 
	bridge: true, 
	inbound_permitted: [ 
	  { address: "todos.get" },
	  { address: "todos.put" }
	],
	outbound_permitted: [
    { address: "todo.was.saved" },
    { address: "todo.was.deleted" }
  ]
});

container.deployModule("io.vertx~mod-mongo-persistor~2.0.0-final", {
  address: "todos.persistor",
  db_name: "todos_angular"
});

container.deployVerticle("todos.js");

