
	let getToken = new Promise((resolve, reject) => {
		let clientSecret = '9a5c097853634f63bafd6613af5db317';
		let clientId = 'a73c194f38364ed2acd27f5b1ccfcdbe';
		let encodedData = window.btoa(clientId + ':' + clientSecret);
	
		theUrl = 'http://spot-the-song.herokuapp.com/token';
		// 	let  xmlHttp = new XMLHttpRequest();
		// 	xmlHttp.open( 'GET', theUrl, true ); // false for synchronous request
		// 	xmlHttp.send( null );
		// //	console.log(xmlHttp);
		// 	if (xmlHttp.status=== 200) {
		// 		console.log("here");
		// 		resolve(xmlHttp);
		// 	}

		$.ajax({
			type: 'GET',
			url: theUrl,
			success: (data) => {
				resolve(data);
			},
			error: (err)	=>{
				console.log(err.responseText);
			},
		});
		});
		
	getToken.then((success) => {
		console.log((success));
	});
	
	let jsonArray = [];
	let token;
	$(document).ready(function() {
		console.log('hello2');
		$('#song-search2').keypress(function() {
			console.log('hello');
		let searchString = $('#song-search2').val();
		console.log(searchString);
		getToken.then((success) => {
			token = success;
			return $.ajax({
				type: 'GET',
				url: 'https://api.spotify.com/v1/search?q=' + searchString + '&type=track&limit=10', 
				headers: {'Authorization': 'Bearer ' + token},
				success: (data) => {
					console.log(data);
					
					$('#search-results').html('');
					let seenSoFar = [];
					data.tracks.items.forEach(function(item) { 
						let artistName = item.artists[0].name;
						console.log(artistName);
						if (!(seenSoFar.includes(artistName))) {
							jsonArray.push(item);
							seenSoFar.push(artistName);
							let $div = $('<div></div>', {class: 'searchResult'});
							let $span = $('<span></span>', {id: 'songName'});
							let $span2 = $('<span></span>');
							$span.append(item.name);
							$span2.append(artistName); 
							$div.append($span);
						
							$div.append($span2);
							// let $option = $('<option></option>');
							// $option.val(fullString);
							$('#search-results').append($div);
						}
						return data;
					});
				},
			});
		}).catch((err)=>{
console.log(err);
});
	});
	});
	
	
	$('#search-results').on('click', '.searchResult', function() {
		let song = this.firstChild.textContent;
		let artist = this.lastChild.textContent;
	
		console.log(jsonArray);
		$.each(jsonArray, function(i, item) {
			if (jsonArray[i].name === song && jsonArray[i].artists[0].name === artist) {
				let id = jsonArray[i].id;
				$.ajax({
					type: 'GET',
					url: 'https://api.spotify.com/v1/audio-features/' + id,
					headers: {'Authorization': 'Bearer ' + token},
					success: (data)=>{
						let bpm = (Math.floor(data.tempo));
						$('#result').html('');
						let txt = song + ' has a BPM of ';
						$('#result').append(txt);
						$('#result').append(bpm);
					},
				});
			}
		});
	});
