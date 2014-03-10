

todomvc.factory('todoVertx', function () {
  console.log("setup vertx.Eventbus");	

	var eb = new vertx.EventBus(window.location.protocol + '//' +
	                            window.location.hostname + ':' +
	                            window.location.port + '/eventbus');

	eb.onopen = function() {
			console.log("eventbus opened");
		  eb.send('todos.get', {}, function(res) {
					console.log(res.todos);	
					// $scope.todos = res.todos;
					// I am not sure how to get this data back into Angular's $scope and make the UI update
		  });			
	}; //onopen

	return {
		put: function(todo) {
			eb.send("todos.put",todo, function(result) {
				console.log("todos.put finished: " + result._id + " " + result.title + " " + result.completed);
				todo._id = result._id;
			});			
		},
		get: function() {
		  eb.send('todos.get', {}, function(res) {
				console.log(res);
		  });			
		}				
	};
});