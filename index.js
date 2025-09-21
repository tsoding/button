const regularFart = new Audio("fart-83471-fixed-regular.flac");
const critFart    = new Audio("fart-4-228244-fixed-crit.flac");

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
            popup.style.visibility = "visible";
            playFart(regularFart);
        },
    },
    {
        onCount: 10,
        action: () => {
            clickMeText.innerText = "You broke it";
            clickMe.style.setProperty('--button-wiggle-amount', '50px');
            playFart(critFart);
        },
    },
    {
        onCount: 11,
        action: () => {
            clickMeText.innerText = "jk keep going";
            clickMe.style.removeProperty('--button-wiggle-amount');
            playFart(regularFart);
        }
    },
    {
        onCount: 15,
        action: () => {
            clickMeText.innerText = "having fun?";
            clickMe.classList.add("customCursor");
            playFart(regularFart);
        }
    },
    {
        onCount: 20,
        action: () => {
            clickMeText.innerText = "dude this is just a fart button";
            playFart(regularFart);
        }
    },
    {
        onCount: 30,
        action: () => {
            clickMeText.innerText = "it doesn't do anything, but farts";
            playFart(regularFart);
        }
    },
    {
        onCount: 40,
        action: () => {
            clickMeText.innerText = "you are not getting anything for clicking it";
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
            clickMeText.innerText = "Nice!";
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

let shaking = false;
let counter = 0;               // TODO: DONT FORGET TO SET TO 0 ON RELEASE!!!

function finishFart() {
    shaking = false;
}

function random () {
    return Math.random() * 2 - 1;
}

for (let fart of farts) {
    fart.addEventListener('ended', finishFart);
}

clickMe.addEventListener('mousedown', () => {
    counter += 1;
    popup.innerText = counter + "🍑💨";
    fireEvents();
});

function frame() {
    if (shaking) {
        clickMe.style.setProperty('--button-offset-x', random());
        clickMe.style.setProperty('--button-offset-y', random());
    } else {
        clickMe.style.removeProperty('--button-offset-x');
        clickMe.style.removeProperty('--button-offset-y');
    }

    window.requestAnimationFrame(frame);
}
window.requestAnimationFrame(frame);

fireEvents();
