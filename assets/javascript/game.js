$(document).ready(function(){
	let hasAttacker = false;
	let hasDefender = false;
	let hasLost = false;
	let hasWon = false;
	let attacker, defender, attackerName, defenderName, attackerHealth, defenderHealth;
	let  AttackerObj, DefenderObj;
	let attackPoints, defensePoints, attackerAttackPoints, defenderCounterPoints;	
	let charAvailable = $('.character').length;
	const getPoints = (max) => {
		return Math.floor(Math.random() * max) + 1;
	};
	attackPoints = getPoints(20);
	defensePoints = getPoints(30);
	let Character = function (name, healthPoints, attackPoints, counterPoints) {
		this.name = name;
		this.healthPoints = healthPoints;
		this.attackPoints = attackPoints;
		this.counterPoints = counterPoints;
	};
	$('#characters div').click(function(){
		$('#message').text('');
		if(!hasAttacker){
			hasAttacker = true;
			attacker = this;
			console.log(attacker);
			charAvailable--;
			$(this).remove();
			$('#selectedCharacter').append(this);
			$('#enemiesAvailable').append($('#characters div'));
			$('#enemiesAvailable div').css('background', 'red');
			$('#enemiesAvailable div').css('color', 'white');
			attackerName = attacker.firstElementChild.textContent;
			attackerHealth = parseInt(attacker.lastElementChild.textContent);
			attackerAttackPoints = attackPoints;
			AttackerObj = new Character(attackerName, attackerHealth, attackerAttackPoints, null);
		} else if(!hasDefender){ // if it doesn't have a defender
			hasDefender = true; 
			defender = this;
			console.log(defender);
			charAvailable--;
			$(this).remove();
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
			console.log(charAvailable);
			if(attackerHealth <= 0) {
				hasAttacker = false;
				hasLost = true;
				$('#defender').html("<p>You Lost!!!</p><button>Reset</button>").click(function(){location.reload();});
			}else if(defenderHealth <= 0) {
				if(charAvailable == 0 && !hasLost){
					defender.remove();
					defender = '';
					$('#attackBtn').prop('disabled', true);
					$("#message").html('<p>You Won!!!<p><button>Reset</button>').click(function(){location.reload();});
				} else {
					$("#message").text("You defeated " + DefenderObj.name + ". Choose another oponent");
					defenderCounterPoints = 0;
					defender.remove();
					hasDefender = false;
					defensePoints = getPoints(30);
				}
			}
			$(attacker.lastElementChild).text(attackerHealth);
			$(defender.lastElementChild).text(defenderHealth);
		}else if(!hasDefender || !hasAttacker){
			$('#message').text("You must select a character and a defender");
		}
		console.log(charAvailable);
	});
});