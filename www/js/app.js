// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('kipling', ['ionic', 'kipling.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('loggedin', {
    url: '/loggedin',
    templateUrl: 'templates/loggedin.html'
  })

  .state('loggedin.perfil', {
    url: '/perfil',
    views: {
      'loggedin': {
        templateUrl: 'templates/perfil.html',
        controller: 'PerfilCtrl'
      }
    }
  })

  .state('loggedin.editar', {
    url: '/editar',
    views: {
      'loggedin': {
        templateUrl: 'templates/editar-perfil.html',
        controller: 'EditarPerfilCtrl'
      }
    }
  })

  .state('loggedin.actividad', {
    url: '/actividad',
    views: {
      'loggedin': {
        templateUrl: 'templates/actividad.html',
        controller: 'ActividadCtrl'
      }
    }
  })

  .state('loggedin.beneficios', {
    url: '/beneficios',
    views: {
      'loggedin': {
        templateUrl: 'templates/beneficios.html',
        controller: 'BeneficiosCtrl'
      }
    }
  })

  .state('loggedin.changuitos', {
    url: '/changuitos',
    views: {
      'loggedin': {
        templateUrl: 'templates/changuitos.html',
        controller: 'ChanguitosCtrl'
      }
    }
  })

  .state('loggedin.tienda', {
    url: '/tienda',
    views: {
      'loggedin': {
        templateUrl: 'templates/tienda.html',
        controller: 'TiendaCtrl'
      }
    }
  })

  .state('loggedin.musica', {
    url: '/musica',
    views: {
      'loggedin': {
        templateUrl: 'templates/musica.html',
        controller: 'MusicaCtrl'
      }
    }
  })

  .state('loggedin.blog', {
    url: '/blog',
    views: {
      'loggedin': {
        templateUrl: 'templates/blog.html',
        controller: 'BlogCtrl'
      }
    }
  })

})
