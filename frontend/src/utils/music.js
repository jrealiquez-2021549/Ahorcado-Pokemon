
const MUSIC_SRC = '/KZ - Crossroad.mp3';

const NORMAL_VOLUME = 0.4;
const DUCKED_VOLUME = 0.12;
const FADE_STEP_MS = 40;

const bgMusic = typeof Audio !== 'undefined' ? new Audio(MUSIC_SRC) : null;
if (bgMusic) {
    bgMusic.loop = true;
    bgMusic.volume = NORMAL_VOLUME;
}

let started = false;
let fadeInterval = null;

function fadeTo(targetVolume) {
    if (!bgMusic) return;
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
        const diff = targetVolume - bgMusic.volume;
        if (Math.abs(diff) < 0.02) {
        bgMusic.volume = targetVolume;
        clearInterval(fadeInterval);
        return;
        }
        bgMusic.volume += diff * 0.3;
    }, FADE_STEP_MS);
}

export function startBackgroundMusic() {
    if (!bgMusic || started) return;
    started = true;
    bgMusic.play().catch(() => {
        started = false;
    });
}

export function duckBackgroundMusic() {
    fadeTo(DUCKED_VOLUME);
}

export function restoreBackgroundMusic() {
    fadeTo(NORMAL_VOLUME);
}