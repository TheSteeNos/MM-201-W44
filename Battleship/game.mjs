import { ANSI } from "./utils/ansi.mjs";
import { print, clearScreen } from "./utils/io.mjs";
import SplashScreen from "./game/splash.mjs";
import { FIRST_PLAYER, SECOND_PLAYER } from "./const.mjs";
import createMenu from "./utils/menu.mjs";
import createMapLayoutScreen from "./game/mapLayoutScreen.mjs";
import createThroughScreen from "./game/throughScreen.mjs";
import createBattleshipScreen from "./game/battleshipsScreen.mjs";
import { LANGUAGE } from "./utils/languages.mjs";
import { language, setLanguage } from  "./utils/unilanguage.mjs"

setLanguage(LANGUAGE.EN);
const MAIN_MENU_ITEMS = buildMenu();

const GAME_FPS = 1000 / 60; // The theoretical refresh rate of our game engine
let currentState = null;    // The current active state in our finite-state machine.
let gameLoop = null;        // Variable that keeps a reference to the interval id assigned to our game loop 

let mainMenuScene = null;

(function initialize() {
    print(ANSI.HIDE_CURSOR);
    clearScreen();
    mainMenuScene = createMenu(MAIN_MENU_ITEMS);
    SplashScreen.next = mainMenuScene;
    currentState = SplashScreen  // This is where we decide what state our finite-state machine will start in. 
    gameLoop = setInterval(update, GAME_FPS); // The game is started.
})();

function update() {
    currentState.update(GAME_FPS);
    currentState.draw(GAME_FPS);
    if (currentState.transitionTo != null) {
        currentState = currentState.next;
        print(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
    }
}

// Support / Utility functions ---------------------------------------------------------------

function buildMenu() {
    let menuItemCount = 0;
    return [
        {
            text: language.START, id: menuItemCount++, action: function () {
                clearScreen();
                let through = createThroughScreen();
                through.init(language.PREP.PLAYER1, () => {

                    let p1map = createMapLayoutScreen();
                    p1map.init(FIRST_PLAYER, (player1ShipMap) => {


                        let through = createThroughScreen();
                        through.init(language.PREP.PLAYER2, () => {
                            let p2map = createMapLayoutScreen();
                            p2map.init(SECOND_PLAYER, (player2ShipMap) => {
                                return createBattleshipScreen(player1ShipMap, player2ShipMap);
                            })
                            return p2map;
                        });
                        return through;
                    });

                    return p1map;

                }, 3);
                currentState.next = through;
                currentState.transitionTo = language.MAPLAYOUT;
            }
        },
        {
            text: language.SETTINGS, id: menuItemCount++, action: function () {
                clearScreen();
                currentState.next = createLanguageSelectionMenu();
                currentState.transitionTo = language.SETTINGS;
            }
        },
        { 
            text: language.EXIT, id: menuItemCount++, action: function () { print(ANSI.SHOW_CURSOR); clearScreen(); process.exit(); }
        },
    ];
}

function createLanguageSelectionMenu() {
    return createMenu([
        {
            text: ANSI.COLOR.BLUE + language.OPT.EN + ANSI.RESET, id: 0, action: function () {
                setLanguage(LANGUAGE.EN); // Update the language
                mainMenuScene = createMenu(buildMenu()); // Rebuild the main menu with the updated language
                currentState.next = mainMenuScene;
                currentState.transitionTo = language.MENU;
            }
        },
        {
            text: ANSI.COLOR.RED + language.OPT.NO + ANSI.RESET, id: 1, action: function () {
                setLanguage(LANGUAGE.NO); // Update the language globally (without `let`)
                mainMenuScene = createMenu(buildMenu()); // Rebuild the main menu with the updated language
                currentState.next = mainMenuScene;
                currentState.transitionTo = language.MENU;
            }
        },
        {
            text: language.BACK, id: 2, action: function () {
                mainMenuScene = createMenu(buildMenu());
                currentState.next = mainMenuScene;
                currentState.transitionTo = language.MENU;
            }
        }
    ]);
}