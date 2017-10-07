function Character(name, health, power, counter) {
	this.name = name;
	this.baseHP = health;
	this.health = this.baseHP;
	this.basepwr = power;
	this.attack = this.basepwr;
	this.counter = counter;

	this.getHealthPercent = function() {
		return Math.floor(this.health / this.baseHP * 100);
	}

	this.setDamage = function(pwr) {
		this.health -= pwr;

		if(this.health > 0) {
			this.attack += this.basepwr;
			return true;
		}
		else {
			this.health = 0;
			return false;			
		}
	}
}

$(document).ready(function() {
	var gameInstruction = [
		"SELECT YOUR CHARACTER...",
		"SELECT OPPONENT...",
		"FIGHT! FIGHT! FIGHT!"
	];

	var actDescription = [
		"THERE IS NO YOUR CHARACTER!",
		"THERE IS NO OPPONENT!",
		"&nbsp;",
		"YOU'VE BEEN DEFEATED... GAME OVER!",
		"YOU'VE WON... GAME OVER!",
	];

	var charRyu = new Character("RYU", 120, 8, 18);
	var charKen = new Character("KEN", 180, 6, 20);
	var charChunli = new Character("CHUN-LI", 110, 23, 5);
	var charGuile = new Character("GUILE", 150, 7, 15);

	var charArray = [charRyu, charKen, charChunli, charGuile];

	for(var i=0; i<charArray.length; i++) {
		$("#"+charArray[i].name).text(charArray[i].health);
		$("#"+charArray[i].name).attr("style", "width:"+charArray[i].getHealthPercent()+"%");
	}

	var yourChar;
	var oppoChar;
	var remainOpponent = charArray.length - 1;

	// gameStep
	// - 0: select character
	// - 1: select opponent
	// - 2: ready to fight
	// - 3: done (lose)
	// - 4: done (win)
	var gameStep = 0;
	$("#gameInst").text(gameInstruction[gameStep]);

	$(".charGrp").hover(function(event) {
		if($(this).attr("selchar") === "no") {
			if(event.type === "mouseenter") {
				$(this).css("background-color", "#f00");
			}
			else if(event.type === "mouseleave") {
				$(this).css("background-color", "#fff");
			}
		}
	});

	$(".charGrp").on("click", function() {
		if($(this).attr("selchar") === "no") {
			var idx = $(this).attr("idxval");
			switch(gameStep) {
			case 0:
				yourChar = charArray[parseInt(idx)];
				$(this).css("background-color", "#fff");
				$(this).attr("selchar", "yes");
				$("#yourchar").append($(this));

				gameStep = 1;
				$("#gameInst").text(gameInstruction[gameStep]);

				break;

			case 1:
				oppoChar = charArray[parseInt(idx)];
				$(this).css("background-color", "#fff");
				$(this).attr("selchar", "yes");
				$("#oppochar").append($(this));

				gameStep = 2;
				$("#gameInst").text(gameInstruction[gameStep]);

				break;

			default:
				break;
			}
		}
	});

	$("#attack").on("click", function() {
		if(gameStep === 2) {
			var dispMsg = ("You attacked " + oppoChar.name + " for " + yourChar.attack + " damage. ");
			if(!oppoChar.setDamage(yourChar.attack)) {
				// opponent dead
				dispMsg += (oppoChar.name + " is DEAD.");


				$("#oppochar").html("<h3>Opponent</h3>");

				remainOpponent--;
				if(remainOpponent <= 0) {
					gameStep = 4;
					dispMsg = actDescription[gameStep];
				}
				else {
					gameStep = 1;
				}
			}
			else {
				$("#"+oppoChar.name).text(oppoChar.health);
				$("#"+oppoChar.name).attr("style", "width:"+oppoChar.getHealthPercent()+"%");

				dispMsg += (yourChar.name + " attacked you back for " + oppoChar.counter + " damage.");
				if(!yourChar.setDamage(oppoChar.counter)) {
					// your character dead

					$("#"+yourChar.name).text("0");
					$("#"+yourChar.name).attr("style", "width:0%");

					gameStep = 3;
					dispMsg = actDescription[gameStep];
				}
				else {
					$("#"+yourChar.name).text(yourChar.health);
					$("#"+yourChar.name).attr("style", "width:"+yourChar.getHealthPercent()+"%");
				}
			}

			$("#actDesc").html(dispMsg);
		}
		else {
			$("#actDesc").html(actDescription[gameStep]);
		}

		if((gameStep === 3) || (gameStep === 4)) {
			$("#actDesc").attr("style", "color:#f00;")
		}
	});

	$("#reload").on("click", function() {
		location.reload();
	});
});

