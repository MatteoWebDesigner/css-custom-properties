angular
    .module('app')
    .component('appButton', {
        templateUrl: 'button/template.html',
		transclude: true,
		bindings: {
            type: '@'
        }
    });