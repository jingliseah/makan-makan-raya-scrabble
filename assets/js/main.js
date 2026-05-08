/**
 * Copyright TBWA\KL 2018.
 */

var background;
var hidTitle;
var phaserJSON;
var randomNum;
var sWords;
var dashes;
var randomImg;
var jumlah;
var text;
var retry;
var wrongText;
var clicks = 0;
var letters = [];
var dashes = [];
var isPlaying;


var json = {
	"cookies": [{
			"name": "KETUPAT",
		"image": "Ketupat",
			"description": [
				"Pantun_Ketupat_1",
				"Pantun_Ketupat_2"
			]
		},
		{
			"name": "LEMANG",
			"image": "Lemang",
			"description": [
				"Pantun_Lemang_1",
				"Pantun_Lemang_2"
			]
		},
		{
			"name": "BAHULU",
			"image": "Bahulu",
			"description": [
				"Pantun_Bahulu_1",
				"Pantun_Bahulu_2"
			]
		},
		{
			"name": "DODOL",
			"image": "Dodol",
			"description": [
				"Pantun_Dodol_1",
				"Pantun_Dodol_2"
			]
		},
		{
			"name": "SEMPERIT",
			"image": "Semperit",
			"description": [
				"Pantun_Semperit_1",
				"Pantun_Semperit_2"
			]
		},
		{
			"name": "REMPEYEK",
			"image": "Rempeyek",
			"description": [
				"Pantun_Rempeyek_1",
				"Pantun_Rempeyek_2"
			]
		},
		{
			"name": "BANGKIT",
			"image": "Bangkit",
			"description": [
				"Pantun_Bangkit_1",
				"Pantun_Bangkit_2"
			]
		},
		{
			"name": "LOYANG",
			"image": "Loyang",
			"description": [
				"Pantun_Loyang_1",
				"Pantun_Loyang_2"
			]
		}
	]
}



var mainGameState = {



    init: function () {

      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.game.scale.refresh();

    },




    preload: function () {
      // Loading screen to be shown
		phaserJSON = json;
  		this.load.image ('title', 'assets/imgs/title.png');
  		this.load.image ('exit-title', 'assets/imgs/exit-title.png');

  		this.load.image ('background', 'assets/imgs/background.png');

  		this.load.image ('copy2', 'assets/imgs/copy2.png');
  		this.load.image ('retry', 'assets/imgs/retry.png');

  		//this.load.image ('pantun', 'assets/imgs/Pantun_Agar_1.png');
  		this.load.image ('hid-btn', 'assets/imgs/hid-btn.png');

       for (var i=0; i<phaserJSON.cookies.length; i++ ) {
            this.load.image (phaserJSON.cookies[i].image, 'assets/imgs/'+phaserJSON.cookies[i].image+".png");
		   for (var j=0; j<phaserJSON.cookies[i].description.length; j++) {
				this.load.image (phaserJSON.cookies[i].description[j], 'assets/imgs/'+phaserJSON.cookies[i].description[j]+".png");
			}
	   }


    },




    create: function () {
		this.isPlaying = false;

	game.stage.backgroundColor = "#fff9ea";
          this.letters = [];
          this.dashes = [];

  		background = this.game.add.image (50,0, 'background');
  		background.alpha = 0.5;

		this.showGame ();

  		this.title = this.game.add.image (81, 100, 'title');

  		hidTitle = game.add.button(422, 1150, 'exit-title', this.exitTitle, this);
  		hidTitle.anchor.setTo(0.5, 0.5);
  		hidTitle.input.useHandCursor = true;

    },


    render: function () {

    },



    update: function () {


    },



	exitTitle: function () {

		this.game.add.tween(this.title).to({x: 81, y: -1400}, 400, Phaser.Easing.Linear.None, true, 20, 0);
		background.alpha = 1;

		clicks = 0;
		hidTitle.destroy ();
		this.isPlaying = true;
	},




	showGame: function () {
		this.getRandomCookies();
        this.createLettersAsButtons (sWords);
        this.createDashesAsButtons (phaserJSON.cookies[randomNum].name);

		this.cookies = this.game.add.image(76, 281, phaserJSON.cookies[randomNum].image);

		this.copy2 = this.game.add.image(300, 750, 'copy2'); //MAKAN APE TUE?


	},




	shuffleWord: function(word) {
		var shuffledWord = '';

		var letters = word.split('');

		while (letters.length > 0) {
			shuffledWord += letters.splice(letters.length * Math.random() << 0, 1);
		}
		return shuffledWord;
	},


	getWordAsArray: function (word){
		var w = [];
		for (i=0; i<word.length; i++) {
			w[i] = word.substr (i,1);
		}
		return w;
	},





	getRandomCookies: function () {
		randomNum = Math.floor(Math.random() * phaserJSON.cookies.length);

		randomPoem = Math.floor(Math.random() * phaserJSON.cookies[randomNum].description.length);

		sWords = this.shuffleWord (phaserJSON.cookies[randomNum].name);
		jumlah = phaserJSON.cookies[randomNum].name;

	},




    createDashesAsButtons: function (word) {
        var offsetX = 60;
        var n = 0;

				offsetX = (this.game.world.width - (word.length * 65))/2 ;

        for (i=0; i<word.length; i++) {

            if (word[i] == ' ') {
                offsetX += 70;
            } else {
                this.dashes[n] = game.add.text(offsetX, 850, '_', { font: "80px AhmetAltun-HarmanSans", fill: "#452e1e", align: "center",  boundsAlignH: "center", boundsAlignV: "middle"});
                this.dashes[n].key = word[i];
                offsetX += 70; // Change to your actual width + padding
                n++;
            }


        }

    },

    createLettersAsButtons: function (word) {
        var offsetX = 60;


			  offsetX = (this.game.world.width - (word.length * 65))/2 ;

        for (i=0; i<word.length; i++) {

            if (word[i] == ' ') {
                ; //skip

            } else {
                this.letters[i] = game.add.text(offsetX, 1000, word[i], { font: "80px AhmetAltun-HarmanSans", fill: "#452e1e", align: "center",  boundsAlignH: "center", boundsAlignV: "middle"});
                this.letters[i].inputEnabled = true;
                this.letters[i].events.onInputDown.add(this.selectLetter, this);
                this.letters[i].key = word[i];
                offsetX += 70; // Change to your actual width + padding
            }

        }


    },



    selectLetter: function (letter) {
		
		if (!this.isPlaying) { return; }
		
      // NOW WE KNOW WHICH LETTER WAS TAPPED.
  		letter.destroy();

        this.dashes[clicks].text = letter.key;

  		clicks++;


  		if (clicks == jumlah.length) {

            var n = 0;


            for (i=0 ; i < phaserJSON.cookies[randomNum].name.replace(" ", "").length ; i++ ){
                if (this.dashes[i].text == phaserJSON.cookies[randomNum].name[i]){

                    n++;
                }
            }
            if (n == phaserJSON.cookies[randomNum].name.replace(" ", "").length){
				this.showEnding ();
                this.retry.destroy ();
                this.retry = null;

            } else {

				this.wrongText = this.game.add.text (50, 900, "TRY AGAIN!", { font: "30px AhmetAltun-HarmanSans", fill: "red", align: "center",  boundsAlignH: "center", boundsAlignV: "middle"});

				this.wrongText.setTextBounds(0,80,780,0);
            }

  		}


        if (!this.retry && clicks < jumlah.length) {
            this.retry = this.game.add.image(380, 1120, 'retry');
            this.retry.inputEnabled = true;
            this.retry.events.onInputDown.add(this.replay, this);
        }

    },


	replay: function (word) {

		for (i=0; i<this.dashes.length;i++)
			this.dashes[i].destroy();

		for (i=0; i<this.letters.length;i++)
			this.letters[i].destroy();

		this.createLettersAsButtons (sWords);
        this.createDashesAsButtons (phaserJSON.cookies[randomNum].name);

		clicks = 0;

				this.retry.destroy ();
        this.retry = null;


		if (this.wrongText)
			this.wrongText.destroy ();
	},


    showEnding: function () {
		//will random the pantun

	  var pantun = game.add.sprite(380, -1400, phaserJSON.cookies[randomNum].description[randomPoem]);
      pantun.scale.setTo(0.1);
      pantun.anchor.setTo(0.5,0.5);
      this.game.add.tween(pantun).to({x: 430, y: this.game.world.centerY}, 800, Phaser.Easing.Bounce.Out, true, 200, 0);
      this.game.add.tween(pantun.scale).to({ x: 1, y: 1}, 500, Phaser.Easing.Linear.None, true, 0, 0, false);

      var facebook = game.add.button(316, 1140, 'hid-btn', this.shareOnFacebook, this);
      facebook.anchor.setTo(0.5, 0.5);
      facebook.input.useHandCursor = true;
      facebook.alpha = 0;
      game.add.tween(facebook).to( { alpha: 1 }, 5000, Phaser.Easing.Bounce.Out, true);

      var startGame = game.add.button(450, 1140, 'hid-btn', this.restartGame, this);
      startGame.anchor.setTo(0.5, 0.5);
      startGame.input.useHandCursor = true;
      startGame.alpha = 0;
      game.add.tween(startGame).to( { alpha: 1 }, 5000, Phaser.Easing.Bounce.Out, true);
		
    },


	restartGame: function () {
		this.isPlaying = false;
		game.state.start ('main');
		clicks = 0;
        this.letters = [];
        this.dashes = [];
    },



	shareOnFacebook: function onClick(){

		var url = domain = "https://www.tbwa.com.my/raya2018/";

		window.open("https://www.facebook.com/sharer/sharer.php?u="+domain, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
    },



		shareOnTwitter: function onClick(){

    }

}
