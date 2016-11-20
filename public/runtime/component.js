angular
    .module('app')
    .component('appRunTime', {
        templateUrl: 'runtime/template.html',
        controller: class controller {
            constructor($scope, agentService) {    
                this.ratio = 50;
            }
        }
    });