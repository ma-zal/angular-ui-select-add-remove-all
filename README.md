"Add all" and "Remove all" feature for [Angular UI-Select](https://github.com/angular-ui/ui-select)
==========================================================

Using
-----
### 1) Install via bower
    bower install angular-ui-select-add-remove-all --save

### 2) Add script

	<script type="text/javascript" src="components/-somewhere-/ui-select-add-remove-all/ui-select-add-remove-all-directive.js"></script>

### 3) Add dependency `ui.select.addRemoveAll`

	angular.module('myApp', [
		'ui.select',
		'ui.select.addRemoveAll'
	]);

### 4) Add directive `ui-select-add-remove-all`

	<ui-select multiple
	           data-ui-select-add-remove-all
			   data-ng-model="$ctrl.selectedCountry"
		>
		<ui-select-choices repeat="country as country in $ctrl.countries | filter: $select.search">
			{{country}}
		</ui-select-choices>
	</ui-select>

### 5) Manually add items "- ADD ALL -" and "- REMOVE ALL -" to item list in controller.

Note: I'm not able to add this two items automatically into existing component yet. It is reason, why you have to do it manually. :-(

	$ctrl.countries = [
		"- ADD ALL -",
		"- REMOVE ALL -",
		"USA",
		"Czech republic",
		"Germany"
	];
	
	