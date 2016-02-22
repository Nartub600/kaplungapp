angular.module('kipling.controllers', [])

.constant('ApiEndpoint', {
        url: 'http://localhost:8100/api'
    })
    // For the real endpoint, we'd use this
    // .constant('ApiEndpoint', {
    //  url: 'http://cors.api.com/api'
    // })

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

.controller('RegisterCtrl', function($scope, $http, $state, $localStorage) {
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

        $http.post('http://imaginista.mx/mobileadmin/public/user/register', $scope.user).then(function(resp) {
            if (resp.data.status == 'ok') {
                alert('Registro satisfactorio');
                $localStorage.setObject('user', resp.data.user);
                $state.go('loggedin.perfil');
            } else {
                alert(resp.data.status);
            }
        }, function(resp) {
            alert(resp.data.status);
        });
    }
})

.controller('RecoveryCtrl', function($scope, $http, $state, $localStorage) {

})

.controller('LoginCtrl', function($scope, $http, $state, $localStorage, $ionicModal, ApiEndpoint, $ionicPopup) {

    $scope.user = {};

    $scope.login = function() {
        $http.post(ApiEndpoint.url + '/login', {
            "user": $scope.user.email,
            "pass": $scope.user.password
        }).then(function(resp) {
                if (resp.status === 200 && resp.data === true) {
                    $localStorage.setObject('user', $scope.user);
                    $state.go('loggedin.perfil');
                } else {
                    //TODO: dar aspecto de kipling, hacelo reutilizable
                    $ionicPopup.show({
                        title: 'El e-mail o contraseña ingresados, no son correctos ',
                        buttons: [{
                            type: 'button-positive',
                            text: 'Aceptar'
                        }]
                    });
                }
            },
            //TODO: dar aspecto de kipling, hacelo reutilizable
            function(resp) {
                $ionicPopup.show({
                    title: 'Por favor verifica que tu dispositivo esté conectado a Internet',
                    buttons: [{
                        type: 'button-positive',
                        text: 'Aceptar'
                    }]
                });
            });
    }

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

.controller('PerfilCtrl', function($scope, $http, ApiEndpoint, $localStorage) {
    $scope.user = $localStorage.getObject('user');

    // $http.post(ApiEndpoint.url + '/pointsByUser', {
    //     "mail": $scope.user.email
    // }).then(function(resp) {
    //     if (resp.status === 200) {
    //         $scope.user.points = resp.data;
    //     } else {
    //         alert('Error inesperado');
    //         console.log("Response", resp);
    //     }
    // }, function(resp) {
    //     alert(resp.data.status);
    // });

    $scope.actualFooterBottom = 0;

    $scope.onDrag = function(event) {
        $scope.footerBottom = {
            'transform': 'translateY(' + ($scope.actualFooterBottom + event.gesture.deltaY) + 'px)'
        }
    }

    $scope.onRelease = function(event) {
        $scope.actualFooterBottom = $scope.actualFooterBottom + event.gesture.deltaY;
    }
})

.controller('EditarCtrl', function($scope, $localStorage, $http, $state, $ionicHistory) {

    $scope.user = {};

    $scope.user = $localStorage.getObject('user');

    $scope.update = function() {
        $http.put('http://imaginista.mx/mobileadmin/public/user/update/' + $scope.user.id, $scope.user).then(function(resp) {
            if (resp.data.status == 'ok') {
                $localStorage.setObject('user', resp.data.user);
                $state.go('loggedin.perfil');
            } else {
                alert(resp.data.status);
            }
        }, function(resp) {
            alert(resp.data.status);
        });
    }

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }

    $scope.logout = function() {

    }

})

.controller('CambiarAvatarCtrl', function($scope, $ionicModal, $ionicHistory) {

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }

    $ionicModal.fromTemplateUrl('modal-unblock.html', {
        scope: $scope,
        animation: 'fade-in'
    }).then(function(modal) {
        $scope.modalUnblock = modal;
    });

    $scope.openModalUnblock = function() {
        $scope.modalUnblock.show();
    };

    $scope.closeModalUnblock = function() {
        $scope.modalUnblock.hide();
    };

    $ionicModal.fromTemplateUrl('modal-change.html', {
        scope: $scope,
        animation: 'fade-in'
    }).then(function(modal) {
        $scope.modalChange = modal;
    });

    $scope.openModalChange = function() {
        $scope.modalChange.show();
    };

    $scope.closeModalChange = function() {
        $scope.modalChange.hide();
    };

})

.controller('ActividadCtrl', function($scope, $ionicHistory) {

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }

})

.controller('BeneficiosCtrl', function($scope) {

})

.controller('ChanguitosCtrl', function($scope) {

})

.controller('TiendaCtrl', function($scope) {

})

.controller('MusicaCtrl', function($scope) {

})

.controller('BlogCtrl', function($scope, blogService, $ionicPopup, $localStorage, $state) {
    blogService.getTopTenFeed().then(function(items) {
        $scope.feed = items;

        $scope.viewPost = function(i) {
            blogService.getPost(i).then(function(item) {
                $state.go('loggedin.blog-detail');
            });
        };

    }, function(e) {
        $ionicPopup.show({
            title: 'Por favor verifica que tu dispositivo esté conectado a Internet',
            buttons: [{
                type: 'button-positive',
                text: 'Aceptar'
            }]
        });
        console.log('Error', e);
    });
})

.controller('BlogDetailCtrl', function($scope, blogService, $state, $localStorage) {
    $scope.post = blogService.getPost();
    $scope.hasNext = !blogService.hasNext();
    $scope.hasPrevious = !blogService.hasPrevious();

    console.log('hasNext', blogService.hasNext());
    console.log('hasPrevious', blogService.hasPrevious());

    $scope.move = function(i) {
        if (i > 0) {
            blogService.loadNext()
        } else {
            blogService.loadPrevious()
        };
        $state.go($state.current, {}, {
            reload: true
        });
    };
});
