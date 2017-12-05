var kosten = JSON.parse(Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'assets/investitionen.json').read().getText());

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
		backgroundColor : 'white'

	});

	$.add($.tableView);

	function onClick(e) { {
			var cat = e.source.cat;

			if (Array.isArray(kosten[cat])) {
				var kostenwin = require('/investitionen/kostenfenster')({
					title : cat
				});
				kostenwin.table.setData(kosten[cat].map(function(k) {
					return require('investitionen/kostenzeile')(k);
				}));
				kostenwin.open();
			} else {// Unterkategorie:
				var subwin = require('/investitionen/kostenfenster')({
					title : cat
				});
				subwin.table.setData(Object.keys(kosten[cat]).map(function(subcat, i) {
					return require('/investitionen/kategorierow')(subcat, i);
				}));
				subwin.table.addEventListener('click', function(e) {
					var kostenwin = require('/investitionen/kostenfenster')({
						title : e.source.cat
					});
					kostenwin.table.setData(kosten[cat][e.source.cat].map(function(k) {
						return require('investitionen/kostenzeile')(k);
					}));
					kostenwin.open();
				});
				subwin.open();

			}
		}
	}


	$.tableView.addEventListener('click', onClick);
	$.addEventListener('close', function() {
		$.tableView.removeEventListener('click', onClick);
	});
	$.tableView.setData(Object.getOwnPropertyNames(kosten).map(require('investitionen/kategorierow')));

	return $;

};
