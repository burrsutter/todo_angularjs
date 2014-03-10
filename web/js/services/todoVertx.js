

todomvc.factory('todoVertx', function () {
  console.log("setup todoVert.js");	
	return {
		add: function(todo) {
			console.log("* todoVertx.add: " + todo.title + " " + todo.completed);
		},
		update: function(todo) {
			console.log("* todoVertx.update: " + todo.title + " " + todo.completed);			
		},
		remove: function(todo) {
			console.log("* todoVertx.remove: " + todo.title);			
		}		
	};
});