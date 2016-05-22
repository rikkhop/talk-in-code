//////////////////////
// Translation object
//////////////////////

function Translation(input, code) {
	this.input = input;
	this.code = code;
}

Translation.prototype.inputArray = function() {
	var input = this.input,
	inputArray = input.split("");

	return inputArray;
}

Translation.prototype.translate = function() {
	var array = this.inputArray(),
			code = this.code,
			output = "";
	$.each(array, function(i, val) {
		// for each character get the corresponding morse code
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

	outputHTML: function(morseCode) {
		var outputHTML = "";

		outputHTML += '<p id="output" itemprop="description" class="text-main">';
		outputHTML += morseCode;
		outputHTML += '</p>';

		return outputHTML;
	},

	translateBtnHTML: function() {
		var translateBtn = '<a id="translate" class="btn">Translate my message to morse code</a>'

		return translateBtn;
	},

	sharingBtnHTML: function(morseCode) {
		var sharingBtn = "";

		//sharingBtn += '<a id="twit" class="btn twitter-share-button" href="https://twitter.com/intent/tweet?text=' + morseCode + 'Translate it at www.rikkhop.github.io/talk-in-code/" onclick="javascript:window.open(this.href, "", "menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=300,width=600");return false;">Tweet It</a>';
		sharingBtn += '<a id="twit" class="btn share" href="https://twitter.com/intent/tweet?text=' + morseCode + 'Translate it at www.rikkhop.github.io/talk-in-code/" >Tweet It</a>';
		sharingBtn += '<a class="btn share" onclick="UI.facebookPublish(morseCode)">Facebook It</a>';
		//sharingBtn += '<a class="btn share" href="https://www.facebook.com/dialog/feed?app_id=238677186523439&link=http://rikkhop.github.io/talk-in-code/&name=Facebook%20Dialogs&caption=Reference%20Documentation&description=' + morseCode + '&redirect_uri=https://mighty-lowlands-6381.herokuapp.com/">Facebook It</a>';
		sharingBtn += '<a class="btn share" href="https://plus.google.com/share?url=http://rikkhop.github.io/talk-in-code/">G+ It</a>';

		return sharingBtn;
	},

	addShareClickHandler: function() {
		$(".share").click(function() {
			window.open(this.href, "", "menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=450,width=600");
			return false;
		});
	},

	facebookPublish: function() {
		FB.ui({
		  method: 'share',
		  href: 'http://rikkhop.github.io/talk-in-code/',
		  quote: morseCode + ' Translate at http://rikkhop.github.io/talk-in-code/',
		}, function(response){});
	},

	displayOutput: function(morseCode) {
		
		var output = this.outputHTML(morseCode),
		sharingBtns = "";
		sharingBtns += sharing.twitterBtnHTML(morseCode);
		sharingBtns += sharing.facebookBtnHTML(morseCode);
		sharingBtns += sharing.googleBtnHTML(morseCode);
	
		$("#app").find("textarea").remove();
		$("#controls").find("#translate").remove();
		$("#app").append(output);
		$("#controls").append(sharingBtns);

		sharing.addShareClickHandler();
		sharing.googleInteractive(morseCode);

	},

	reset: function() {
		$("#app").find("textarea").remove();
		$("#app").children("p").remove();
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

	twitterBtnHTML: function(morseCode) {
		var twitterBtn = "<a class='btn' href='https://twitter.com/intent/tweet?text=" + morseCode + "Translate it at www.rikkhop.github.io/talk-in-code/'>Tweet It</a>";

		return twitterBtn;
	},

	facebookBtnHTML: function() {
		var facebookBtn = "<a class='btn' onclick='sharing.facebookPublish(morseCode)'>Facebook It</a>";

		return facebookBtn;
	},

	googleBtnHTML: function() {
		var googleBtn = "<a id='sharePost' class='btn'>G+ It</a>";

		return googleBtn;
	},

	facebookPublish: function(morseCode) {
		var morseCode = escape(morseCode);

		FB.ui({
		  method: 'share',
		  href: 'http://rikkhop.github.io/talk-in-code/',
		  quote: morseCode + ' Translate at http://rikkhop.github.io/talk-in-code/',
		}, function(response){});
	},

	addShareClickHandler: function() {
		$(".share").click(function() {
			window.open(this.href, "", "menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=300,width=600");
			return false;
		});
	},

	googleInteractive: function(morseCode) {
	
	  var options = {
	    contenturl: 'http://rikkhop.github.io/talk-in-code/',
	    clientid: '236339147444-pkt4hncebrn6l2j20a9h02g1upsl10ol.apps.googleusercontent.com',
	    cookiepolicy: 'none',
	    prefilltext: morseCode + 'Translate it at www.rikkhop.github.io/talk-in-code',
	    calltoactionlabel: 'TRY_IT',
	    calltoactionurl: 'http://rikkhop.github.io/talk-in-code/'
	  };
	
	  gapi.interactivepost.render('sharePost', options);

	}

}

