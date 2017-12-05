module.exports = function() {
	var leistungen = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '/assets/leistungen.json').read().getText());
	var table = Ti.UI.createTableView({
		top : 25,
		backgroundColor : 'white',
		data : leistungen.map(require('leistungen/leistungskategorie'))
	});
	table.addEventListener('click', function(e) {
		if (e.row.leistungaktiviert) {
			var subwin = require('leistungen/details')(JSON.parse(e.rowData.itemId));
			subwin.open();
		}
	});
	var win = Ti.UI.createWindow({
		layout : 'vertical',
		
	});

	win.add(Ti.UI.createLabel({
		top : 15,
		left : 20,
		right : 10,
		font : {
			fontStyle : 'italic'
		},
		text : "Bitte geben Sie ihn der folgenden Liste an, welche Hebammenleistungen sie anbieten wollen. Nach Auswahl wählen Sie noch die Anzahl der Frauen Sie in der Kategorie betreuen wollen."
	}));
	win.add(table);

	return win;
};
