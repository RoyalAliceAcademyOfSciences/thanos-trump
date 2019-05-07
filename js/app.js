// CONST GLOBALS
const debug = false;
const repetition = 2;
const numFrames = 128;

// VARIABLES GLOBALS
var ejecut = 0
var node = []
var end = 0
var items = document.querySelectorAll(".animation-transition")
var r = 0
var save = {}
var zx = 0
var countAudio = 0
var finish = true

document.body.onload = init

function RandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function animationImage(canvas, url, cb) {
    let ctx = canvas.getContext("2d")
    let img = new Image(10, 10)
    let count = 0
    let interval = null

    img.src = url

    img.onload = () => {
        canvas.width = 80
        canvas.height = 80
        interval = setInterval(() => {
            if (count < 48) {
                let left = count * 80
                canvas.style.background = "black"
                ctx.clearRect(0, 0, 80, 80)
                ctx.drawImage(img, left, 0, 80, 80, 0, 0, 80, 80)
                count += 1
            } else {
                clearInterval(interval)
                cb()
            }
        }, 50)

    }
}

function init() {
    let gauntlet = document.getElementById("gauntlet")
    psh = document.getElementById("sh")
    psz = document.getElementById("sz")
    pcy = document.getElementById("cyb")
    phs = document.getElementById("hsi")
    let click = true
    let c = RandomNumber(20000000, 95000000)

    gauntlet.onclick = () => {
        if (!finish) return
        finish = false
        if (!click) {
            click = true
            let canvas = document.createElement("canvas")
            canvas.style.position = "absolute"
            canvas.style.cursor = "pointer"
            gauntlet.appendChild(canvas)
            animationImage(canvas, "./images/thanos_time.png", res => {
                finish = true
            })
            return
        }

        click = false
        let canvas = document.createElement("canvas")
        canvas.style.position = "absolute"
        canvas.style.cursor = "pointer"
        gauntlet.appendChild(canvas)
        animationImage(canvas, "./images/thanos_snap.png", res => {
            gauntlet.removeChild(canvas)
            finish = true
        })
        setTimeout(() => {
            animateValue(psh.getElementsByClassName("idx")[0], 3078.34, 2906.46, 2111, false)
            animateValue(psh.getElementsByClassName("pct")[0], 0.52, -5.58, 31, true)
            animateValue(psz.getElementsByClassName("idx")[0], 9674.53, 8943.52, 2111, false)
            animateValue(psz.getElementsByClassName("pct")[0], 0.54, -7.56, 21, true)
            animateValue(pcy.getElementsByClassName("idx")[0], 1623.78, 1494.89, 2111, false)
            animateValue(pcy.getElementsByClassName("pct")[0], 0.51, -7.94, 21, true)
            animateValue(phs.getElementsByClassName("idx")[0], 30081.55, 29209.82, 2111, false)
            animateValue(phs.getElementsByClassName("pct")[0], 0.46, -2.90, 31, true)
        },1300)

    }
}

function animateValue(selector, start, end, duration, type) {
    let range = end - start
    let current = start
    let increment = !type ? -1 : -0.01
    let stepTime = Math.abs(Math.floor(duration / range))

    let timer = setInterval(function () {
        current += increment
        
        selector.innerHTML = !type ? `${""+current.toFixed(2)}` : `${""+current.toFixed(2)+"%"}`
        if (type) {
            if (current > 0) {
                selector.style.color = "red";
            } else {
                selector.style.color = "#1F995C";
            }
        }

        if (current <= end) {
            clearInterval(timer)
            selector.innerHTML = !type ? `${""+end}` : `${""+end+"%"}`
            finish = true
        }

    }, stepTime);

    return timer;
}
