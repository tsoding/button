const regularFart = new Audio("fart-83471-fixed-regular.flac");
const critFart    = new Audio("fart-4-228244-fixed-crit.flac");
const button = document.getElementById("button");
const popup = document.getElementById("popup");

const farts = [
    regularFart,
    critFart,
];

function playFart(fart) {
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
            button.innerText = "Click me!";
        }
    },
    {
        onCount: 1,
        action: () => {
            button.innerText = "Gotchu!!";
            playFart(regularFart);
        }
    },
    {
        onCount: 4,
        action: () => {
            button.innerText = "Oh, you're into that...";
            playFart(regularFart);
        },
    },
    {
        onCount: 6,
        action: () => {
            button.innerText = `Oh, you're into that...`;
	    popup.style.visibility = "visible";
            playFart(regularFart);
        },
    },
    {
        onCount: 10,
        action: () => {
            button.innerText = `You broke it`;
            playFart(critFart);
        },
    },
    {
        onCount: 11,
        action: () => {
            button.innerText = `jk keep going`;
            playFart(regularFart);
        }
    },
    {
        onCount: 15,
        action: () => {
            button.innerText = `having fun?`;
            button.classList.add("customCursor");
	playFart(regularFart);
        }
    },
    {
        onCount: 20,
        action: () => {
            button.innerText = `dude this is just a fart button`;
            playFart(regularFart);
        }
    },
    {
        onCount: 30,
        action: () => {
            button.innerText = `it doesn't do anything, but farts`;
            playFart(regularFart);
        }
    },
    {
        onCount: 40,
        action: () => {
            button.innerText = `you are not getting anything for clicking it`;
            playFart(regularFart);
        }
    },
    {
        onCount: 50,
        action: () => {
            button.innerText = `Congrats! You clicked it ${counter} times!`;
            playFart(regularFart);
        }
    },
    {
        onCount: 69,
        action: () => {
            button.innerText = `Nice!`;
            playFart(regularFart);
        }
    },
    {
        onCount: 70,
        action: () => {
            button.innerText = `Congrats! You clicked it ${counter} times!`;
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

let shaking = false;
let counter = 0;               // TODO: DONT FORGET TO SET TO 0 ON RELEASE!!!

function finishFart() {
    shaking = false;
}

for (let fart of farts) {
    fart.onended = finishFart;
}

// TODO: change it to onmousedown (it stopped working after separating button and label)
button.onclick = () => {
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
