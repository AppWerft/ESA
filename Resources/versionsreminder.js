var versionCompare = function(e, t) {
	var n,
	    a,
	    i,
	    r = ("" + e).split("."),
	    o = ("" + t).split("."),
	    s = Math.min(r.length, o.length);
	for ( i = 0; i < s; i++)
		if ( n = i ? parseFloat("0." + r[i], 10) : parseInt(r[i], 10),
			a = i ? parseFloat("0." + o[i], 10) : parseInt(o[i], 10), isNaN(n) && ( n = r[i]), isNaN(a) && ( a = o[i]), n != a)
			return n > a ? 1 : n < a ? -1 : NaN;
	return r.length === o.length ? 0 : r.length < o.length ? -1 : 1
};
module.exports = function() {
	var e = Ti.App.getVersion(),
	    t = (arguments[0] || {}, "https://play.google.com/store/apps/details?id=" + Ti.App.getId()),
	    n = Ti.Network.createHTTPClient({
		onerror : function() {
			console.log("Warning: no connection to playstore " + e)
		},
		onload : function() {
			var n = /itemprop="softwareVersion">(.*?)</m.exec(this.responseText);
			if (!n)
				return
				void  console.log("Warning: no connection to playstore " + e);
			var a = n[1].replace(/\s+/g, "");
			switch(console.log("Store=["+a+"] app=["+Ti.App.getVersion()+"]"),versionCompare(Ti.App.getVersion(),a)) {
			case-1:
				var i = Ti.UI.createAlertDialog({
					cancel : 1,
					buttonNames : ["Zum Store", "Abbruch"],
					message : "Es gibt eine neue Version im Playstore.\n\nDiese App auf dem " + Ti.Platform.model + " hat die Version " + Ti.App.getVersion() + "\n\nIm Store ist  " + a + ".\n\nMöchtest Du erneuern?",
					title : "Neue Version „" + Ti.App.getName() + "“"
				});
				i.show(), i.addEventListener("click", function(e) {
					e.index != e.source.cancel && Ti.Platform.openURL(t)
				});
				break;
			case 1:
				Ti.Android && Ti.UI.createNotification({
					message : Ti.App.getName() + " ist neuer als neu … (" + Ti.App.getVersion() + ")"
				}).show();
				break;
			case 0:
				Ti.Android && Ti.UI.createNotification({
					message : Ti.App.getName() + " ist in neuester Version (" + Ti.App.getVersion() + ")"
				}).show();
				break;
			default:
				console.log("Warning: versions compare has error")
			}
		}
	});
	n.open("GET", t), n.send()
}; 