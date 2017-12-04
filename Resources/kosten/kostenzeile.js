module.exports = function(k) {
	var $ = Ti.UI.createTableViewRow({
		height : Ti.UI.SIZE,
		layout : 'vertical',
		backgroundColor : 'white'
	});
	var onChange= function(e) {
		var val = Math.round(e.value/500)*500;
		$.children[1].children[1].setText((val/100).toFixed(2)+'€');
	};
	$.add(Ti.UI.createLabel({
		text : k.title,
		textAlign : 'left',
		left : 22,
		right:20,
		font: {fontSize:16},
		top : 10,

		color : '#444'
	}));
	$.add(Ti.UI.createView({
		height : 50,
		left : 10,
	}));
	$.children[1].add(Ti.UI.createSlider({

		width : Ti.UI.FILL,
		right : 150,
		min : 0,
		max : k.price || 100,
		value : k.price || 100,
		top : 10,
		bottom : 5
	}));
	$.children[1].add(Ti.UI.createLabel({
		textAlign : 'right',
		font : {
			fontSize : 30
		},
		width : Ti.UI.SIZE,
		right : 10,
		text : (k.price/100).toFixed(2)+'€' || 100,
	}));
	$.children[1].children[0].addEventListener('change',onChange);
	return $;
};
