// gMapAutocomplete.js

(function($, window, document, undefined) {
	'use strict';
	$.fn.gMapAutocomplete = function( options ) {

		var defaultOptions = {
			geolocate: true,
			selectors: {
				street_address : $("#street_address"),
				postal_code : $("#postal_code"),
				state : $("#state"),
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
			var autocomplete = new google.maps.places.Autocomplete(
				$el[0],
				{types: ['address']
			});

			if (settings.geolocate === true)
				geolocate(autocomplete);

			// When the user selects an address from the dropdown, populate the address
			// fields in the form.
			autocomplete.addListener('place_changed', function () {
				var place = autocomplete.getPlace();

				var addressComponents = {};
				$.each(place.address_components, function(index, ele) {
					
					addressComponents[ele.types[0]] = { long_name : ele.long_name, short_name : ele.short_name };

				});
				if (typeof settings.callback === "function")
					settings.callback(addressComponents);

				populateFields(addressComponents);
			});

			return el;
		}

		function populateFields(addressComponents) {
			if ( addressComponents.hasOwnProperty("street_address") )
			{
				var address = addressComponents.street_address.long_name;
				if ( settings.selectors.hasOwnProperty("street_address") )
					settings.selectors.street_address.val(address);
			}
			else if( addressComponents.hasOwnProperty("street_number") && addressComponents.hasOwnProperty("route"))
			{
				var address = addressComponents.street_number.long_name + " " + addressComponents.route.long_name;
				if ( settings.selectors.hasOwnProperty("street_address") )
					settings.selectors.street_address.val(address);
			}

			if ( addressComponents.hasOwnProperty("administrative_area_level_1") )
			{
				var state = addressComponents.administrative_area_level_1.short_name;
				if ( settings.selectors.hasOwnProperty("state") )
					settings.selectors.state.val(state);
			}

			if ( addressComponents.hasOwnProperty("administrative_area_level_2") )
			{
				var county = addressComponents.administrative_area_level_2.long_name;
				if ( settings.selectors.hasOwnProperty("county") )
					settings.selectors.county.val(county);
			}

			if ( addressComponents.hasOwnProperty("locality") )
			{
				var city = addressComponents.locality.long_name;
				if ( settings.selectors.hasOwnProperty("city") )
					settings.selectors.city.val(city);
			}

			if ( addressComponents.hasOwnProperty("country") )
			{
				var country = addressComponents.country.long_name;
				if ( settings.selectors.hasOwnProperty("country") )
					settings.selectors.country.val(country);
			}

			if ( addressComponents.hasOwnProperty("postal_code") )
			{
				var postal_code = addressComponents.postal_code.long_name;
				if ( settings.selectors.hasOwnProperty("postal_code") )
					settings.selectors.postal_code.val(postal_code);
			}
		}

		function geolocate(autocomplete) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					var geolocation = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
					var circle = new google.maps.Circle({
						center: geolocation,
						radius: position.coords.accuracy
					});
					autocomplete.setBounds(circle.getBounds());
				});
			}
		}

		return init(this);

	};

	// node export
	if (global.module && global.module.exports) {
		module.exports = $.fn.gMapAutocomplete;
	}
	
})(jQuery, window, document);


