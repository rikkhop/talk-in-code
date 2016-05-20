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

		outputHTML += '<p id="output" class="text-main">';
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

		sharingBtn += '<a class="btn" href="https://twitter.com/intent/tweet?text=' + morseCode + 'Translate it at www." onclick="javascript:window.open(this.href, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600");return false;">Tweet It</a>';
		sharingBtn += '<a class="btn" href="http://www.facebook.com/sharer.php?u=file:///C:/xampp/htdocs/talkincode/index.html#output" title="Facebook share" target="_blank">Facebook It</a>';
		sharingBtn += '<a class="btn" href="https://plus.google.com/share?url=file:///C:/xampp/htdocs/talkincode/index.html#output" onclick="javascript:window.open("http://example.com", "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600"); return false;">G+ It</a>';

		return sharingBtn;
	},

	displayOutput: function(morseCode) {
		
		var output = this.outputHTML(morseCode),
		sharingBtns = this.sharingBtnHTML(morseCode);
	
		$("#app").children("textarea").remove();
		$("#app").append(output);
		$("#controls").children().remove();
		$("#controls").append(sharingBtns);
	},

	reset: function() {
		$("#app").children("textarea").remove();
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