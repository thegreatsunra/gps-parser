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

const connectToGPSDevice = () => {
  port = new SerialPort(gpsDevice, {
    baudRate: 9600
  })
  port.on('error', (err) => {
    console.log(err)
    console.log('GPS device not found.\nScanning again in 5 seconds...')
    setTimeout(() => {
      connectToGPSDevice()
    }, 5000)
  })
  port.on('open', () => {
    parseGPSData()
  })
  port.on('close', () => {
    console.log('GPS device disconnected.\nAttempting to reconnect in 5 seconds...')
    setTimeout(() => {
      connectToGPSDevice()
    }, 5000)
  })
}

const parseGPSData = () => {
  console.log(`listening for serial data at ${gpsDevice}`)
  console.log('')
  port.pipe(parser)
  parser.on('data', (data) => {
    gps.update(data)
  })
  gps.on('GGA', async (parsed) => {
    console.log(parsed)
    console.log('')
  })
}

connectToGPSDevice()
