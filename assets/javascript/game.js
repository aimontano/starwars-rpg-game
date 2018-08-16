// boolean - character has not been selected
let hasCharacter = false;
// boolean - defender has not been selected
let hasDefender = false;

$(document).ready(function(){

	$('#characters div').click(function(){
		if(!hasCharacter){
			hasCharacter = true;

			$(this).remove();
			$('#selectedCharacter').append(this);

			$('#enemiesAvailable').append($('#characters div'));
			$('#enemiesAvailable div').css('background', 'red');
			$('#enemiesAvailable div').css('color', 'white');
		} else if(!hasDefender){
			hasDefender = true;

			$(this).remove();
			$('#defender').append($(this));
			$('#defender div').css('background', 'black');
		}
	});


});