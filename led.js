var onoff = require('onoff');
var Gpio = onoff.Gpio,
led = new Gpio(4, 'out'),
sensor = new Gpio(17, 'in'),

interval;

interval = setInterval(function () {

var value = (led.readSync() + 1) % 2;
var sensorValue = sensor.readSync();
if (sensorValue != 0) {
console.log("Sensor value: " + sensorValue);
}
led.write(value, function() {

console.log("Changed LED state to: " + value);

});

}, 2000);
process.on('SIGINT', function () {

clearInterval(interval);
led.writeSync(0);

led.unexport();
console.log('Bye, bye!');

process.exit();

});