//////////////////////
// Translation object
//////////////////////

// translation instantiated with user input and morse code object
function Translation(input, code) {
	this.input = input;
	this.code = code;
}

//create array of characters from user input
Translation.prototype.inputArray = function() {
	// split message input into array of characters
	var input = this.input,
	inputArray = input.split("");

	return inputArray;
}

// translate the input array
Translation.prototype.translate = function() {
	var array = this.inputArray(),
			code = this.code,
			output = "";
	// for each character get the corresponding morse code
	$.each(array, function(i, val) {
		$.each(code, function(mi, mval) {
			//concatenate each morse letter together separated by space to form one string
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
	
	// get all html input elements and add to page
	displayInput: function() {
		$("#app").append(this.inputHTML());
		$("#controls").append(this.translateBtnHTML());
		this.translateClickHandler();
		this.resetClickHandler();
	},

	//create input html
	inputHTML: function() {
		var inputHTML = '<textarea id="textInput" class="text-main" placeholder="Enter your message to be coded here"></textarea>';

		return inputHTML;
	},

	//create html for translate button
	translateBtnHTML: function() {
		var translateBtn = '<a id="translate" class="btn">Translate my message to morse code</a>'

		return translateBtn;
	},

	// when translate button is clicked instantiaate new translation object if input present (must be applied each time button is rendered)
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

	// render output html on page using translate object output
	displayOutput: function(code) {
		
		var output = this.outputHTML(code),
		sharingBtns = "";
		sharingBtns += sharing.twitterBtnHTML(code);
		sharingBtns += sharing.facebookBtnHTML(code);
		sharingBtns += sharing.googleBtnHTML(code);
		
		//remove all input elements
		$("#app").find("textarea").remove();
		$("#controls").find("#translate").remove();

		//add all output elements
		$("#app").append(output);
		$("#controls").append(sharingBtns);

		//add click handlers to sharing buttons (twitter handler ensures window opens correctly)
		sharing.addTwttrClickHandler();
		sharing.addFacebookClickHandler(code);
		sharing.googleInteractive(code);

	},

	//create output html to display morse code
	outputHTML: function(code) {
		var outputHTML = "";
		//itemprop defines description setting for G+ sharing (very important)
		outputHTML += '<p id="output" itemprop="description" class="text-main">';
		outputHTML += code;
		outputHTML += '</p>';

		return outputHTML;
	},

	//remove output elements or non-translated text and render all input elements
	reset: function() {
		$("#app").find("textarea").remove();
		$("#app").find("p").remove();
		$("#controls").children().remove();
		UI.displayInput();
	},

	// add click handler for reset button
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

	//create twitter button html, translation is inserted into share link
	twitterBtnHTML: function(code) {
		var twitterBtn = "<a id='twttr' class='btn' href='https://twitter.com/intent/tweet?text=" + code + "Translate it at www.rikkhop.github.io/talk-in-code/'>Tweet It</a>";

		return twitterBtn;
	},

	//add click handler to twttr share button, window will not open properly if included in share button url
	addTwttrClickHandler: function() {
		$("#twttr").click(function() {
			window.open(this.href, "", "menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=300,width=600");
			return false;
		});
	},

	//create facebook share button html
	facebookBtnHTML: function() {
		var facebookBtn = "<a id='fcbook' class='btn'>Facebook It</a>";

		return facebookBtn;
	},

	//add click handler to initialise facebook sharing function
	addFacebookClickHandler: function(code) {
		$("#fcbook").click(function() {
			sharing.facebookPublish(code)
		});
	},

	// pass in translation to facebook share dialogue function (see fb docs for share dialogue)
	facebookPublish: function(code) {
		FB.ui({
		  method: 'share',
		  href: 'http://rikkhop.github.io/talk-in-code/',
		  quote: code + ' Translate at http://rikkhop.github.io/talk-in-code/',
		}, function(response){});
	},

	// create google button html (id important to link to google api, see google docs)
	googleBtnHTML: function() {
		var googleBtn = "<a id='sharePost' class='btn'>G+ It</a>";

		return googleBtn;
	},

	// render google share button based on options, passing translation into message(see google docs for interactive posts)
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