// boolean - character has not bee
let hasCharacter = false;


$(document).ready(function(){

	$('#characters div').click(function(){
		if(!hasCharacter){
			hasCharacter = true;

			$(this).remove();
			$('#selectedCharacter').append(this);

			$('#enemiesAvailable').append($('#characters div'));
			$('#enemiesAvailable div').css('background', 'red');
			$('#enemiesAvailable div').css('color', 'white');
		}
	});


});