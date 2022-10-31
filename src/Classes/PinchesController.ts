import {PinchHandler} from "./PinchHandler";
import {LEFT_PINCH_IDS, RIGHT_PINCH_IDS} from "../Global/PinchMap";
import {HAND_PARTS} from "../Global/HandParts";
import {Results} from "@mediapipe/hands";

export class PinchesController {

    rightHandPinches : PinchHandler[] = []
    leftHandPinches : PinchHandler[] = []


    constructor() {
        for(const pinch of RIGHT_PINCH_IDS) {
            this.rightHandPinches.push(new PinchHandler("Right", pinch.name, pinch.finger))
        }
        for(const pinch of LEFT_PINCH_IDS) {
            this.leftHandPinches.push(new PinchHandler("Left", pinch.name, pinch.finger))
        }
    }

    updatePinches(handData : Results) {
        for(const pinch of this.rightHandPinches) {
            pinch.updatePinchState(handData)
        }
        for(const pinch of this.leftHandPinches) {
            pinch.updatePinchState(handData)
        }
    }
}