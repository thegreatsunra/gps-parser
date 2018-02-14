# gps-parser

> GPS parser in Node

## Getting started

```bash
git clone git@github.com:thegreatsunra/gps-parser.git

cd gps-parser

npm install
```

## Usage

```bash
# plug in your GPS dongle and then:

cd gps-parser

# this will listen for events at serial port /dev/tty.usbmodem14321
node index.js

# you can pass an argument to index.js to listen at a different serial port
node index.js /dev/tty-usbserial1
```
