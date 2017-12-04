var abx = require('com.alcoapps.actionbarextras');
Ti.UI.backgroundColor = '#800080';

var tabGroup = Ti.UI.createTabGroup({
	exitOnClose : true
	
});

tabGroup.addTab(createTab("Leistungen", require('leistungen/index')(), "assets/images/tab1.png"));
tabGroup.addTab(createTab("Betriebsausgaben", require('kosten/index')(), "assets/images/tab2.png"));

tabGroup.addEventListener("open", function() {
	if (Ti.Platform.osname === "android") {
		abx.backgroundColor = 'purple';
		abx.statusbarColor = 'purple';
		abx.titleColor = 'white';
		abx.subtitleColor = '#ddd';
		abx.subtitle = "Ihr Kalkulator für den Erfolg als Hebamme";
		abx.navigationbarColor = "purpur";
	}
});

tabGroup.open();
function createTab(title, win, icon) {
	var tab = Ti.UI.createTab({
		title : title,
		window : win,
		backgroundColor : 'violett'
	});
	return tab;
}

