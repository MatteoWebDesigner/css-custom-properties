angular
    .module('app')
    .component('appCascade', {
        templateUrl: 'cascade/template.html',
        controller: class controller {
            constructor() {    
                this.r = 0;
                this.g = 0;
                this.b = 0;
                this.a = 1;
            }
        }
    });