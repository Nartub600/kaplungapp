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

.controller('RegisterCtrl', function($scope, $http) {
    $scope.terms = 'off';
    $scope.user = {};

    $scope.toggleCheck = function() {
        var image = angular.element(document.getElementById('img-chk-terms'));

        switch ($scope.terms) {
            case 'off':
                $scope.terms = 'on';
                image.attr('src', 'img/checkon.png');
                break;
            case 'on':
                $scope.terms = 'off';
                image.attr('src', 'img/checkoff.png');
                break;
        }
    }

    $scope.register = function() {
        $scope.user.terms = $scope.terms;

        $http.post('http://imaginista.mx/mobileadmin/public/user/register', $scope.user).then(function(resp){
            if (resp.data.status == 'ok') {
                $state.go('loggedin.perfil');
            } else {
                alert(resp.data.status);
            }
        }, function(resp){
            alert(resp.data.status);
        });
    }
})

.controller('LoginCtrl', function($scope, $http, $state, $localstorage) {
    $scope.user = {};

    $scope.login = function(){
        $http.post('http://imaginista.mx/mobileadmin/public/user/login', $scope.user).then(function(resp){
            if (resp.data.status == 'ok') {
                $localstorage.setObject('user', resp.data.user);
                $state.go('loggedin.perfil');
            } else {
                alert(resp.data.status);
            }
        }, function(resp){
            alert(resp.data.status);
        });
    }

})

.controller('LoggedInCtrl', function($scope, $ionicModal) {

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

.controller('PerfilCtrl', function($scope) {

})

.controller('EditarCtrl', function($scope, $localstorage, $http, $state) {

    $scope.user = {};

    $scope.user = $localstorage.getObject('user');

    $scope.update = function(){
        $http.put('http://imaginista.mx/mobileadmin/public/user/update/' + $scope.user.id, $scope.user).then(function(resp){
            if (resp.data.status == 'ok') {
                $localstorage.setObject('user', resp.data.user);
                $state.go('loggedin.perfil');
            } else {
                alert(resp.data.status);
            }
        }, function(resp){
            alert(resp.data.status);
        });
    }

})

.controller('CambiarAvatarCtrl', function($scope) {

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
