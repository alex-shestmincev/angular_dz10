angular.module('myModal', []);

angular.module('myModal').controller("MyCtrl",function ($scope, myModalService) {

    $scope.myModalOpen = function(){
        myModalService.open({
            template:'myPopup.html',
            controller:'myPopCtrl',
            resolve: {
                res:  function(){
                    return 'success';
                }
            }
        }).then(
            function(data){
                alert(data);
                console.log(data);
            },
            function(data){
                alert(data);
            },
            function(){
                console.log('notice');
            }
        );
    }

    $scope.myModalClose = function(params){
        myModalService.close();
    }
});

angular.module('myModal').controller("myPopCtrl",function ($scope, myModalService) {


});
