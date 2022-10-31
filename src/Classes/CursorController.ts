import {Results} from "@mediapipe/hands";
import {HandController} from "./HandController";
import {HAND_PARTS} from "../Global/HandParts";
import {HAND_COLORS} from "../Global/HandColors";


export class CursorController {
    private readonly cursorLeft: HTMLDivElement;
    private readonly cursorRight: HTMLDivElement;

    constructor() {
        this.cursorLeft = document.createElement('div')
        this.cursorRight = document.createElement('div')
        this.cursorLeft.classList.add('wand')
        this.cursorRight.classList.add('wand')
        this.cursorRight.setAttribute("data-hand", "right")
        this.cursorLeft.setAttribute("data-hand", "left")


        const app : HTMLDivElement = document.querySelector("#app")!

        app.appendChild(this.cursorLeft)
        app.appendChild(this.cursorRight)
    }

    moveCursors(handData : Results) {
        this.moveLeftCursor(handData)
        this.moveRightCursor(handData)
    }

    private moveLeftCursor(handData : Results) {
        const handsCors = HandController.getHandCords(handData, HAND_PARTS.thumb.tip, "Left")
        if (handsCors) {
            if (this.cursorLeft.style.display === "none") {
                this.cursorLeft.style.display = "initial"
            }
            let {x, y} = this.convertCoordsToDomPosition(handsCors.x, handsCors.y)
            this.cursorLeft.style.transform = `translate(${x}, ${y})`;
        }
        else {
            this.cursorLeft.style.display = "none"
        }
    }

    private moveRightCursor(handData : Results) {
        const handsCors = HandController.getHandCords(handData, HAND_PARTS.thumb.tip, "Right")
        if (handsCors) {
            if (this.cursorRight.style.display === "none") {
                this.cursorRight.style.display = "initial"
            }
            let {x, y} = this.convertCoordsToDomPosition(handsCors.x, handsCors.y)
            this.cursorRight.style.transform = `translate(${x}, ${y})`;
        }
        else {
            this.cursorRight.style.display = "none"
        }
    }

    private convertCoordsToDomPosition(x : number, y : number) {
        return {
            x: `${x * 100}vw`,
            y: `${y * 100}vh`,
        };
    }
}