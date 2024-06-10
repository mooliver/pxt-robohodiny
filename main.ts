// Pinout
// P0 - malý ciferník (24 LED)
// P1 - velký ciferník (60 LED)
// P2 - stavové ledky (4 LED, dotyková tlačítka)
// P13 - dotykové tlačítko L1 (l1)
// P14 - dotykové tlačítko L2 (l2)
// P15 - dotykové tlačítko R1 (r1)
// P16 - dotykové tlačítko R2 (r2)


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

function clearLeds() {
    malyCif.clear(),
    velkyCif.clear(),
    stavLed.clear()
}

function checkButtons() {
    l1 = pins.digitalReadPin(DigitalPin.P13)
    l2 = pins.digitalReadPin(DigitalPin.P14)
    r1 = pins.digitalReadPin(DigitalPin.P15)
    r2 = pins.digitalReadPin(DigitalPin.P16)
}

