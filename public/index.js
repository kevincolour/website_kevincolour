
	let getToken = new Promise((resolve, reject) => {
		let clientSecret = '9a5c097853634f63bafd6613af5db317';
		let clientId = 'a73c194f38364ed2acd27f5b1ccfcdbe';
		let encodedData = window.btoa(clientId + ':' + clientSecret);
	
		theUrl = 'https://spot-the-song.herokuapp.com/token';


		$.ajax({
			type: 'GET',
			url: theUrl,
			success: (data) => {
				resolve(data);
			},
			error: (err)	=>{
				console.log('ERROR',err.responseText);
			},
		});
		});
	let jsonArray = [];
	let token;
	$(document).ready(function() {
	
		$('#song-search2').keyup(function() {
			
		let searchString = $('#song-search2').val();
		
		getToken.then((success) => {
			token = success;
			return $.ajax({
				type: 'GET',
				url: 'https://api.spotify.com/v1/search?q=' + searchString + '&type=track&limit=10', 
				headers: {'Authorization': 'Bearer ' + token},
				success: (data) => {
					
					
					$('#search-results').html('');
					let seenSoFar = [];
					data.tracks.items.forEach(function(item) { 
						let artistName = item.artists[0].name;
						
						if (!(seenSoFar.includes(artistName))) {
							jsonArray.push(item);
							seenSoFar.push(artistName);
							let $div = $('<div></div>', {class: 'searchResult'});
							let $span = $('<span></span>', {class: 'songName'});
							let $span2 = $('<span></span>', {id : 'artistName'});
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
console.log('error:', err);
});
	});
	});
	
	
	$('#search-results').on('click', '.searchResult', function() {
		let song = this.firstChild.textContent;
		let artist = this.lastChild.textContent;
	
		$.each(jsonArray, function(i, item) {
			if (jsonArray[i].name === song && jsonArray[i].artists[0].name === artist) {
				let id = jsonArray[i].id;
				$.ajax({
					type: 'GET',
					url: 'https://api.spotify.com/v1/tracks/' + id,
					headers: {'Authorization': 'Bearer ' + token},
					success: (data)=>{
							
						let pop = (Math.floor(data.popularity));

						$('#result').html('');
						let $span = $('<span></span>', {class: 'songName'});
						$span.append(song);
						$('#result').append($span);
						let txt = ' has a Popularity of ';
						$('#result').append(txt);
						let $span2 = $('<span></span>', {id : 'popularity'})
						$span2.append(pop);
						$('#result').append($span2);
					},
				});
			}
		});
	});
