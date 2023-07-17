setInterval(() => {
    d = new Date(); //object of date()
    hr = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;
    document.getElementById('hours').innerHTML = d.getHours();
    document.getElementById('minutes').innerHTML = d.getMinutes();
    document.getElementById('h-arrow').style.transform = `rotate(${hr_rotation}deg)`;
    document.getElementById('m-arrow').style.transform = `rotate(${min_rotation}deg)`;
    document.getElementById('s-arrow').style.transform = `rotate(${sec_rotation}deg)`;
}, 1000);

