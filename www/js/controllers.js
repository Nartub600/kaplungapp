angular.module('kipling.controllers', [])

.controller('MainCtrl', function($scope) {

    $scope.activeTab = 'perfil';

    $scope.loggedUser = function() {
        return true;
    }

    $scope.setActive = function(tab) {
        $scope.activeTab = tab;
    }

    $scope.isActive = function(tab) {
        return $scope.activeTab === tab;
    }

})

.controller('RegisterCtrl', function($scope) {

    $scope.toggleCheck = function() {
        var checkbox = angular.element(document.getElementById('chk-terms'));
        var image = angular.element(document.getElementById('img-chk-terms'));
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

.controller('PerfilCtrl', function($scope) {

})

.controller('EditarPerfilCtrl', function($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'fade-in'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

})

.controller('ActividadCtrl', function($scope) {

})

.controller('BeneficiosCtrl', function($scope) {

})

.controller('ChanguitosCtrl', function($scope) {

})

.controller('TiendaCtrl', function($scope) {

})

.controller('MusicaCtrl', function($scope) {

})

.controller('BlogCtrl', function($scope) {

})
