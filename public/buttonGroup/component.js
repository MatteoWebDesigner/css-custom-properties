angular
    .module('app')
    .component('appButtonGroup', {
        templateUrl: 'buttonGroup/template.html',
        transclude: true,
        replace: true,
        controller: class ButtonGroup {
            constructor($element, $scope) {
                this.$scope = $scope;
                this.elm = $element[0].querySelector('.app-c-button-group');
                this.width = 0;
                this.contentQuery = this.getCSSCustomProperty("--button-group-content-query-px");
                this.isContentMediaQuery = null;
            }

            $onInit() {
                this.toogleContentMediaQuery();
                
                window.addEventListener('resize', _.debounce(this.digestToogleContentMediaQuery, 150).bind(this));
            }

            toogleContentMediaQuery() {
                this.isContentMediaQuery = this.checkContentMediaQuery();
            }
            
            digestToogleContentMediaQuery () {
                this.toogleContentMediaQuery();
                this.$scope.$digest();
            }

            checkContentMediaQuery() {
                this.width = this.elm.getBoundingClientRect().width;

                return this.width <= this.contentQuery;
            }

            getCSSCustomProperty(cssCustomProp) {
                let value = window
                    .getComputedStyle(this.elm)
                    .getPropertyValue(cssCustomProp)
                    .trim();

                return value - 0; // coercion to number
            }
        }
    });