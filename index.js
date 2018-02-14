const SerialPort = require('serialport')
const nmea = require('nmea')

const device = process.argv[2] || '/dev/tty.usbmodem14321'

const port = new SerialPort(device, {
  baudRate: 9600
})

console.log(`listening for serial data at ${device}`)
console.log('')

