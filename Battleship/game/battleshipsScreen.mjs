import { GAME_BOARD_DIM, FIRST_PLAYER, SECOND_PLAYER } from "../const.mjs";
import { print } from "../utils/io.mjs";



const createBattleshipScreen = () => {

    let currentPlayer = FIRST_PLAYER;
    let firstPlayerBoard = null;
    let secondPlayerBoard = null;


    function swapPlayer() {
        currentPlayer *= -1;
        if (currentPlayer == FIRST_PLAYER) {
            currentBoard = firstPlayerBoard;
            opponentBoard = secondPlayerBoard;
        } else {
            currentBoard = secondPlayerBoard;
            opponentBoard = firstPlayerBoard;
        }
    }



    return {
        isDrawn: false,
        next: null,
        transitionTo: null,


        init: function (firstPBoard, secondPBoard) {
            firstPlayerBoard = firstPBoard;
            secondPlayerBoard = secondPBoard;
        },

        update: function (dt) {
            //this.isDrawn = false;
        },

        draw: function (dr) {
            if (this.isDrawn == false) {
                this.isDrawn = true;


                print("There should be a battleship game here");


            }
        }

    }
}

export default createBattleshipScreen;