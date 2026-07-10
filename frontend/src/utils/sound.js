
const clickAudio = typeof Audio !== 'undefined' ? new Audio('/click.mp3') : null;

export function playClickSound() {
    if (!clickAudio) return;
    clickAudio.currentTime = 0;
    clickAudio.play().catch(() => {});
}