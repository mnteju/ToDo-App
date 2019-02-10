var todoApp = angular.module("todoApp",["ngRoute","ui.bootstrap","angular-sortable-view"]);

todoApp.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "index.html",
        controller: "TodoHomeController",
    });
});

todoApp.controller("TodoHomeController",function($scope, $uibModal){
    // Controller body
    console.log('In controller.');
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
    $scope.task_list = storedTasks;
    $scope.data = {}
    $scope.status_change = {'To Do' : 'Done' , 'Done' : 'To Do'};

    $scope.toggleStatusAction = function(index,status){
        $scope.task_list[index].status = status;
        localStorage.setItem("tasks", JSON.stringify($scope.task_list));
    }
    $scope.update_task_list_order = function(task_list){
        localStorage.setItem("tasks", JSON.stringify(task_list));
    }
    $scope.open_task = function (data,index) {
        if(index != undefined){
            data['index'] = index;
        } else {
            index = 0;
        }
        var modal = $uibModal.open({
            templateUrl: 'edit_task.html',
            controller: function ($scope, $uibModalInstance, data) {
                $scope.task = {};
                if(data){
                    $scope.task = data;
                }
                $scope.status_list = ['To Do', 'Done'];
                $scope.priority_list = ['P0', 'P1', 'P2'];

                $scope.save_task = function () {
                    $uibModalInstance.close();
                    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
                    if (storedTasks){
                        if (data && data['index'] != undefined){
                            storedTasks[index] = $scope.task
                        } else{
                            storedTasks.unshift($scope.task);
                        }
                        localStorage.setItem("tasks", JSON.stringify(storedTasks));
                    } else{
                        var tasks = [];
                        tasks[0] = $scope.task
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                    }
                
                };
                
            
                $scope.cancel = function () {
                    $uibModalInstance.close()
                };
            },
            resolve: {
                data: function () {
                    return data;
                }
            }

        })
        modal.result.then(function(){
            var storedTasks = JSON.parse(localStorage.getItem("tasks"));
            $scope.task_list = storedTasks;
        })
      };
      


});
