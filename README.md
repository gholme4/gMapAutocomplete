# jQuery gMapAutocomplete

A [jQuery][jquery_site] based plug-in that wraps Google's Places Autocomplete


## Usage


```js
$(input_selector).gMapAutocomplete(options);
```

## Options

*	**geolocate**
	Boolean indicating whether or not to bias automcomplete object to the user's geographic location
*	**selectors**
	Object assigning address componemt values to inputs
*	**callback**
	Function that accepts one parameter, an object of address components


#### Examples 
```html
/* Basic example */
<form>
	<input type="text" name="street_address" id="street_address">
</form>

<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places"></script>
<script src="jquery.js"></script>
<script src="gMapAutocomplete.js" async defer></script>
<script>
	$('input#street_address').gMapAutocomplete();
</script>

/* Example with options*/
<form>
	<input type="text" id="street_address">
	<input type="text" name="city" id="city">
	<input type="text" name="state" id="state">
	<input type="text" name="postal_code" id="postal_code">
</form>

<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&libraries=places"></script>
<script src="jquery.js"></script>
<script src="gMapAutocomplete.js" async defer></script>
<script>
	$('input#street_address').gMapAutocomplete({
		geolocation: true
	});
</script>
```

## License

Licensed under the MIT License: <http://deuxhuithuit.mit-license.org>