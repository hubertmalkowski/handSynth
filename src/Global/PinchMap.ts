import {HAND_PARTS} from "./HandParts";


export const RIGHT_PINCH_IDS = [
    {name: "Note", finger: HAND_PARTS.indexFinger.tip},
    {name: "Chord_major", finger: HAND_PARTS.middleFinger.tip},
    {name: "Chord_minor", finger: HAND_PARTS.ringFinger.tip},
    {name: "Chord_major_seventh", finger: HAND_PARTS.pinky.tip},
]


export const LEFT_PINCH_IDS = [
    {name: "Kick", finger: HAND_PARTS.indexFinger.tip},
    {name: "Snare", finger: HAND_PARTS.middleFinger.tip},
    {name: "Hi-hat", finger: HAND_PARTS.ringFinger.tip},
    {name: "Crash", finger: HAND_PARTS.pinky.tip},
]
