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

function checkButtons() {
    l1 = pins.digitalReadPin(DigitalPin.P13)
    l2 = pins.digitalReadPin(DigitalPin.P14)
    r1 = pins.digitalReadPin(DigitalPin.P15)
    r2 = pins.digitalReadPin(DigitalPin.P16)
}

function hodinyCas() {
    stavLed.clear()
    stavLed.setPixelColor(3, neopixel.rgb(0, 200, 10))
    loops.everyInterval(5000, function () {
        clearLeds()
        malyCif.setPixelColor((DS3231.hour() - 1), neopixel.rgb(0, 200, 10))
        if (DS3231.minute() <= 30) {
            velkyCif.setPixelColor((DS3231.minute() + 30), neopixel.rgb(0, 200, 10))
        } else {
            velkyCif.setPixelColor((DS3231.minute() - 30), neopixel.rgb(0, 200, 10))
        }
        showLeds()
        console.log("spusteno")
    })
}

function stopky() {
    stavLed.clear()
    stavLed.setPixelColor(2, neopixel.rgb(0, 200, 10))
    loops.everyInterval(5000, function () {
        console.log("Spusteno")
    })
}



input.onButtonPressed(Button.A, function() {
    DS3231.dateTime(2024, 6, 12, 3, 18, 53, 30)
})

input.onButtonPressed(Button.B, function() {
    loops.everyInterval(5000, function() {
        basic.showNumber(DS3231.second())
    })
})