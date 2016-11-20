(function(){
    "use strict";
    
    var supportCSSCustomProperties = window.CSS && CSS.supports('color', 'var(--is-supported)');
    
    angular
        .module('teoStyleCustomProperties', [])
        .directive('teoStyle', function() {

            function cssCustomProperties(elm, css) {
                _.forIn(css, function(value, prop) {
                    if (value) {
                        elm.style.setProperty(prop, value);
                    } else {
                        elm.style.removeProperty(prop);
                    }
                });
            }

            return {
                restrict: 'A',
                scope: {
                    teoStyle: '=',
                    teoStyleCustomPropertiesFallback: '=',
                    teoStyleCustomProperties: '='
                },
                link: function(scope, element, attrs) {
                    function init (){
                        var CSSproperties = {};
                        var CSScustomProperties = {};
                        
                        // reset style
                        element.attr('style','');

                        // process: scope.teoStyle
                        // push properties to CSSproperties or to CSScustomProperties
                        if ( scope.teoStyle ) {
                            _.forIn(scope.teoStyle, function(value, key) {
                                if (_.startsWith(key, '--')) {
                                    CSScustomProperties[key] = value;
                                } else {
                                    CSSproperties[key] = value;
                                }
                            });
                        }

                        // process: scope.teoStyleCustomPropertiesFallback
                        if ( scope.teoStyleCustomPropertiesFallback && !supportCSSCustomProperties ) {
                            _.merge(CSSproperties, scope.teoStyleCustomPropertiesFallback);
                        }

                        // process: scope.teoStyleCustomProperties
                        // merge into CSScustomProperties 
                        if ( scope.teoStyleCustomProperties && supportCSSCustomProperties ) {
                            _.merge(CSScustomProperties, scope.teoStyleCustomProperties);
                        }
                        
                        // DOM add inline css custom properties
                        if ( supportCSSCustomProperties ) {
                            cssCustomProperties(element[0], CSScustomProperties);
                        }
                        
                        // DOM add inline style
                        element.css(CSSproperties);
                    }
                    
                    init();

                    // listen for changes
                    scope.$watch('teoStyle', function(newStyles, oldStyles) {
                        if (newStyles !== oldStyles) {
                            init();
                        }
                    },true);
                    
                    scope.$watch('teoStyleCustomPropertiesFallback', function(newStyles, oldStyles) {
                        if (newStyles !== oldStyles) {
                            init();
                        }   
                    },true);
                    
                    scope.$watch('teoStyleCustomProperties', function(newStyles, oldStyles) {
                        if (newStyles !== oldStyles) {
                            init();
                        }
                    }, true);
                    
                }
            };
        });
})();