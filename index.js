const GPS = require('gps')
const SerialPort = require('serialport')

const device = process.argv[2] || '/dev/tty.usbmodem14321'

const setDevicePort = () => {
  if (process.argv[2]) return process.argv[2]
  // if using resin on a raspberry pi
  else if (process.env.RESIN) return '/dev/ttyACM0'
  else return '/dev/tty.usbmodem14311'
}

const gps = new GPS

const parsers = SerialPort.parsers
const parser = new parsers.Readline({
  delimiter: '\r\n'
})

const gpsDevice = setDevicePort()

let port


port.on('data', (line) => {
  line = line.toString()
  // only parse the GPS sentence we care about... ignore the others
  if (line.substring(0, sentence.length) === sentence) {
    const parsed = nmea.parse(line)
    console.log(parsed)
    console.log('')
    const results = {
      lat: formatLatLng(parsed.lat, parsed.latPole),
      lng: formatLatLng(parsed.lon, parsed.lonPole)
    }
    console.log(results)
    console.log('')
    console.log('')
  }
})

// format lat/long values with negative sign, decimals
const formatLatLng = (value, pole) => {
  value = (parseFloat(value) / 100).toFixed(7)
  if (pole === 'W' || pole === 'S') {
    value = -1 * value
  }
  return value
}
