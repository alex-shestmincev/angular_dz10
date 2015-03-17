angular.module('myModal', []);

angular.module('myModal').factory('myModalService',function($q,$rootScope, $constroller){

    function open(paramsController,templateURL){

        var $myScope = $rootScope.$new(true); // определение cвоего скоупа на основе $rootScope
        $myScope.$result = $q.defer().promise;
        var $myController = $controller(paramsController, {'$scope':$myScope}); // конроллер нужен  чтобы связать шаблон и скоуп
        $templateRequest(templateUrl).then(function(element){

        });

        return $myScope.$result;
    }




    return {
        open : open
    }

});

angular.module('myModal').controller("MyCtrl",function ($scope) {});
