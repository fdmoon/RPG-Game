function Character(health, power, counter) {
	this.baseHP = health;
	this.health = this.baseHP;
	this.basepwr = power;
	this.attack = this.basepwr;
	this.counter = counter;

	this.initCondition = function() {
		this.health = this.baseHP;
		this.attack = this.basepwr;
	}

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

	var charRyu = new Character(120, 8, 0);
	var charKen = new Character(180, 0, 25);
	var charChunli = new Character(100, 0, 5);
	var charGuile = new Character(150, 0, 20);

	var charArray = [charRyu, charKen, charChunli, charGuile];

	var yourChar;
	var oppoChar;

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
			
			$("#actDesc").html(actDescription[gameStep]);
		}
		else {
			$("#actDesc").html(actDescription[gameStep]);
		}
	});

	$("#reload").on("click", function() {
		location.reload();
	});
});