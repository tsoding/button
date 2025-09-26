const farts = [];

function newFart(url) {
    const fart = new Audio(url);
    fart.preservesPitch = false;
    fart.onended = () => {
        shaking = false;
        clickMe.disabled = false;
    };
    farts.push(fart);
    return fart;
}

const regularFart = newFart("fart-83471-fixed-regular.flac");
const critFart    = newFart("fart-4-228244-fixed-crit.flac");
const bigoneFart  = newFart("fart-paulstretched.flac");
const evilFart    = newFart("fart-paulstretched-evil.flac");

function randomPlaybackRate(min = 0.97, max = 1.03) {
    return Math.random() * (max - min) + min;
}

function flashImage(img, {duration = 1000} = {}) {
    const keyframes = [{opacity: 0}, {opacity: 1}, {opacity: 0}];
    const options = {
        duration,
        fill: "forwards",
    };
    img.animate(keyframes, options);
}

function playFart(currentFarts, randomPitch) {
    for (const f of farts) {
        f.pause();
        f.currentTime = 0;
    }

    if (currentFarts.length == 0) {
        return;
    }

    let fart = currentFarts[Math.floor(Math.random() * currentFarts.length)];
    fart.playbackRate = randomPitch ? randomPlaybackRate() : 1;
    fart.play();
    shaking = true;
}

const eventsTable = [
    {
        onCountExact: 0,
        text: () => `Click me!`,
        fartSounds: [ ],
    },
    {
        onCountLeast: 1,
        text: () => `Gotchu!!`,
    },
    {
        onCountLeast: 4,
        text: () => `Oh, you're into that...`,
    },
    {
        onCountLeast: 6,
        text: () => `Oh, you're into that...`,
        actionOnce: () => { popupText.style.visibility = "visible"; },
    },
    {
        onCountExact: 10,
        text: () => `You broke it`,
        action: () => flashImage(critImg, { duration: 1000 }),
        fartSounds: [ critFart ],
    },
    {
        onCountLeast: 11,
        text: () => `jk keep going`,
    },
    {
        onCountLeast: 15,
        text: () => `having fun?`,
        actionOnce: () => {
            clickMeWrapper.classList.add("customCursor");
            clickMe.classList.add("customCursor");
        },
    },
    {
        onCountLeast: 20,
        text: () => `dude this is just a fart button`,
    },
    {
        onCountLeast: 30,
        text: () => `it doesn't do anything, but farts`,
    },
    {
        onCountLeast: 40,
        text: () => `you are not getting anything for clicking it`,
    },
    {
        onCountLeast: 50,
        text: () => `Congrats! You clicked it ${counter} times!`,
    },
    {
        onCountExact: 69,
        text: () => `Nice!`,
        action: () => {
            // TODO: add this sound here https://www.youtube.com/watch?v=3WAOxKOmR90
            clickMe.disabled = true;
        },
        randomPitch: false,
        fartSounds: [ critFart ],
    },
    {
        onCountExact: 100,
        text: () => `HERE COMES THE BIG ONE`,
        action: () => {
            clickMe.disabled = true;
            setTimeout(() => {
                clickMe.disabled = false;
                flashImage(critImg, { duration: 1000 });
            }, 3000);
        },
        randomPitch: false,
        fartSounds: [ bigoneFart ],
    },
    {
        onCountExact: 120,
        text: () => "fart flip!!!!",
        action: () => {
            clickMe.disabled = true;
            clickMeText.classList.add("rotateText");

            setTimeout(() => {
                clickMeText.classList.remove("rotateText");
                clickMe.disabled = false;
            }, 600);
        },
        fartSounds: [ critFart ],
        randomPitch: false,
    },
    {
        onCountExact: 666,
        text: () => `😈 BE A SMART FELLA \n NOT A FART SMELLA 😈`,
        action: () => {
            clickMe.disabled = true;
            setTimeout(() => {
                clickMe.disabled = false;
                flashImage(critImg, { duration: 1000 });
            }, 3000);
        },
        fartSounds: [ evilFart ],
    },
    {
        onCountLeast: 667,
        text: () => `That's it for now!`,
        actionOnce: () => {
            contrib.style.visibility = "visible";
        },
    },
];

eventsTable.sort((a, b) => b.onCount - a.onCount);
for (const event of eventsTable) {
    if (event.fartSounds === undefined) {
        event.fartSounds = [ regularFart ];
        event.randomPitch = true;
    }
}

function fireEvents() {
    let event;
    for (const e of eventsTable) {
        if (e.onCountExact == counter) {
            event = e;
            break;
        } else if (e.onCountLeast <= counter) {
            event = e;
        }
    }

    clickMeText.innerText = event.text();
    if (event.actionOnce !== undefined) {
        event.actionOnce();
        event.actionOnce = undefined;
    }

    if (event.action !== undefined) {
        event.action();
    }
    playFart(event.fartSounds, event.randomPitch);
}

let shaking = false;
let counter = 0;

// TODO: change it to onmousedown (it stopped working after separating button and label)
clickMe.onclick = () => {
    counter += 1;
    popupText.innerText = counter + "🍑💨";
    fireEvents();
};

let prevTimestamp = 0;
function frame(timestamp) {
    const deltaTime = (timestamp - prevTimestamp)/1000;
    prevTimestamp = timestamp;
    if (shaking) {
        const x = Math.random()*2 - 1 + 50;
        const y = Math.random()*2 - 1 + 50;
        clickMe.style.left = `${x}%`;
        clickMe.style.top  = `${y}%`;
    } else {
        clickMe.style.left = "50%";
        clickMe.style.top  = "50%";
    }
    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame((timestamp) => {
    prevTimestamp = timestamp;
    window.requestAnimationFrame(frame);
});

fireEvents();
