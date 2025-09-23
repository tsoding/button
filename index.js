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

function emitParticles(pos) {
    let clickMeRect = clickMeText.getBoundingClientRect();
    console.log("rect", clickMeRect);
    function rand(multiplier) {
        return (Math.random() - 0.5) * multiplier;
    }
    function createBlock(pos, w, h, color) {
        var block = document.createElement("div");
        block.style.position = "absolute";
        block.style.left = pos.x + "px";
        block.style.top = pos.y + "px";
        block.style.width = w + "px";
        block.style.height = h + "px";
        block.style.backgroundColor = color;
        block.style.borderRadius = "50%";
        block.style.pointerEvents = "none";
        document.body.appendChild(block);
        return block;
    }
    let blocks = [
        createBlock(pos, 35, 35, "#572C25"),
        createBlock({ x: pos.x + rand(30), y: pos.y + rand(30) }, 30, 30, "#692A22"),
        createBlock({ x: pos.x + rand(30), y: pos.y + rand(30) }, 30, 30, "#662C24"),
        createBlock({ x: pos.x + rand(30), y: pos.y + rand(30) }, 20, 20, "#572A22"),
        createBlock({ x: pos.x + rand(30), y: pos.y + rand(30) }, 20, 20, "#672115"),
        createBlock({ x: pos.x + rand(30), y: pos.y + rand(30) }, 15, 15, "#572A22"),
        createBlock({ x: pos.x + rand(30), y: pos.y + rand(30) }, 10, 10, "#692A22"),
        createBlock({ x: pos.x + rand(30), y: pos.y + rand(30) }, 10, 10, "#662C24"),
    ];

    blocks.forEach((block) => {
        const blockSpinning = [
            { opacity: 1, transform: "translateX(0) translateY(0)" },
            { opacity: 0, transform: `translateX(${rand(50)}px) translateY(${rand(50)}px)` },
        ];

        const blockTiming = {
            duration: 270,
            iterations: 1,
        };
        let anim = block.animate(blockSpinning, blockTiming);
        anim.addEventListener("finish", () => {
            block.remove();
        });
    });
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
        action: thatsItForNow,
    }
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
clickMe.onclick = (e) => {
    counter += 1;
    popupText.innerText = counter + "🍑💨";
    fireEvents();
    emitParticles({x: e.clientX, y: e.clientY}); 
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
