let hasCharacter = false;


$(document).ready(function(){

	$('#characters div').click(function(){
		if(!hasCharacter){
			hasCharacter = true;
			$(this).remove();
			$('#selectedCharacter').append(this);
		}
	});


});