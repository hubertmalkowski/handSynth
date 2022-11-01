import * as Tone from 'tone';

export class Sampler {

        kick : Tone.Sampler

        constructor() {
            this.kick = new Tone.Sampler({
                urls: {
                    C1: "Cymatics - Eternity Kick - C.wav",
                    D1: "Cymatics - Dreams Lofi Snare 2.wav",
                    E1: "Cymatics - Short Shaker.wav",
                },
                baseUrl: "./src/assets/sounds/",
            }).toDestination();

        }

        playKick() {
            this.kick.triggerAttackRelease("C1", 0.1)
        }

        playSnare() {
            this.kick.triggerAttackRelease("D1", 0.1)
        }

        playHihat() {
            this.kick.triggerRelease("E1")
            this.kick.triggerAttack("E1")
        }





}