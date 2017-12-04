var icons = ['people_core_connection_links_network_hub_interaction-128','woman_face_female_hair_person_user-128','people_group_conference_auditorium_audience-128','woman_face_female_hair_person_user-128', 'woman_skirt_cheer_person_avatar_female_2-128', 'female_woman_clothes_triangle_buttons_fasten_human-128', 'head_brain_standby_power_thinking_energy_human-128', 'human_happines_elements_circle_vitality_life-128', 'male_female_couple_unisex_people_humans-128', 'people_group_conference_auditorium_audience-128', 'people_network_links_unfying_system_connection-128', 'work_suit_worker_lab_person_scientist-128'];
function getIcon() {
	return icons[Math.ceil(Math.random() * icons.length - 1)];
}

module.exports = function(k, i) {
	var row = Ti.UI.createTableViewRow({
		hasDetail : true,
		height : 50,
		cat : k
	});
	row.add(Ti.UI.createView({
		left : 10,
		top : 10,
		touchEnabled : false,
		width : 36,
		opacity : .8,
		height : 28,
		backgroundImage : '/assets/images/' + getIcon() + '.png'
	}));

	row.add(Ti.UI.createLabel({
		left : 70,
		color : '#444',
		text : k,
		font : {
			fontSize : 16
		},
		touchEnabled : false
	}));
	row.add(Ti.UI.createLabel({
		right : 10,
		touchEnabled : false,
		opacity : 0.5,
		text : '❯'
	}));
	row.add(Ti.UI.createLabel({
		right : 10,
		color : '#800080',
		touchEnabled : false,
		opacity : 0.5,
		text : '❯'
	}));
	return row;

};
