/**
 * @ngdoc directive
 * @name uiSelectAddRemoveAll
 * @memberOf uiSelectAddRemoveAll
 * @description
 *
 * Angular UI-Select extension. Append "Add all" and "Remove all" feature into multiselect.
 */
angular.module('ui.select.addRemoveAll', []).
	directive("uiSelectAddRemoveAll", function($timeout, $rootScope){

		return {
			restrict: 'A',
			scope: false,
			require: ['^uiSelect'],
			link: function(scope, element, attrs, require) {
				$timeout(function() {
					var originalOnSelectCallback = require[0].onSelectCallback;
					require[0].onSelectCallback = function (self, newItem) {
						// Call origianl callback (if defined in attribute  data-on-select="..."
						if (originalOnSelectCallback) {
							originalOnSelectCallback.apply(this, arguments);
						}
						checkIfAddDeleteAll(newItem.$item, self);
					};


				});

				/**
				 *
				 * @param {string} item - Added item
				 * @param {Object} self - Object "this" for uiSelect
				 *
				 * Appending feature "Add all" and "Remove all"
				 */
				function checkIfAddDeleteAll(item, self) {
					var $modelValue = self.$select.ngModel.$modelValue;
					if (item === '- ADD ALL -') {
						$rootScope.$apply(function($scope) {

							// Remove item "ADD ALL"
							self.$select.selected.pop();

							self.$select.items.map(function(item) {
								if (item !== '- ADD ALL -' && item !== '- REMOVE ALL -') {
									self.$select.selected.push(item);
								}
							})
						});
					}
					if (item === '- REMOVE ALL -') {
						self.$select.selected = [];
					}

					if (item === '- ADD ALL -' || item === '- REMOVE ALL -') {
						// Update remains item in suggestion. Not work automatically because for bug.
						// Bug {@see https://github.com/angular-ui/ui-select/issues/918}
						self.$selectMultiple.updateModel();
						// Resize input box to right width
						$timeout(function() {
							self.$select.sizeSearchInput();
						}, 200);
					}
				}

			}
		};
	});
