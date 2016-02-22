// ==UserScript==
// @name            csgodicegame_adam
// @description     An userscript that automates csgodicegame.com betting using martingale system.
// @namespace       automated@adam
// @version         1.11
// @author          Adam
// @downloadURL http://adampoke111.site11.com/projects/csgodicegame_adam.user.js
// @updateURL http://adampoke111.site11.com/projects/csgodicegame_adam.user.js
// @match           https://csgodicegame.com/
// @run-at          document-end
// @grant           none
// ==/UserScript==
alert(":: CSGODiceGame.com Automated Script Loaded! ::\n:: Be warned: it only currently works with payout set to 2.00x otherwise the script will fail and bet incorrectly ::");

// Declare variables
var init = parseFloat((Math.floor(document.getElementById('goCoins').innerHTML) / Math.pow(2, 8)).toFixed(2)); // Initial bet value
var delay = 100; // Delay in milliseconds between bets, increase if connection/computer is slow
var maxBetValue = parseFloat((Math.floor(document.getElementById('goCoins').innerHTML) / 2).toFixed(2)); // Maximum amount script is allowed to bet (good value = half your balance)

// Preliminary Setup
var start = init;
var btRoll = document.getElementById("roll");
var tbBet = document.getElementById("bet");
var btOverUnder = document.getElementById("oddsOverUnder");
var rollUnder;
var loop = true;
var firstTime = true;

// More Preliminary Setup
function checkOverUnder() {
    if ((btOverUnder.value).indexOf("<") != "0") {
        btOverUnder.click();
    }
rollUnder = parseInt((btOverUnder.value).replace(/[^\d.]/g,''));
}

// Create the interface
var menu = document.createElement('div');
menu.innerHTML = '' +
    '<div class="form-group">' +
    '<div class="text-center col-sm-6 col-sm-offset-3">' +
    '<p><a href="https://github.com/ADAMPOKE111/CSGODiceGame-Automated">CSGODiceGame.com Automated <small>by Adam^</small></a></p>' +
    '<input id="rollscript" type="button" value="| Start the Script |" onClick="startscript()">' +
    '<input id="rollscript" type="button" value="| End the Script |" onClick="endscript()">' +
    '<input id="rollscript" type="button" value="| Change Base Bet |" onClick="changebase()">' +
    '<input id="rollscript" type="button" value="| Change Max Bet |" onClick="changemax()">' +
    '<input id="rollscript" type="button" value="| Change Delay |" onClick="changedelay()">' +
    '<input id="rollscript" type="button" value="| Refresh Values |" onClick="checkOverUnder()">' +
    '</div>' +
    '</div>';
document.getElementsByClassName('form-horizontal')[0].appendChild(menu);

function startscript() {
    alert("Script started!\n - Base bet: " + init + "\n - Max bet: " + maxBetValue + "\n - Delay (ms): " + delay);
    loop = true;
    firstTime = false;
    checkOverUnder();

    function roll() {
        if (loop === true) {
            tbBet.value = start;
            btRoll.click();
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

function changebase() {
    n = parseFloat((Math.floor(document.getElementById('goCoins').innerHTML) / Math.pow(2, 8)).toFixed(2));
    init = parseFloat(prompt("Please enter the new inital betting value", n));
    if (firstTime === true) {
        start = init;
    }
}

function changemax() {
    n = parseFloat(Math.floor(document.getElementById('goCoins').innerHTML).toFixed(2));
    maxBetValue = parseFloat(prompt("Please enter the new maximum bet", n));
}

function changedelay() {
    delay = parseInt(prompt("Please enter the new delay (milliseconds)", "100"));
}
