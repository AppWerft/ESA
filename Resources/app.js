var abx = require('com.alcoapps.actionbarextras');
Ti.UI.backgroundColor = '#800080';

var tabGroup = Ti.UI.createTabGroup({
	exitOnClose : true,
});

tabGroup.addTab(createTab("Leistungen", require('leistungen/index')(), "assets/images/tab1.png"));
tabGroup.addTab(createTab("Investitionen", require('investitionen/index')(), "assets/images/tab2.png"));

tabGroup.addEventListener("open", function() {
	if (Ti.Platform.osname === "android") {
		abx.backgroundColor = '#800080';
		abx.statusbarColor = '#800080';
		abx.titleColor = 'white';
		abx.subtitleColor = '#ddd';
		abx.title = "Wohlergehen";
		abx.subtitle = "Ihr Kalkulator für den Erfolg als Hebamme";
		abx.navigationbarColor = "#800080";
	}
});

tabGroup.open();
require('versionsreminder')();
function createTab(title, win, icon) {
	var tab = Ti.UI.createTab({
		title : title,
		window : win

	});
	return tab;
}

