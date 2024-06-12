// Pinout
// P0 - malý ciferník (24 LED)
// P1 - velký ciferník (60 LED)
// P2 - stavové ledky (4 LED, dotyková tlačítka)
// P13 - dotykové tlačítko L1 - led 3
// P14 - dotykové tlačítko L2 - led 2
// P15 - dotykové tlačítko R1 - led 0
// P16 - dotykové tlačítko R2 - led 1

// Led pasky
const malyCif = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
const velkyCif = neopixel.create(DigitalPin.P1, 60, NeoPixelMode.RGB)
const stavLed = neopixel.create(DigitalPin.P2, 4, NeoPixelMode.RGB)

// Dotyková tlačítka
let l1: number
let l2: number
let r1: number
let r2: number

let hodiny: boolean = true
let stopky: boolean = false
let modeHodiny: boolean = true
let modeDatum: boolean = false

function showLeds() { // Funkce zobrazí všechny LEDky
    malyCif.show(),
    velkyCif.show(),
    stavLed.show()
}

function clearLeds() { // Funkce skryje všechny LEDky
    malyCif.clear(),
    velkyCif.clear(),
    showLeds()
}

pins.onPulsed(DigitalPin.P13, PulseValue.Low, function() { // Funkce hodiny
    hodiny = true
    stopky = false
    modeHodiny = true
    modeDatum = false
    loops.everyInterval(5000, function () {
        if (hodiny === true && modeDatum === false) {
            clearLeds()
            malyCif.setPixelColor((DS3231.hour() - 1), neopixel.rgb(0, 200, 10))
            if (DS3231.minute() < 30) {
                velkyCif.setPixelColor((DS3231.minute() + 30), neopixel.rgb(0, 200, 10))
            } else {
                velkyCif.setPixelColor((DS3231.minute() - 30), neopixel.rgb(0, 200, 10))
            }
            showLeds()
            console.log("spusteno")
            basic.showIcon(IconNames.Heart)
        }
    })
})

pins.onPulsed(DigitalPin.P15, PulseValue.Low, function() { // Funkce hodiny
    modeDatum = false
    modeHodiny = true
    loops.everyInterval(5000, function () {
        if (hodiny === true && modeDatum === false) {
            clearLeds()
            malyCif.setPixelColor((DS3231.hour() - 1), neopixel.rgb(0, 200, 10))
            if (DS3231.minute() < 30) {
                velkyCif.setPixelColor((DS3231.minute() + 30), neopixel.rgb(0, 200, 10))
            } else {
                velkyCif.setPixelColor((DS3231.minute() - 30), neopixel.rgb(0, 200, 10))
            }
            showLeds()
            console.log("spusteno")
            basic.showIcon(IconNames.Heart)
        }
    })
})

pins.onPulsed(DigitalPin.P16, PulseValue.Low, function() { // Funkce datum
    modeDatum = true
    modeHodiny = false
    if (hodiny === true && modeDatum === true) {
        clearLeds()
        malyCif.setPixelColor((DS3231.month() - 1), neopixel.rgb(0, 200, 10))
        velkyCif.setPixelColor((DS3231.day() - 1), neopixel.rgb(0, 200, 10))
        showLeds()
    }
})