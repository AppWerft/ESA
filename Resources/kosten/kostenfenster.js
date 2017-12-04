module.exports = function(data) {
	var $ = Ti.UI.createWindow({
		
	});
	$.table = Ti.UI.createTableView({});
	$.add($.table);
	$.addEventListener("open", function() {
		if (Ti.Platform.osname === "android") {
			abx.backgroundColor = '#800080';
			abx.statusbarColor = '#800080';
			abx.titleColor = 'white';
			abx.title = data.title;
			abx.displayShowHomeEnabled = true;
			abx.subtitle = "Summe: ";
			abx.displayShowHomeEnabled = true;
			$.getActivity().actionBar.setDisplayHomeAsUp(true);
			$.getActivity().actionBar.onHomeIconItemSelected = function() {
				$.close();
			};
		}
	});
	return $;
};
