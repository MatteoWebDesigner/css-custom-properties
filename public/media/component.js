angular
    .module('app')
    .component('appMedia', {
        templateUrl: 'media/template.html',
        controller: class controller {
            constructor(agentService) {
                this.ratio1 = '0%';
                this.ratio2 = '0%';
                this.ratio3 = '0%';

                // complex calculation
                this.ratio1 = calculate('20%');
                this.ratio2 = calculate('30%');
                this.ratio3 = calculate('10%');

                function calculate(value) {
                    let ratio = {}
                    ratio.percentage = value;
                    ratio.fallback = {};

                    // fallback IE <= 11 and EDGE <= 14
                    if (!agentService.supportCSSVariable) {
                        ratio.fallback = !agentService.mediumScreen.matches ? {
                            height: value
                        } : {
                            width: value
                        };
                    }

                    return ratio;
                }
            }
        }
    });