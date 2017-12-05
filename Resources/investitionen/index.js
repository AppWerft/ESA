var kosten = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'assets/abschreibungen.json').read().getText());

module.exports = function() {
	var $ = Ti.UI.createWindow({
		layout : 'vertical'
	});

	var description = Ti.UI.createLabel({
		top : 10,
		left : 20,
		right : 10,
		font : {
			fontStyle : 'italic'
		},
		text : "Bitte geben Sie an, welche Anschaffungen Sie vor Beginn ihrer freiberuflichen Tätigkeit noch anschaffen und geben Sie ein, was Sie dafür an Ausgaben kalkulieren "
	});
	$.add(description);
	$.tableView = Ti.UI.createTableView({
		top : 20,

	});

	$.add($.tableView);

	function onClick(e) { {
			var cat = e.source.cat;
			var subwin = Ti.UI.createWindow({
				title : cat
			});
			var subtable = Ti.UI.createTableView({});
			if (Array.isArray(kosten[cat])) {
				subtable.setData(kosten[cat].map(function(k) {
					return require('kosten/kostenzeile')(k);
				}));
			} else {// Unterkategorie:
				subtable.setData(Object.keys(kosten[cat]).map(function(subcat, i) {
					return require('/kosten/kategorierow')(subcat, i);
				}));
				subtable.addEventListener('click', function(e) {
					var kostenwin = require('/kosten/kostenfenster')({
						title : e.source.cat
					});
					kostenwin.table.setData(kosten[cat][e.source.cat].map(function(k) {
						return require('kosten/kostenzeile')(k);
					}));
					kostenwin.open();
				});

			}
			subwin.add(subtable);
			subwin.open();
		}
	}


	$.tableView.addEventListener('click', onClick);
	$.addEventListener('close', function() {
		$.tableView.removeEventListener('click', onClick);
	});
	$.tableView.setData(Object.getOwnPropertyNames(kosten).map(require('kosten/kategorierow')));

	return $;

};
