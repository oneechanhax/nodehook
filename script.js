
// Startup Commands
console.log("Starting Nodehook!");
var libui = require("./node_modules/libui-node/index.js"); // https://github.com/parro-it/libui-node/tree/master/docs
var robot = require("robotjs"); // http://robotjs.io/docs/
var active_win = require('active-win'); // https://www.npmjs.com/package/active-win

// Gui
libui.Ui.init();
var main_menu_window = new libui.UiWindow("Node Hook", 640, 480, true);
var main_menu_tabs = new libui.UiTab();
main_menu_window.setChild(main_menu_tabs);
main_menu_window.onClosing(function () {
	main_menu_window.close();
	libui.stopLoop();
});
main_menu_window.show();
libui.startLoop();




// Usefull globals

// Mouse Position
var mouse = {x: 0, y: 0};
var mouse_update = setInterval(function () {
	mouse = robot.getMousePos();
}, 100);

// Active window
var active_window = {title: 'None', id: 0, app: 'None', pid: 0};
var active_window_update = setInterval(function () {
	active_win().then(result => {
    	active_window = result;
	});
}, 1000);

// Ingame check
var ingame = false; // The "global"
var misc_menu_ingame = new libui.UiCheckbox(); // The user setting
var ingame_update = setInterval(function () {
	if (!misc_menu_ingame.checked) {
		ingame = true;
		return;
	}
	// Do in-game heartbeat checking here
}, 1000);






// Misc Menu mess
var misc_menu_ver1 = new libui.UiVerticalBox(); // the 2 halves
var misc_menu_ver2 = new libui.UiVerticalBox();
var misc_menu_hor = new libui.UiHorizontalBox(); // Main Control area, and add the halves to it
misc_menu_hor.append(misc_menu_ver1, false);
misc_menu_hor.append(misc_menu_ver2, false);
main_menu_tabs.append("Misc", misc_menu_hor); // Give the submenu to the main


// Bunnyhop
var misc_menu_bhop = new libui.UiCheckbox();
misc_menu_bhop.text = "Bunnyhop";
misc_menu_ver1.append(misc_menu_bhop, false);

var bhop_update = setInterval(function () {
	
	if (!misc_menu_bhop.checked) return;
	if (!ingame) return;
	var keyboard_state = robot.Keyboard.getState();
	if (keyboard_state[robot.KEY_SPACE]) {
		robot.Keyboard.release(robot.KEY_SPACE);
		robot.Keyboard.press(robot.KEY_SPACE);
	}
}, 30);


// Ingame check var
misc_menu_ingame.text = "Ingame Check?";
misc_menu_ver1.append(misc_menu_ingame, false);







// Debug Menu mess
var debug_menu_ver1 = new libui.UiVerticalBox(); // the 2 halves
var debug_menu_ver2 = new libui.UiVerticalBox();
var debug_menu_hor = new libui.UiHorizontalBox(); // Main Control area, and add the halves to it
debug_menu_hor.append(debug_menu_ver1, true);
debug_menu_hor.append(debug_menu_ver2, true);
main_menu_tabs.append("Debug", debug_menu_hor); // Give the submenu to the main

// One debug variable
var debug_var_text = new libui.UiLabel();
debug_menu_ver1.append(debug_var_text, false);

var stuff = 0;
var debug_update = setInterval(function () {
	stuff++;
	debug_var_text.setText(	"Stuff: " + stuff + 
						  	"\nMouse x:" + mouse.x + " y:" + mouse.y +
						  	"\nWindow: " + active_window.title);
}, 50);









