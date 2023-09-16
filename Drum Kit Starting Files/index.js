document.querySelectorAll(".drum").forEach((e) => {
    e.addEventListener("click", function () {
        const drumKey = e.innerHTML;
        const drumSound = getDrumSoundNameByKey(drumKey);
        if (drumSound) {
            playDrumSound(drumSound);
        }
    });
});

document.addEventListener("keydown", function (event) {
    const drumKey = event.key.toLowerCase();
    const drumSound = getDrumSoundNameByKey(drumKey);
    if (drumSound) {
        playDrumSound(drumSound);
    }
});

function getDrumSoundNameByKey(key) {
    switch (key) {
        case "w":
            return "tom-1";
        case "a":
            return "tom-2";
        case "s":
            return "tom-3";
        case "d":
            return "tom-4";
        case "j":
            return "snare";
        case "k":
            return "crash";
        case "l":
            return "kick-bass";
        default:
            return null;
    }
}

function playDrumSound(drum) {
    var audio = new Audio(`./sounds/${drum}.mp3`);
    audio.play();
}
