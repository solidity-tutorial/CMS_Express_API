angular.module("clientModule",[])
    .component("clientsystem",{
        templateUrl:"app/client-management-system/client-management-system.component.html",
        controller:function($scope,$http){
            $scope.title="client management system";
            $scope.clientList = {}; //empty client List
			$scope.dataList = [];
			//CREATE
		
            $scope.addClient = function(){
                $http({
					url: 'http://localhost:5000/create',
					method: 'POST',
					data: $scope.clientList
				}).then(function (httpResponse) {
						alert(httpResponse.data.message);
				});
				
            };
            
            //UPDATE
            $scope.updateClient = function(){
               $http({
					url: 'http://localhost:5000/update',
					method: 'PUT',
					data: $scope.clientList
				}).then(function (httpResponse) {
						alert(httpResponse.data.message);
				});
				
            }
			
           //DELETE
            $scope.deleteClient = function(client){
                var Id = client.id;
               
                $http({
					method : 'DELETE',
					url : 'http://localhost:5000/delete/'+Id
					
				}).then(function (httpResponse) {
						alert(httpResponse.data.message);
				}).catch(function(err){console.log(err);});
            }
			
			$scope.retrieveAll = function(){
				$http({
					url: 'http://localhost:5000/retrieve',
					method: 'GET'
				}).then(function (httpResponse) {
					$scope.dataList = httpResponse.data;
				});
			}
			
        }
    });
