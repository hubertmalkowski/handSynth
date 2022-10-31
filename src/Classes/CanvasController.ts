import {HAND_CONNECTIONS, Results} from "@mediapipe/hands";
import {drawConnectors, drawLandmarks} from "@mediapipe/drawing_utils";
import {HandController} from "./HandController";
import {HAND_COLORS} from "../Global/HandColors";

export class CanvasController {

    canvas : HTMLCanvasElement
    context : CanvasRenderingContext2D


    constructor() {
        this.canvas = document.querySelector('canvas')!;
        this.context = this.canvas.getContext('2d')!;
    }


    drawCanvas(handData : Results) {
        this.context.save();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(handData.multiHandLandmarks) {
            this.drawLeftHand(handData)
            this.drawRightHand(handData)
        }
    }

    drawLeftHand(handData : Results) {
        const index = HandController.findHandIndex(handData, "Left")
        if (index !== -1) {
            drawConnectors(this.context, handData.multiHandLandmarks[index], HAND_CONNECTIONS, {
                color: '#77828C', lineWidth: 2
            })
            drawLandmarks(this.context, handData.multiHandLandmarks[index], {
                color: HAND_COLORS.left, lineWidth: 1
            })
        }
    }

    drawRightHand(handData : Results) {
        const index = HandController.findHandIndex(handData, "Right")
        if (index !== -1) {
            drawConnectors(this.context, handData.multiHandLandmarks[index], HAND_CONNECTIONS, {
                color: '#77828C', lineWidth: 2
            })
            drawLandmarks(this.context, handData.multiHandLandmarks[index], {
                color: HAND_COLORS.right, lineWidth: 0.5
            })
        }
    }
}