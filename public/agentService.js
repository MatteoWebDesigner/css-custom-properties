angular
.module('app')
.factory('agentService', function() {
  
  return {
    supportCSSVariable: (CSS && CSS.supports('--is-supported','0')),
    mediumScreen: window.matchMedia('(min-width: 30em)')
  }
})