var sound_squeak = new Howl({
    src: ['src/audiofiles/squeak.wav'],
    html5: true,
    loop: false
});

function startMonitorSound(event) {
    Howler.volume(0.1);
    sound_squeak.play();
}
