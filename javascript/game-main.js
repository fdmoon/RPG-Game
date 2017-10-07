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

	var charRyu = new Character(0, 0, 0);
	var charKen = new Character(0, 0, 0);
	var charChunli = new Character(0, 0, 0);
	var charGuile = new Character(0, 0, 0);

	var charArray = [charRyu, charKen, charChunli, charGuile];

	var yourChar;
	var oppoChar;

	// 0: select character
	// 1: select opponent
	// 2: ready to fight
	// 3: done
	var step = 0;

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
			switch(step) {
			case 0:
				yourChar = charArray[parseInt(idx)];
				$(this).css("background-color", "#fff");
				$(this).attr("selchar", "yes");
				$("#yourchar").append($(this));
				step = 1;
				break;
			case 1:
				oppoChar = charArray[parseInt(idx)];
				$(this).css("background-color", "#fff");
				$(this).attr("selchar", "yes");
				$("#oppochar").append($(this));
				step = 2;
				break;
			default:
				break;
			}
		}
	});



});