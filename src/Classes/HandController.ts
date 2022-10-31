import {Hands, Options, Results} from "@mediapipe/hands";
import {Camera} from "@mediapipe/camera_utils";
import {HAND_PARTS} from "../Global/HandParts";




export class HandController {

    public hands : Hands

    videoElement : HTMLVideoElement

    options : Options = {
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    }


    constructor() {
        this.videoElement  = document.querySelector('video')!;

        this.hands = new Hands({locateFile: (file) => {
                // console.log(file)
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            }});
        this.hands.setOptions(this.options);

        const camera = new Camera(this.videoElement, {
            onFrame: async () => {
                await this.hands.send({image: this.videoElement});
            },
            width: 1280 / 2,
            height: 720 / 2,
        });

        camera.start()
    }


    static findHandIndex(handsData : Results, hand : "Right" | "Left") {
        let handIndex = -1
        hand = (hand === "Right") ? "Left" : "Right"
        for (let i = 0; i < handsData.multiHandedness.length; i++) {
            if(handsData.multiHandedness[i].label === hand) {
                handIndex = i
            }
        }
        return handIndex
    }

    static getHandCords(handData:Results, handPart : number, hand : "Right" | "Left") {
        const handIndex = HandController.findHandIndex(handData, hand)
        if (handData.multiHandLandmarks.length > 0 && handIndex !== -1) {
            const { x, y, z } = handData.multiHandLandmarks[handIndex][handPart];
            const mirroredXCoord = -x + 1;

            return {
                x: mirroredXCoord ,
                y: y,
                z: z
            }
        }
        return  null
    }





}