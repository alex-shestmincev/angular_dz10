angular.module('myModal', []);

angular.module('myModal').factory('myModalService',function($q,$rootScope, $controller, $templateRequest, $compile, $document){


    function open(params){

        var $myScope = $rootScope.$new(true); // определение cвоего скоупа на основе $rootScope

        $myScope.$result = $q.defer().promise;


        var $myController = $controller(params.controller, {'$scope':$myScope}); // конроллер нужен  чтобы связать шаблон и скоуп

        $templateRequest(params.template).then(function(contentHTML){

            document.getElementById("popup").innerHTML = '<div id="myModal">' + contentHTML + '</div>';

            var compiled = $compile(document.getElementById("myModal").innerHTML)($myScope);



        });

        return $myScope.$result;
    }

    function close(){
        var element = document.getElementById("myModal");
        if (element){
            element.outerHTML = "";
            delete element;
        }
    }




    return {
        open : open,
        close : close
    }

});

angular.module('myModal').controller("MyCtrl",function ($scope, myModalService) {


    $scope.myModal = function(){

        myModalService.open(
            {template:'myPopup.html',controller:'myPopCtrl'}
        );

    }

    $scope.myModalClose = function(params){
        myModalService.close();
    }

});

angular.module('myModal').controller("myPopCtrl",function ($scope) {
    alert(222);
    $scope.temp = 2;
    $scope.first = 'first';

    $scope.save = function (){
        alert(777);
    }

    $scope.myModalClose = function(params){
        myModalService.close();
    }

});
