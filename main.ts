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

// Stavy hodin
let hodiny: boolean = true // Indikuje zda jsou spuštěné hodiny nebo stopky
let stopky: boolean = false // Indikuje zda jsou spuštěné hodiny nebo stopky
let modeHodiny: boolean = true // Indikuje jaký je spuštěný mód u hodin
let modeDatum: boolean = false // Indikuje jaký je spuštěný mód u hodin
let stop: boolean = false // Identifiku zda jsou spuštěné či zastavené stopky

function showLeds() { // Zobrazí všechny LEDky
    malyCif.show(),
    velkyCif.show(),
    stavLed.show()
}

function showCif() { // Zobrazí všechny ciferníky
    malyCif.show(),
    velkyCif.show()
}

function clearCif() { // Zhasne všechny ciferníky
    malyCif.clear(),
    velkyCif.clear(),
    showLeds()
}

function clearLeds() { // Zhasne všechny LEDky
    malyCif.clear(),
    velkyCif.clear(),
    stavLed.clear(),
    showLeds()
}

function hodinyCas() { // Zobrazí aktuální čas
    clearCif()
    malyCif.setPixelColor((DS3231.hour() - 1), neopixel.rgb(0, 200, 10))
    if (DS3231.minute() < 30) {
        velkyCif.setPixelColor((DS3231.minute() + 30), neopixel.rgb(0, 200, 10))
    } else {
        velkyCif.setPixelColor((DS3231.minute() - 30), neopixel.rgb(0, 200, 10))
    }
    showLeds()
}

function hodinyDatum() { // Zobrazí aktuální datum
    clearCif()
    malyCif.setPixelColor((DS3231.month() - 1), neopixel.rgb(0, 200, 10))
    velkyCif.setPixelColor((DS3231.day() - 1), neopixel.rgb(0, 200, 10))
    showLeds()
}

hodinyCas() // Zobrazí aktuální čas při spuštění hodin (zapnutí microbitu)


// Funkce tlačítek
// Hodiny
pins.onPulsed(DigitalPin.P13, PulseValue.Low, function() { // Tlačítko L1
    hodiny = true
    stopky = false
    modeHodiny = true
    modeDatum = false

    stavLed.clear()
    stavLed.setPixelColor(3, neopixel.rgb(0, 200, 10))
    stavLed.setPixelColor(0, neopixel.rgb(0, 200, 10))
    stavLed.show()

    loops.everyInterval(5000, function () {
        if (hodiny === true && modeDatum === false) {
            hodinyCas()
        }
    })
})

// stopky
pins.onPulsed(DigitalPin.P14, PulseValue.Low, function () { // Tlačítko L2    
    hodiny = false
    stopky = true
    modeHodiny = false
    modeHodiny = false

    stavLed.clear()
    stavLed.setPixelColor(2, neopixel.rgb(0, 200, 10))
    stavLed.show()
})

pins.onPulsed(DigitalPin.P15, PulseValue.Low, function () { // Tlačítko R1
    stavLed.clear()
    stavLed.setPixelColor(0, neopixel.rgb(0, 200, 10))
    stavLed.show()
    
    stop = false

    if (hodiny) {
        stavLed.setPixelColor(3, neopixel.rgb(0, 200, 10))
        stavLed.show()
        loops.everyInterval(5000, function () {
            if (hodiny === true && modeDatum === false) {
                hodinyCas()
            }
        })
    } else {
        stavLed.setPixelColor(2, neopixel.rgb(0, 200, 10))
        stavLed.show()
        if (!stop) {
            let sec: number = 0
            let min: number = 0
            loops.everyInterval(1000, function() {
                if (!stop) {
                    if (sec < 30 && sec !== 60) {
                        velkyCif.setPixelColor((sec + 30), neopixel.rgb(0, 200, 10))
                    } else if (sec !== 60) {
                        velkyCif.setPixelColor((sec - 30), neopixel.rgb(0, 200, 10))
                    } else {
                        sec = 0
                        min++
                        malyCif.setPixelColor((sec + 30), neopixel.rgb(0, 200, 10))
                        velkyCif.setPixelColor(min, neopixel.rgb(0, 200, 10))
                        showCif()
                    }
                    sec++
                }
            })
        }
    }
})

pins.onPulsed(DigitalPin.P16, PulseValue.Low, function () { // Tlačítko R2
    modeDatum = true
    modeHodiny = false
    
    stavLed.clear()
    stavLed.setPixelColor(1, neopixel.rgb(0, 200, 10))
    stavLed.show()

    if (hodiny) {
        stavLed.setPixelColor(3, neopixel.rgb(0, 200, 10))
        stavLed.show()
        if (modeDatum) {
            hodinyDatum()
        }
    } else {
        stop = true
        stavLed.setPixelColor(2, neopixel.rgb(0, 200, 10))
        stavLed.show()
    }
})


loops.everyInterval(100, function() { // Kontroluje a zobrazuje co je aktuálně spuštěné (hodiny nebo stopky)
    if (hodiny) {
        basic.showString("H") // hodiny
    } else {
        basic.showString("S") // stopky
    }
})