angular.module('myModal').factory('myModalService',function($q,$rootScope, $controller, $templateRequest, $compile, $document){

    function open(params){

        var $myScope = $rootScope.$new(true); // определение cвоего скоупа на основе $rootScope
        $myScope.$result = $q.defer();
        $myScope.resolved = false;            // флаг для того чтобы отследить что popup решился

        $myScope.dismiss = function (){       // успешно зарезолвить popup
            $myScope.resolved = true;
            close();
        }

        $myScope.close = function(params){
            close();
        }

        $myScope.$watch('resolved',function(value){  // Следим за решением popup, если он решен, разрешаем промис
            if (value){
                $myScope.$result.resolve(params.resolve);
            }

        });

        var $myController = $controller(params.controller, {'$scope':$myScope}); // конроллер нужен  чтобы связать шаблон и скоуп

        $templateRequest(params.template).then(function(contentHTML){
            var parentPopupDiv = document.createElement('div');
            parentPopupDiv.innerHTML = [
                '<div id="myPopup" style="position:absolute;left:20%;top:20%;background:none;width:400px;height:400px;border:5px solid #000;z-index:9002;">',
                contentHTML,
                '<p style="position: absolute;bottom:0;right:0;">',
                '<input type="button" ng-click="dismiss()" value="resolve"/>',
                '<input type="button" ng-click="close()" value="close"/>',
                '</p>',
                '</div>'
            ].join('');

            document.body.appendChild(parentPopupDiv);              // добавляем в конец body popup
            var compiled = $compile(parentPopupDiv)($myScope);      // связываем елементы и scope для popup
        });

        return $myScope.$result.promise;
    }

    function close(){
        var element = document.getElementById("myPopup").parentElement;
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

