angular.module('starter.controllers', [])

.controller('RegisterCtrl', function($scope, $state, $ionicViewSwitcher) {

    $scope.toggleCheck = function() {
        var checkbox = angular.element(document.getElementById('chk_terms'));
        var image = angular.element(document.getElementById('img_chk_terms'));
        var value = checkbox.val();

        switch (value) {
            case 'off':
                checkbox.val('on');
                image.attr('src', 'img/checkon.png');
                break;
            case 'on':
                checkbox.val('off');
                image.attr('src', 'img/checkoff.png');
                break;
        }
    }

})

.controller('LoginCtrl', function($scope) {

})
