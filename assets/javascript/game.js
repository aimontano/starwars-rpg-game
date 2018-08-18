$(document).ready(function(){
	// boolean - character has not been selected
	let hasAttacker = false;
	// boolean - defender has not been selected
	let hasDefender = false;
	let attacker, defender, attackerName, defenderName, attackerHealth, defenderHealth;
	let  AttackerObj, DefenderObj;
	let attackPoints, defensePoints, attackerAttackPoints, defenderCounterPoints;	

	const getPoints = (max) => {
		return Math.floor(Math.random() * max) + 1;
	};

	attackPoints = getPoints(20);
	defensePoints = getPoints(30);

	// Character Constructor
	let Character = function (name, healthPoints, attackPoints, counterPoints) {
		this.name = name;
		this.healthPoints = healthPoints;
		this.attackPoints = attackPoints;
		this.counterPoints = counterPoints;
	};

	const reset = () => {
		hasDefender = false;
		defensePoints = getPoints(30);
	};

	$('#characters div').click(function(){
		$('#message').text('');

		// is character has not been selected
		if(!hasAttacker){
			// set character to selected
			hasAttacker = true;
			attacker = this;
			console.log(attacker);

			// remove character from dom
			$(this).remove();
			// append it to selected character div
			$('#selectedCharacter').append(this);

			// append the rest of characters to enemies available
			$('#enemiesAvailable').append($('#characters div'));
			// change the character's background to red and text to white
			$('#enemiesAvailable div').css('background', 'red');
			$('#enemiesAvailable div').css('color', 'white');

			attackerName = attacker.firstElementChild.textContent;
			attackerHealth = parseInt(attacker.lastElementChild.textContent);
			attackerAttackPoints = attackPoints;
			AttackerObj = new Character(attackerName, attackerHealth, attackerAttackPoints, null);
		} else if(!hasDefender){ // if it doesn't have a defender
			// set has defender to true
			hasDefender = true; 
			defender = this;
			console.log(defender);

			// remove from dom
			$(this).remove();
			// append it to defender div and set background to black
			$('#defender h3').after($(this));
			$('#defender div').css('background', 'black');

			defenderName = defender.firstElementChild.textContent;
			defenderHealth = parseInt(defender.lastElementChild.textContent);
			defenderCounterPoints = defensePoints;
			DefenderObj = new Character(defenderName, defenderHealth, null, defenderCounterPoints);	
		}
	});

	$('#attackBtn').click(function(){

		if(hasAttacker && hasDefender){

			$('#message').html("You attacked " + DefenderObj.name + " for " + attackerAttackPoints + " damage. <br>" + DefenderObj.name + " attacked you back for " + defenderCounterPoints + " damage." );

			attackerHealth -= defenderCounterPoints;
			defenderHealth -= attackerAttackPoints;

			attackerAttackPoints += attackPoints;

			if(defenderHealth <= 0) {
				defender.remove();
				defender = '';
				reset();

			}
			if(attacker <= 0) {
				$('#message').text("YOU LOST");
			}

			$(attacker.lastElementChild).text(attackerHealth);
			$(defender.lastElementChild).text(defenderHealth);


		} else {
			$('#message').text("You must select a character and a defender");
		}
	});

});