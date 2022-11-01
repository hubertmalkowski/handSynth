import './style.css'
import {HandController} from "./Classes/HandController";
import {CanvasController} from "./Classes/CanvasController";
import {Results} from "@mediapipe/hands";
import {HAND_PARTS} from "./Global/HandParts";
import {PinchHandler} from "./Classes/PinchHandler";
import {PinchesController} from "./Classes/PinchesController";
import {LEFT_PINCH_IDS, RIGHT_PINCH_IDS} from "./Global/PinchMap";
import * as Tone from 'tone'
import {CursorController} from "./Classes/CursorController";
import {SynthController} from "./Classes/SynthController";
import {Sampler} from "./Classes/Sampler";
const handController = new HandController()
const canvasController = new CanvasController()
const pinches = new PinchesController()


const initButton = document.getElementById("init") as HTMLButtonElement
initButton.addEventListener("click", init)
let cursorController : CursorController

//Get button with id "pause"
const synthController = new SynthController("C2 major")
const sampler = new Sampler()

let active = false
const pauseButton = document.getElementById("pause") as HTMLButtonElement

pauseButton.addEventListener("click", pause)

function pause() {
    active = !active
    pauseButton.innerText = active ? "Pause" : "Resume"
}


function init() {
    Tone.start()
    handController.hands.onResults(onResult)
    active = true
    initButton.style.display = "none"
    cursorController = new CursorController()
}

function onResult(handsData : Results) {
    if (active) {
        canvasController.drawCanvas(handsData)
        pinches.updatePinches(handsData)
        cursorController.moveCursors(handsData)
        synthController.refreshHand(handsData)

    }
}

//Play note
document.addEventListener(PinchHandler.PINCH_EVENTS.START + RIGHT_PINCH_IDS[0].name, (e) => {
    synthController.notePlayEvent(e)
})

document.addEventListener(PinchHandler.PINCH_EVENTS.STOP + RIGHT_PINCH_IDS[0].name, () => {
    synthController.noteStopEvent()
})


//Play major chord
document.addEventListener(PinchHandler.PINCH_EVENTS.START + RIGHT_PINCH_IDS[1].name, (e) => {
    synthController.chordMajorPlayEvent(e)
})

document.addEventListener(PinchHandler.PINCH_EVENTS.STOP + RIGHT_PINCH_IDS[1].name, () => {
    synthController.noteStopEvent()
})

//Play minor chord
document.addEventListener(PinchHandler.PINCH_EVENTS.START + RIGHT_PINCH_IDS[2].name, (e) => {
    synthController.chordMinorPlayEvent(e)
})

document.addEventListener(PinchHandler.PINCH_EVENTS.STOP + RIGHT_PINCH_IDS[2].name, () => {
    synthController.noteStopEvent()
})


//Play seventh chord
document.addEventListener(PinchHandler.PINCH_EVENTS.START + RIGHT_PINCH_IDS[3].name, (e) => {
    synthController.chordSeventhPlayEvent(e)
})

document.addEventListener(PinchHandler.PINCH_EVENTS.STOP + RIGHT_PINCH_IDS[3].name, () => {
    synthController.noteStopEvent()
})


//Drums

document.addEventListener(PinchHandler.PINCH_EVENTS.START + LEFT_PINCH_IDS[0].name, () => {
    sampler.playKick()
})

document.addEventListener(PinchHandler.PINCH_EVENTS.START + LEFT_PINCH_IDS[2].name, () => {
    sampler.playSnare()
})

document.addEventListener(PinchHandler.PINCH_EVENTS.START + LEFT_PINCH_IDS[1].name, () => {
    sampler.playHihat()
})




