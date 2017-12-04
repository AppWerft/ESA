module.exports = function(k) {
	var $ = Ti.UI.createTableViewRow({
		leistungaktiviert : false,
		width : Ti.UI.FILL,
		hasDetail : true,
		itemId : JSON.stringify(k),
		height : 55,
	});
	$.add(Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		bubbleParent:true
	}));
	$.arrow = Ti.UI.createLabel({
		right : 10,
		color : '#800080',
		opacity : 0.1,
		text : '❯'
	});
	$.label = Ti.UI.createLabel({
		left : 70,
		top : 15,
		color : '#444',
		touchEnabled : true,
		font : {
			fontSize : 16
		},
		text : k.title
	});
	$.switcher = Ti.UI.createSwitch({
		style : Ti.UI.Android ? Ti.UI.Android.SWITCH_STYLE_SWITCH : undefined,
		bubbleParent : true,
		value : false
	});
	$.switchcontainer = Ti.UI.createView({
		left : 5,
		bubbleParent : false,
		touchEnabled : false,
		width : 50,
		height : 50,
		top : 2
	});
	$.switchcontainer.add($.switcher);
	$.add($.switchcontainer);
	$.add($.arrow);
	$.add($.label);

	$.switcher.addEventListener('change', function(e) {
		if (e.value == true) {
			$.leistungaktiviert = true;
			showStepper();
			$.arrow.opacity = 0.5;
		} else {
			$.leistungaktiviert = false;
			hideStepper();
			$.arrow.opacity = 0.1;
		}
	});

	$.stepper = require('leistungen/stepper')(1);
	$.stepper.borderWidth = 1;
	function showStepper() {
		$.stepper.setHeight(50);
		$.stepper.setTop(50);
		$.setHeight(100);
	}

	function hideStepper() {
		$.stepper.setHeight(0);
		$.stepper.setTop(0);
		$.setHeight(50);
	}


	$.stepper.left = 70;
	$.stepper.bubbleParent = false;
	$.add($.stepper);
	hideStepper();
	return $;
};
