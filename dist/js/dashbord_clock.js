const deg = 6;
const horArrow = document.querySelector("#h-arrow");
const minArrow = document.querySelector("#m-arrow");
const secArrow = document.querySelector("#s-arrow");
const digitalClock = document.querySelector("#digital-clock");

setInterval(() => {
    let time = new Date();
    let h = time.getHours(); // خواندن ساعت از 0 تا 23
    let m = time.getMinutes(); // خواندن دقیقه از 0 تا 59
    let s = time.getSeconds(); // خواندن ثانیه از 0 تا 59

    let hDgree = h * 30;
    let mDgree = m * deg;
    let sDgree = s * deg;

    // horArrow.style.transform = `rotateZ(${hDgree + mDgree / 12}deg)`;
    // minArrow.style.transform = `rotateZ(${mDgree}deg)`;
    // secArrow.style.transform = `rotateZ(${sDgree}deg)`;
    showTime(h, m, s);
});

function showTime(h, m, s) {
    let midnight = "AM";
    if (h == 0) {
        h = 12;
    }
    if (h > 12) {
        h = h - 12;
        midnight = "PM";
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    let timeString = h + ":" + m + ":" + s + " " + midnight;
    // digitalClock.innerText = timeString;
}
// digital clock

setInterval(() => {

    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');
    let ampm = document.getElementById('ampm');

    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();

    // set digital am pm
    let am = h >= 12 ? "PM" : "AM";

    // convert 24hr to 12hr
    // if( h > 12 ) {
    //     h = h - 12;
    // }

    // add 0 to before single digits number
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;

    // hours.innerHTML = h;
    // minutes.innerHTML = m;
    // seconds.innerHTML = s;
    // ampm.innerHTML = am;

}, 1000);