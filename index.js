const regularFart = new Audio("fart-83471-fixed-regular.flac");
const critFart    = new Audio("fart-4-228244-fixed-crit.flac");
const STORAGE_KEY = "@button:"

let canPlaySound = true;

const farts = [
    regularFart,
    critFart,
];

function playFart(fart) {
    if (!canPlaySound) return;
    fart.currentTime = 0;
    fart.playbackRate = randomPlaybackRate();
    fart.preservesPitch = false;
    fart.play();
    shaking = true;
}

function randomPlaybackRate(min = 0.98, max = 1.02) {
    return Math.random() * (max - min) + min;
}

const eventsTable = [
    {
        onCount: 0,
        action: () => {
            clickMeText.innerText = "Click me!";
        }
    },
    {
        onCount: 1,
        action: () => {
            clickMeText.innerText = "Gotchu!!";
            playFart(regularFart);
        }
    },
    {
        onCount: 4,
        action: () => {
            clickMeText.innerText = "Oh, you're into that...";
            playFart(regularFart);
        },
    },
    {
        onCount: 6,
        action: () => {
            clickMeText.innerText = `Oh, you're into that...`;
            popupText.style.visibility = "visible";
            playFart(regularFart);
        },
    },
    {
        onCount: 10,
        action: () => {
            clickMeText.innerText = `You broke it`;
            playFart(critFart);
        },
    },
    {
        onCount: 11,
        action: () => {
            clickMeText.innerText = `jk keep going`;
            playFart(regularFart);
        }
    },
    {
        onCount: 15,
        action: () => {
            clickMeText.innerText = `having fun?`;
            clickMeWrapper.classList.add("customCursor");
            clickMe.classList.add("customCursor");
            playFart(regularFart);
        }
    },
    {
        onCount: 20,
        action: () => {
            clickMeText.innerText = `dude this is just a fart button`;
            playFart(regularFart);
        }
    },
    {
        onCount: 30,
        action: () => {
            clickMeText.innerText = `it doesn't do anything, but farts`;
            playFart(regularFart);
        }
    },
    {
        onCount: 40,
        action: () => {
            clickMeText.innerText = `you are not getting anything for clicking it`;
            playFart(regularFart);
        }
    },
    {
        onCount: 50,
        action: () => {
            clickMeText.innerText = `Congrats! You clicked it ${counter} times!`;
            playFart(regularFart);
        }
    },
    {
        onCount: 69,
        action: () => {
            clickMeText.innerText = `Nice!`;
            playFart(regularFart);
        }
    },
    {
        onCount: 70,
        action: () => {
            clickMeText.innerText = `Congrats! You clicked it ${counter} times!`;
            playFart(regularFart);
        }
    },
];

eventsTable.sort((a, b) => b.onCount - a.onCount);

function fireEvents() {
    for (const event of eventsTable) {
        if (event.onCount <= counter) {
            event.action();
            break;
        }
    }
}

function initializeButton() {
    debugger
    canPlaySound = false;
    for (const event of eventsTable.reverse()) {
        if (event.onCount > counter) {
            break;
        }
        
        event.action();
    }

    eventsTable.reverse();
    canPlaySound = true;
}


let shaking = false;
let counter = Number(localStorage.getItem(`${STORAGE_KEY}counter`)) || 0;

function finishFart() {
    shaking = false;
}

for (let fart of farts) {
    fart.onended = finishFart;
}

function updatePopup() {
    popupText.innerText = counter + "🍑💨";
}

// TODO: change it to onmousedown (it stopped working after separating button and label)
clickMe.onclick = () => {
    counter += 1;
    localStorage.setItem(`${STORAGE_KEY}counter`, counter);
    fireEvents();
    updatePopup();
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

initializeButton();
updatePopup();