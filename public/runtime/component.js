angular
    .module('app')
    .component('appRunTime', {
        templateUrl: 'runTime/template.html',
        controller: class controller {
            constructor($scope, agentService) {    
                this.ratio = 50;
            }
        }
    });