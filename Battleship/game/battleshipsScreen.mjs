import { GAME_BOARD_DIM } from "../const.mjs";
import { ANSI } from "../utils/ansi.mjs";
import { print, clearScreen } from "../utils/io.mjs";
import KeyBoardManager from "../utils/io.mjs";
import { language } from "../utils/unilanguage.mjs";
import { create2DArrayWithFill } from "../utils/array.mjs";

ANSI.SEA = '\x1b[48;5;39m';
ANSI.SEA_HIT = '\x1b[48;5;160m';
ANSI.SEA_MISS = '\x1b[48;5;241m';

function createBattleshipScreen(p1map, p2map, transitionFn) {
    const BattleshipScreen = {
        p1Board: p1map || create2DArrayWithFill(GAME_BOARD_DIM, 0),
        p2Board: p2map || create2DArrayWithFill(GAME_BOARD_DIM, 0),
        p1Hits: create2DArrayWithFill(GAME_BOARD_DIM, 0),
        p2Hits: create2DArrayWithFill(GAME_BOARD_DIM, 0),
        currentPlayer: 1,
        cursorRow: 0,
        cursorColumn: 0,
        transitionFn: transitionFn,
        winner: null,
        isDrawn: false,
        gameStarted: false,

        startGame: function () {
            this.gameStarted = true;
        },

        isGameOver: function () {
            if (!this.gameStarted) return false;
            return this.isBoardCleared(this.p1Board, this.p1Hits) ||
                   this.isBoardCleared(this.p2Board, this.p2Hits);
        },

        isBoardCleared: function (board, hits) {
            if (!board || !hits) return false;
            for (let row = 0; row < GAME_BOARD_DIM; row++) {
                for (let col = 0; col < GAME_BOARD_DIM; col++) {
                    if (board[row][col] !== 0 && hits[row][col] === 0) {
                        return false;
                    }
                }
            }
            return true;
        },

        switchPlayer: function () {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            this.cursorRow = 0;
            this.cursorColumn = 0;
            this.isDrawn = false;
        },

        update: function (dt) {
            if (this.isGameOver()) {
                this.winner = this.currentPlayer === 1 ? language.WINNER.P1 : language.WINNER.P2;
                this.transitionFn();
                return;
            }

            if (KeyBoardManager.isUpPressed()) {
                this.cursorRow = Math.max(0, this.cursorRow - 1);
                this.isDrawn = false;
            }
            if (KeyBoardManager.isDownPressed()) {
                this.cursorRow = Math.min(GAME_BOARD_DIM - 1, this.cursorRow + 1);
                this.isDrawn = false;
            }
            if (KeyBoardManager.isLeftPressed()) {
                this.cursorColumn = Math.max(0, this.cursorColumn - 1);
                this.isDrawn = false;
            }
            if (KeyBoardManager.isRightPressed()) {
                this.cursorColumn = Math.min(GAME_BOARD_DIM - 1, this.cursorColumn + 1);
                this.isDrawn = false;
            }

            if (KeyBoardManager.isEnterPressed()) {
                const targetBoard = this.currentPlayer === 1 ? this.p2Board : this.p1Board;
                const hitsBoard = this.currentPlayer === 1 ? this.p1Hits : this.p2Hits;

                if (hitsBoard && hitsBoard[this.cursorRow][this.cursorColumn] === 0) {
                    const hit = targetBoard && targetBoard[this.cursorRow][this.cursorColumn] !== 0;
                    hitsBoard[this.cursorRow][this.cursorColumn] = hit ? 1 : -1;
                    if (!hit) {
                        this.switchPlayer();
                    }
                    this.isDrawn = false;
                }
            }
        },

        draw: function (dr) {
            if (this.isDrawn) return;
            this.isDrawn = true;

            clearScreen();
            let output = '';
            output += `${this.currentPlayer === 1 ? language.TURNS.P1 : language.TURNS.P2}\n\n`;

            output += '   ';
            for (let i = 0; i < GAME_BOARD_DIM; i++) {
                output += ` ${String.fromCharCode(65 + i)}`;
            }
            output += '\n';

            const hitsBoard = this.currentPlayer === 1 ? this.p1Hits : this.p2Hits;

            for (let row = 0; row < GAME_BOARD_DIM; row++) {
                output += `${String(row + 1).padStart(2, ' ')} `;
                for (let col = 0; col < GAME_BOARD_DIM; col++) {
                    const isCursor = row === this.cursorRow && col === this.cursorColumn;
                    const hitStatus = hitsBoard ? hitsBoard[row][col] : 0;

                    if (isCursor) {
                        output += ANSI.COLOR.YELLOW + (hitStatus === 1 ? '✖' : '•') + ANSI.RESET + ' ';
                    } else {
                        output += hitStatus === 1 ? '✖' : hitStatus === -1 ? '•' : ' ';
                    }
                }
                output += '\n';
            }
            print(output);
        }
    };

    return BattleshipScreen;
}



export default createBattleshipScreen;