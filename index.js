const SerialPort = require('serialport')
const nmea = require('nmea')

// this is the only GPS "sentence" we care about
const sentence = '$GPGGA'
const device = process.argv[2] || '/dev/tty.usbmodem14321'

const port = new SerialPort(device, {
  baudRate: 9600
})

console.log(`listening for serial data at ${device}`)
console.log('')

port.on('data', (line) => {
  line = line.toString()
  // only parse the GPS sentence we care about... ignore the others
  if (line.substring(0, sentence.length) === sentence) {
    const parsed = nmea.parse(line)
    console.log(parsed)
    console.log('')
  }
})

