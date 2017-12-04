module.exports = function(count) {
	var $ = Ti.UI.createView({
		width : 125,
		height : 40
		
	});
	var countView = Ti.UI.createLabel({
		font : {
			fontSize : 30
		},
		color : '#777',
		text : count ? count :0
	});
	var minus = Ti.UI.createView({
		width : 40,
		height : 40,
		borderRadius : 20,
		borderWidth : 1,
		opacity : .3,
		backgroundColor : '#800080',
		left : 1
	});
	minus.add(Ti.UI.createLabel({
		text : '－',
		color : 'white',
		font : {
			fontWeight : 'bold'
		}
	}));
	$.add(minus);
	var plus = Ti.UI.createView({
		width : 40,
		height : 40,
		borderRadius : 20,
		borderWidth : 1,
		backgroundColor : '#800080',
		right : 1
	});
	plus.add(Ti.UI.createLabel({
		text : '＋',
		font : {
			fontWeight : 'bold'
		},
		color : 'white'
	}));
	$.add(plus);
	$.add(countView);
	plus.addEventListener('click', function() {
		minus.opacity = 1;
		countView.setText((countView.getText() + 1)%99);
	});
	minus.addEventListener('click', function() {
		if (countView.getText()) {
			countView.setText(countView.getText() - 1);
			minus.opacity = 1;
			if (!countView.getText()) minus.opacity = 0.3;
		} else
			minus.opacity = 0.3;
	});
	return $;
};
