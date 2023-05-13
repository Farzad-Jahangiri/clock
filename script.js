// loop => updateTime => displayTime => animateDigits => (removeAnimation) => tick => loop

const clockContainer = document.querySelector(".clock");
const rollClass = "clock__block--bounce";
let rollTimeout;
let time = { a: [], b: [] };

const removeAnimations = () => {
    const groups = clockContainer.querySelectorAll("[data-time-group]");

    groups.forEach((group) => {
        group.classList.remove(rollClass);
    });
};

const animateDigits = () => {
    const groups = clockContainer.querySelectorAll("[data-time-group]");

    groups.forEach((group, i) => {
        const { a, b } = time;
        if (a[i] !== b[i]) group.classList.add(rollClass);
    });

    clearTimeout(rollTimeout);
    rollTimeout = setTimeout(removeAnimations, 900);
};

const displayTime = () => {

    const timeDigits = [...time.b];
    const amPm = timeDigits.pop();

    clockContainer.ariaLabel = `${timeDigits.join(":")} ${amPm}`;

    Object.keys(time).forEach((letter) => {
        const letterEls = clockContainer.querySelectorAll(
            `[data-time="${letter}"]`
        );

        letterEls.forEach((el, i) => {
            if (el.textContent === time[letter][i]) return;
            el.textContent = time[letter][i];
        });
    });
};

const updateTime = () => {
    const rawDate = new Date();
    const date = new Date(rawDate.getTime() + 1e3);

    const hour = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: false
    });

    const minute = date.toLocaleTimeString("en-US", { minute: "2-digit" });
    const second = date.toLocaleTimeString("en-US", { second: "2-digit" });

    const amPm = parseInt(hour) < 12 ? "AM" : "PM";

    //   time.a = [...time.b];
    // time.b =
    return [
        `${parseInt(hour) > 12 ? `0${hour % 12}` : hour % 12}`,
        minute,
        second,
        amPm
    ];

    //   if (!time.a.length) time.a = [...time.b];
};

const loop = () => {
    time.a = [...time.b];
    time.b = updateTime();
    displayTime();
    animateDigits();
};

loop();
setInterval(loop, 1000);
