import * as Tone from 'tone'
import {Chord, Scale} from "@tonaljs/tonal";
import {PinchHandler} from "./PinchHandler";
import {RIGHT_PINCH_IDS} from "../Global/PinchMap";
import {HandController} from "./HandController";
import {Results} from "@mediapipe/hands";
import {HAND_PARTS} from "../Global/HandParts";



export class SynthController {

    synth : Tone.PolySynth

    scale : any

    constructor(scale : string) {
        this.synth = new Tone.PolySynth().toDestination()
        this.scale = Scale.get(scale)
    }

    private getScaleUnit() {
        return window.innerWidth / this.scale.notes.length
    }


    refreshHand(handData : Results) {
        if (!HandController.getHandCords(handData, HAND_PARTS.thumb.tip, "Right")) {
            this.synth.releaseAll()
        }
    }


    notePlayEvent(event : any) {
        const note = this.findNote(event.detail.x)
        this.synth.triggerAttack(note)
    }

    noteStopEvent() {
        this.synth.releaseAll()
    }

    chordMajorPlayEvent(event : any) {
        const note = this.findNote(event.detail.x)
        this.synth.triggerAttack(Chord.getChord("major", note).notes)
    }

    chordMinorPlayEvent(event : any) {
        const note = this.findNote(event.detail.x)
        this.synth.triggerAttack(Chord.getChord("minor", note).notes)
    }

    chordSeventhPlayEvent(event : any) {
        const note = this.findNote(event.detail.x)
        this.synth.triggerAttack(Chord.getChord("maj7", note).notes)
    }


    private findNote(x : number) {
        for (let i = 0; i < this.scale.notes.length; i++) {
            if(Math.abs(x) * window.innerWidth > i * this.getScaleUnit() && (i + 1) * this.getScaleUnit() > Math.abs(x) * window.innerWidth ) {
                return this.scale.notes[i]
            }
        }
    }







}