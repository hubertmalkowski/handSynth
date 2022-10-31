import {Results} from "@mediapipe/hands";
import {HAND_PARTS} from "../Global/HandParts";
import {HandController} from "./HandController";

type PinchTimeout = number | null

export class PinchHandler {

    static PINCH_EVENTS = {
        START: 'pinch_start',
        MOVE: 'pinch_move',
        STOP: 'pinch_stop',
    };


    hand : 'Right' | 'Left'
    id: string
    fingerTip: number

    state = {
        isPinched: false,
        pinchChangeTimeout: null as PinchTimeout,
    };

    OPTIONS = {
        PINCH_DELAY_MS: 30,
    };




    private _eventTrigger(eventName : string, eventData : {x: number, y :number, z : number} ) {
        const event = new CustomEvent(eventName + this.id, { detail: eventData });
        document.dispatchEvent(event);

    }

    constructor(hand : 'Right' | 'Left', id : string, fingerTip : number) {
        this.hand = hand
        this.id = id
        this.fingerTip = fingerTip
    }

    updatePinchState(handData : Results) {
        const wasPinchedBefore = this.state.isPinched;
        const isPinchedNow = this.isPinched(handData);
        const hasPassedPinchThreshold = isPinchedNow !== wasPinchedBefore;
        const hasWaitStarted = !!this.state.pinchChangeTimeout;

        if (hasPassedPinchThreshold && !hasWaitStarted) {
            this.registerChangeAfterWait(handData, isPinchedNow);
        }

        if (!hasPassedPinchThreshold) {
            this.cancelWaitForChange();
            if (isPinchedNow) {
                this._eventTrigger(
                    PinchHandler.PINCH_EVENTS.MOVE,
                    HandController.getHandCords(handData, HAND_PARTS.thumb.tip, this.hand)!,
                );
            }
        }
    }




    private isPinched(handData : Results) {
        const handIndex = HandController.findHandIndex(handData, this.hand)
        if (handIndex !== -1) {
            const fingerTip = handData.multiHandLandmarks[handIndex][this.fingerTip];
            const thumbTip = handData.multiHandLandmarks[handIndex][HAND_PARTS.thumb.tip];
            const distance = {
                x: Math.abs(fingerTip.x - thumbTip.x),
                y: Math.abs(fingerTip.y - thumbTip.y),
                z: Math.abs(fingerTip.z - thumbTip.z),
            };
            return distance.x < 0.08 && distance.y < 0.08 && distance.z < 0.11;
        }
        return false;
    }

    private registerChangeAfterWait(handData : Results, isPinchedNow : boolean) {
        this.state.pinchChangeTimeout = setTimeout(() => {
            this.state.isPinched = isPinchedNow;
            this._eventTrigger(
                isPinchedNow ? PinchHandler.PINCH_EVENTS.START : PinchHandler.PINCH_EVENTS.STOP,
                HandController.getHandCords(handData, HAND_PARTS.thumb.tip, this.hand)!,
            );
        }, this.OPTIONS.PINCH_DELAY_MS);
    }

    private cancelWaitForChange() {
        clearTimeout(this.state.pinchChangeTimeout!);
        this.state.pinchChangeTimeout = null;
    }




}