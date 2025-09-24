const regularFart    = new Audio("fart-83471-fixed-regular.flac");
const critFart       = new Audio("fart-4-228244-fixed-crit.flac");
const countFormatter = new Intl.NumberFormat('en-US', { notation: "compact" });
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

function playFart(fart, randomPitch) {
    for (const f of farts) {
        f.pause();
        f.currentTime = 0;
    }

    fart.playbackRate = randomPitch ? randomPlaybackRate() : 1;
    fart.play();
    shaking = true;
}

const regularAction = () => {
    clickMeText.innerText = `Congrats! You clicked it ${counter} times!`;
    playFart(regularFart, true);
}

const thatsItForNow = () => {
    clickMeText.innerHTML = `That's it for now!`;
    playFart(regularFart, true);
    contrib.style.visibility = "visible";
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
            playFart(regularFart, true);
        }
    },
    {
        onCount: 4,
        action: () => {
            clickMeText.innerText = "Oh, you're into that...";
            playFart(regularFart, true);
        },
    },
    {
        onCount: 6,
        action: () => {
            clickMeText.innerText = `Oh, you're into that...`;
            popupText.style.visibility = "visible";
            playFart(regularFart, true);
        },
    },
    {
        onCount: 10,
        action: () => {
            clickMe.disabled = true;
            clickMeText.innerText = `You broke it`;
            playFart(critFart);
            critImg.animate([
                { opacity: 0 },
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 1000,
                fill: "forwards"
            });
        },
    },
    {
        onCount: 11,
        action: () => {
            clickMeText.innerText = `jk keep going`;
            playFart(regularFart, true);
        }
    },
    {
        onCount: 15,
        action: () => {
            clickMeText.innerText = `having fun?`;
            clickMeWrapper.classList.add("customCursor");
            clickMe.classList.add("customCursor");
            playFart(regularFart, true);
        }
    },
    {
        onCount: 20,
        action: () => {
            clickMeText.innerText = `dude this is just a fart button`;
            playFart(regularFart, true);
        }
    },
    {
        onCount: 30,
        action: () => {
            clickMeText.innerText = `it doesn't do anything, but farts`;
            playFart(regularFart, true);
        }
    },
    {
        onCount: 40,
        action: () => {
            clickMeText.innerText = `you are not getting anything for clicking it`;
            playFart(regularFart, true);
        }
    },
    {
        onCount: 50,
        action: regularAction,
    },
    {
        onCount: 69,
        action: () => {
            // TODO: add this sound here https://www.youtube.com/watch?v=3WAOxKOmR90
            clickMe.disabled = true;
            clickMeText.innerText = `Nice!`;
            playFart(critFart);
        }
    },
    {
        onCount: 70,
        action: regularAction,
    },
    {
        onCount: 100,
        action: () => {
            clickMe.disabled = true;
            setTimeout(() => {
                clickMe.disabled = false;
                critImg.animate([
                    { opacity: 0 },
                    { opacity: 1 },
                    { opacity: 0 }
                ], {
                    duration: 1000,
                    fill: "forwards"
                });
            }, 3000);
            clickMeText.innerText = `HERE COMES THE BIG ONE`;
            playFart(bigoneFart);
        }
    },
    {
        onCount: 101,
        action: regularAction,
    },
    {
        onCount: 120,
        action: () => {
            clickMe.disabled = true;

            clickMeText.innerText = "fart flip!!!!";
            clickMeText.classList.add("rotateText");

            playFart(critFart, true);
            setTimeout(() => {
                clickMeText.classList.remove("rotateText");
                clickMe.disabled = false;
            }, 600);
        }
    },
    {
        onCount: 121,
        action: regularAction,
    },
    {
        onCount: 666,
        action: () => {
            clickMe.disabled = true;
            setTimeout(() => {
                clickMe.disabled = false;
                critImg.animate([
                    { opacity: 0 },
                    { opacity: 1 },
                    { opacity: 0 }
                ], {
                    duration: 1000,
                    fill: "forwards"
                });
            }, 3000);
            clickMeText.innerText = `😈 BE A SMART FELLA \n NOT A FART SMELLA 😈`;
            playFart(evilFart);
        }
    },
    {
        onCount: 667,
        action: thatsItForNow,
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

// TODO: change it to onmousedown (it stopped working after separating button and label)
clickMe.onclick = () => {
    counter += 1;
    const formattedCount = countFormatter.format(counter);
    popupText.innerText = `${formattedCount} 🍑💨`;
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
