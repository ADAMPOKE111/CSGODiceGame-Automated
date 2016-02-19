// ==UserScript==
// @name            csgodicegame_adam
// @description     An userscript that automates csgodicegame.com betting using martingale system.
// @namespace       automated@adam
// @version         1.0
// @author          Adam
// @downloadURL http://adampoke111.site11.com/projects/csgodicegame_adam.user.js
// @updateURL http://adampoke111.site11.com/projects/csgodicegame_adam.user.js
// @match           https://csgodicegame.com/
// @run-at          document-end
// @grant           none
// ==/UserScript==
alert(":: CSGODiceGame.com Automated Script Loaded! ::\n:: Be warned: it only currently works with payout set to 2.00x otherwise the script will fail and bet incorrectly ::");

// Declare variables

var init = 0.01; // Initial bet value
var delay = 100; // Delay in milliseconds between bets, increase if connection/computer is slow
var maxBetValue = 100; // Maximum amount script is allowed to bet (good value = half your balance)

var start = init;
var $Button = $("#roll");
var $bet = $("#bet");
var loop = true;

// Create the interface
var menu = document.createElement('div');
menu.innerHTML = '' +
    '<div class="form-group">' +
    '<div class="text-center col-sm-6 col-sm-offset-3">' +
    '<p><u>CSGODiceGame.com Automated <small>by Adam^</small></u></p>' +
    '<input id="rollscript" type="button" value="Start the Script" onClick="startscript()">' +
    '<input id="rollscript" type="button" value="End the Script" onClick="endscript()">' +
    '</div>' +
    '</div>';
document.getElementsByClassName('form-horizontal')[0].appendChild(menu);

function startscript() {
    loop = true;

    function roll() {
        if (loop == true) {
            $bet.val(start);
            $Button.click();
            refreshIntervalId = setInterval(roll2, delay);
        }
    }

    function roll2() {
        var thestring = document.getElementById('roll').value;
        var thenumber = retnum(thestring);
        if (thenumber < 4875) {
            start = init;
        }
        if (thenumber > 4875) {
            start = start * 2;
        }
        if (start > maxBetValue) {
            start = init;
        }
        $Button.click();
        clearInterval(refreshIntervalId);
        roll();
    }

    function retnum(str) {
        var num = str.replace(/[^0-9]/g, '');
        var number = parseInt(num);
        return number;
    }
    roll();
}

function endscript() {
    loop = false;
}