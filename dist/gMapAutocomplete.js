/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// gMapAutocomplete.js


(function ($, window, document, undefined) {
	'use strict';

	$.fn.gMapAutocomplete = function (options) {

		// https://developers.google.com/maps/documentation/geocoding/intro#Types

		var defaultOptions = {
			geolocate: true,
			selectors: {
				street_address: $("#street_address"),
				postal_code: $("#postal_code"),
				state: $("#state"),
				city: $("#city"),
				country: $("#country"),
				county: $("#county")
			},
			callback: null
		};

		var settings = $.extend(defaultOptions, options);

		function init(el) {
			var $el = $(el);

			// Create the autocomplete object, restricting the search to locations with addresses
			var autocomplete = new google.maps.places.Autocomplete($el[0], { types: ['address']
			});

			if (settings.geolocate === true) geolocate(autocomplete);

			// When the user selects an address from the dropdown, populate the address
			// fields in the form.
			autocomplete.addListener('place_changed', function () {
				var place = autocomplete.getPlace();
				console.log(JSON.stringify(place, null, '\t'));

				var addressComponents = {};
				$.each(place.address_components, function (index, ele) {

					addressComponents[ele.types[0]] = { long_name: ele.long_name, short_name: ele.short_name };
				});
				if (typeof settings.callback === "function") settings.callback(addressComponents);

				populateFields(addressComponents);
			});
		}

		function populateFields(addressComponents) {
			console.log(addressComponents);
			if (addressComponents.hasOwnProperty("street_address")) {
				var address = addressComponents.street_address.long_name;
				if (settings.selectors.hasOwnProperty("street_address")) settings.selectors.street_address.val(address);
			} else if (addressComponents.hasOwnProperty("street_number") && addressComponents.hasOwnProperty("route")) {
				var address = addressComponents.street_number.long_name + " " + addressComponents.route.long_name;
				if (settings.selectors.hasOwnProperty("street_address")) settings.selectors.street_address.val(address);
			}

			if (addressComponents.hasOwnProperty("administrative_area_level_1")) {
				var state = addressComponents.administrative_area_level_1.short_name;
				if (settings.selectors.hasOwnProperty("state")) settings.selectors.state.val(state);
			}

			if (addressComponents.hasOwnProperty("administrative_area_level_2")) {
				var county = addressComponents.administrative_area_level_2.long_name;
				if (settings.selectors.hasOwnProperty("county")) settings.selectors.county.val(county);
			}

			if (addressComponents.hasOwnProperty("locality")) {
				var city = addressComponents.locality.long_name;
				if (settings.selectors.hasOwnProperty("city")) settings.selectors.city.val(city);
			}

			if (addressComponents.hasOwnProperty("country")) {
				var country = addressComponents.country.long_name;
				if (settings.selectors.hasOwnProperty("country")) settings.selectors.country.val(country);
			}

			if (addressComponents.hasOwnProperty("postal_code")) {
				var postal_code = addressComponents.postal_code.long_name;
				if (settings.selectors.hasOwnProperty("postal_code")) settings.selectors.postal_code.val(postal_code);
			}
		}

		function geolocate(autocomplete) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
					var geolocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					var circle = new google.maps.Circle({
						center: geolocation,
						radius: position.coords.accuracy
					});
					console.log(geolocation);
					autocomplete.setBounds(circle.getBounds());
				});
			}
		}

		init(this);

		return this;
	};

	// node export
	if (global.module && global.module.exports) {
		module.exports = $.fn.gMapAutocomplete;
	}
})(jQuery, window, document);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ })
/******/ ]);