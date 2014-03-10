/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $routeParams, todoStorage, todoVertx,filterFilter) {
	// var todos = $scope.todos = todoStorage.get();
	// fetch from Vert.x instead
	var todos = $scope.todos = [];

	$scope.newTodo = '';
	$scope.editedTodo = null;

	$scope.$watch('todos', function (newValue, oldValue) {
		$scope.remainingCount = filterFilter(todos, { completed: false }).length;
		$scope.completedCount = todos.length - $scope.remainingCount;
		$scope.allChecked = !$scope.remainingCount;
		if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
			/*
			for (var key in todos) {
				if (todos.hasOwnProperty(key))  {
				  console.log("key: " + key + " value: " + todos[key]);
					for (var key2 in todos[key]) {
						if(todos[key].hasOwnProperty(key2)) {
				  		 console.log("key: " + key2 + " value: " + todos[key][key2]);							
						}
					} // for
			  }
			} // for			
			*/
			for(var key in todos) {
				todoVertx.put(todos[key]);
   		}
			// todoStorage.put(todos);
		}
	}, 
	true // object equality
	);
  
	// Monitor the current route for changes and adjust the filter accordingly.
	$scope.$on('$routeChangeSuccess', function () {
		var status = $scope.status = $routeParams.status || '';

		$scope.statusFilter = (status === 'active') ?
			{ completed: false } : (status === 'completed') ?
			{ completed: true } : null;
	});

	$scope.addTodo = function () {
		console.log("addTodo");
		var newTodo = $scope.newTodo.trim();
		if (!newTodo.length) {
			return;
		}
		todos.push({ 
			title: newTodo,
			completed: false
		});

		$scope.newTodo = '';
	};

	$scope.editTodo = function (todo) {
		console.log("editTodo");
		$scope.editedTodo = todo;
		// Clone the original todo to restore it on demand.
		$scope.originalTodo = angular.extend({}, todo);
	};

	$scope.doneEditing = function (todo) {
		console.log("doneEditing");
		$scope.editedTodo = null;
		todo.title = todo.title.trim();

		if (!todo.title) {
			$scope.removeTodo(todo);
			return;
		}
	};

	$scope.revertEditing = function (todo) {
		console.log("revertEditing");
		todos[todos.indexOf(todo)] = $scope.originalTodo;
		$scope.doneEditing($scope.originalTodo);
	};

	$scope.removeTodo = function (todo) {
		console.log("removeTodo");	
		todos.splice(todos.indexOf(todo), 1);
	};

	$scope.clearCompletedTodos = function () {
		console.log("clearCompletedTodos");		
		$scope.todos = todos = todos.filter(function (val) {
			return !val.completed;
		});
	};

	$scope.markAll = function (completed) {
		console.log("markAll");				
		todos.forEach(function (todo) {
			todo.completed = !completed;
		});
	};
});
