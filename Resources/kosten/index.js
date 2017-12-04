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
					var subcat = e.source.cat;
					var kostenwin = Ti.UI.createWindow({
						title : subcat
					});
					var subtable = Ti.UI.createTableView({});
					kostenwin.add(subtable);
					var list = kosten[cat][subcat];
					subtable.setData(list.map(function(k) {
						return require('kosten/kostenzeile')(k);
					}));

					kostenwin.open();
					kostenwin.addEventListener("open", function() {
						if (Ti.Platform.osname === "android") {
							abx.backgroundColor = '#800080';
							abx.statusbarColor = '#800080';
							abx.titleColor = 'white';
							abx.title = subcat;
							abx.displayShowHomeEnabled = true;
							abx.subtitle = "Kostenkalkulation";
							abx.displayShowHomeEnabled = true;
							kostenwin.getActivity().actionBar.setDisplayHomeAsUp(true);
							kostenwin.getActivity().actionBar.onHomeIconItemSelected = function() {
								kostenwin.close();
							};
						}
					});
				});

			}
			subwin.add(subtable);
			subwin.addEventListener("open", function() {
				if (Ti.Platform.osname === "android") {
					abx.backgroundColor = '#800080';
					abx.statusbarColor = '#800080';
					abx.titleColor = 'white';
					abx.title = cat;
					abx.displayShowHomeEnabled = true;
					abx.subtitle = "Kostenkalkulation";
					abx.displayShowHomeEnabled = true;
					subwin.getActivity().actionBar.setDisplayHomeAsUp(true);
					subwin.getActivity().actionBar.onHomeIconItemSelected = function() {
						subwin.close();
					};
				}
			});
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
