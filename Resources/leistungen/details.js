var icons = ['woman_face_female_hair_person_user-128', 'woman_skirt_cheer_person_avatar_female_2-128', 'female_woman_clothes_triangle_buttons_fasten_human-128', 'head_brain_standby_power_thinking_energy_human-128', 'human_happines_elements_circle_vitality_life-128', 'male_female_couple_unisex_people_humans-128', 'people_group_conference_auditorium_audience-128', 'people_network_links_unfying_system_connection-128']

module.exports = function(data) {
	var $ = Ti.UI.createWindow({
		title : data.title,
		layout : 'vertical'
	});
	$.tableView = Ti.UI.createTableView({
		top : 10
	});
	$.add(Ti.UI.createLabel({
		top : 10,
		left : 20,
		right : 10,
		font : {
			fontStyle : 'italic'
		},
		text : "Bitte stellen Sie mit den Steppern ein, wieviele Frauen Sie im Monat betreuen wollen."
	}));
	$.add($.tableView);
	$.tableView.setData(data.leistungen.map(function(k, i) {
		var row = Ti.UI.createTableViewRow({
			hasDetail : true,
			height : 110,
			cat : k
		});
		row.add(Ti.UI.createLabel({
			left : 70,
			top : 10,
			color : '#444',
			text : k.title,
			touchEnabled : false
		}));

		row.add(Ti.UI.createView({
			left : 10,
			top : 10,
			touchEnabled : false,
			width : 36,
			opacity : .8,
			height : 36,
			backgroundImage : '/assets/images/' + icons[i] + '.png'
		}));
		var stepper = require('/leistungen/stepper')(0);
		stepper.top = 50;
		stepper.left = 70;
		row.add(stepper);

		return row;
	}));
	$.addEventListener("open", function() {
		if (Ti.Platform.osname === "android") {
			
			abx.titleColor = 'white';
			abx.title = data.title;
			abx.subtitle = "Details";
			abx.displayShowHomeEnabled = true;
			$.getActivity().actionBar.setDisplayHomeAsUp(true);
			$.getActivity().actionBar.onHomeIconItemSelected = function() {
				$.close();
			};
		}
	});
	return $;
};
