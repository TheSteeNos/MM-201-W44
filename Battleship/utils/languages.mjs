import { ANSI } from "./ansi.mjs";

const LANGUAGE = {
   
    EN: {
        START: "Start Game",
        SETTINGS: "Settings",
        EXIT: "Exit Game",
        MAPLAYOUT: "Map layout",
        BACK: "Return to Main Menu",
        MENU: "Menu",
        SHIPPHASE: `${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Ship Placement Phase\n\n${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}`,
        PLACEABLE: `\n${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Ships to place:${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}\n`,
        SPACES: `spaces`,
        TURNS: {
            P1: "Player 1's Turn!",
            P2: "Player 2's Turn!'"
        },
        PLAYER: "Player",
        HIT: "Hit!",
        MISS: "Miss!",
        WINNER: {
             P1: "Player 1 wins!",
             P2: "Player 2 wins!"
        },
        OUTPUT: {
            CONTROLS: `${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Controls:${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}\n`,
            MOVEMENT: 'Arrow keys: Move cursor\n',
            ROTATE: 'R: Rotate ship\n',
            CONFIRM: 'Enter: Place ship\n',
        },
        OPT: {
            TITLE: "Select Language",
            EN: "English",
            NO: "Norwegian"
        },
        PREP: {
            PLAYER1: `SHIP PLACEMENT\nPlayer 1, get ready\nPlayer 2, look away`,
            PLAYER2: `SHIP PLACEMENT\nPlayer 2, get ready\nPlayer 1, look away`,
        }
    },
    NO: {
        START: "Start Spill",
        SETTINGS: "Instillinger",
        EXIT: "Avslutt Spill",
        MAPLAYOUT: "Kart plassering",
        BACK: "Returner til Hoved Menyen",
        MENU: "Meny",
        SHIPPHASE: `${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Skip Plasserings Fase\n\n${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}`,
        PLACEABLE: `\n${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Skip å plassere:${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}\n`,
        SPACES: `plasser`,
        TURNS: {
            P1: "Spiller 1 sin Tur'!",
            P2: "Spiller 2 sin Tur!'"
        },
        PLAYER: "Spiller",
        HIT: "Treff!",
        MISS: "Bom!",
        WINNER: {
             P1: "Spiller 1 vinner!",
             P2: "Spiller 2 vinner!"
        },
        OUTPUT: {
            CONTROLS: `${ANSI.TEXT.BOLD}${ANSI.COLOR.YELLOW}Kontroller:${ANSI.TEXT.BOLD_OFF}${ANSI.RESET}\n`,
            MOVEMENT: 'Pil taster: Flytt indikator\n',
            ROTATE: 'R: Roter skip\n',
            CONFIRM: 'Enter: Plasser skip\n',
        },
        OPT: {
            TITLE: "Velg Språk",
            EN: "Engelsk",
            NO: "Norsk"
        },
        PREP: {
            PLAYER1: `SKIP PLASSERING\nSpiller 1, gjør deg klar\nSpiller 2, snu deg vekk`,
            PLAYER2: `SKIP PLASSERING\nSpiller 2, gjør deg klar\nSpiller 1, snu deg vekk`,
        }
    }
}

export { LANGUAGE }