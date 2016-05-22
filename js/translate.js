//////////////////////
// Translation object
//////////////////////

function Translation(input, code) {
	this.input = input;
	this.code = code;
}

Translation.prototype.inputArray = function() {
	// split message input into array of characters
	var input = this.input,
	inputArray = input.split("");

	return inputArray;
}

Translation.prototype.translate = function() {
	var array = this.inputArray(),
			code = this.code,
			output = "";
	// for each character get the corresponding morse code
	$.each(array, function(i, val) {
		$.each(code, function(mi, mval) {
			//concatenate each morse letter together to form one string
			if(val === mi) {
				output += mval + " ";
			};
		});
	});
	return output;
}

//////////////////////
// UI object
//////////////////////

var UI = {
	
	displayInput: function() {
		$("#app").append(this.inputHTML());
		$("#controls").append(this.translateBtnHTML());
		this.translateClickHandler();
		this.resetClickHandler();
	},

	inputHTML: function() {
		var inputHTML = '<textarea id="textInput" class="text-main" placeholder="Enter your message to be coded here"></textarea>';

		return inputHTML;
	},

	outputHTML: function(code) {
		var outputHTML = "";
		//itemprop defines description setting for G+ sharing
		outputHTML += '<p id="output" itemprop="description" class="text-main">';
		outputHTML += code;
		outputHTML += '</p>';

		return outputHTML;
	},

	translateBtnHTML: function() {
		var translateBtn = '<a id="translate" class="btn">Translate my message to morse code</a>'

		return translateBtn;
	},

	displayOutput: function(code) {
		
		var output = this.outputHTML(code),
		sharingBtns = "";
		sharingBtns += sharing.twitterBtnHTML(code);
		sharingBtns += sharing.facebookBtnHTML(code);
		sharingBtns += sharing.googleBtnHTML(code);
	
		$("#app").find("textarea").remove();
		$("#controls").find("#translate").remove();
		$("#app").append(output);
		$("#controls").append(sharingBtns);

		sharing.addTwttrClickHandler();
		sharing.addFacebookClickHandler(code);
		sharing.googleInteractive(code);

	},

	reset: function() {
		$("#app").find("textarea").remove();
		$("#app").find("p").remove();
		$("#controls").children().remove();
		UI.displayInput();
	},

	translateClickHandler: function() {
		$("#translate").click(function() {
			if($("#textInput").val()) {
				var input = $("#textInput").val(),
				translation = new Translation(input, morseCode),
				translationCode = translation.translate();
				UI.displayOutput(translationCode);
			}
		});
	},

	resetClickHandler: function() {
		$("#reset").click(function() {
			UI.reset();
		});
	}

};

///////////////////
//Sharing object
///////////////////

var sharing = {

	twitterBtnHTML: function(code) {
		var c = escape(code);
		var twitterBtn = "<a id='twttr' class='btn' href='https://twitter.com/intent/tweet?text=" + c + "Translate it at www.rikkhop.github.io/talk-in-code/'>Tweet It</a>";

		return twitterBtn;
	},

	facebookBtnHTML: function() {
		var facebookBtn = "<a id='fcbook' class='btn'>Facebook It</a>";

		return facebookBtn;
	},

	addFacebookClickHandler: function(code) {
		$("#fcbook").click(function() {
			sharing.facebookPublish(code)
		});
	},

	googleBtnHTML: function() {
		var googleBtn = "<a id='sharePost' class='btn'>G+ It</a>";

		return googleBtn;
	},

	facebookPublish: function(code) {
		FB.ui({
		  method: 'share',
		  href: 'http://rikkhop.github.io/talk-in-code/',
		  quote: code + ' Translate at http://rikkhop.github.io/talk-in-code/',
		}, function(response){});
	},

	addTwttrClickHandler: function() {
		$("#twttr").click(function() {
			window.open(this.href, "", "menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=300,width=600");
			return false;
		});
	},

	googleInteractive: function(code) {
	
	  var options = {
	    contenturl: 'http://rikkhop.github.io/talk-in-code/',
	    clientid: '236339147444-pkt4hncebrn6l2j20a9h02g1upsl10ol.apps.googleusercontent.com',
	    cookiepolicy: 'none',
	    prefilltext: code + 'Translate it at www.rikkhop.github.io/talk-in-code',
	    calltoactionlabel: 'TRY_IT',
	    calltoactionurl: 'http://rikkhop.github.io/talk-in-code/'
	  };
	
	  gapi.interactivepost.render('sharePost', options);

	}

}

