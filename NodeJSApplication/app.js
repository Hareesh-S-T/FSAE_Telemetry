var mqtt = require('mqtt');
var options = {
    username: 'user',
    password: 'admin',
    clientId: 'Node'
};
var client = mqtt.connect('mqtt://192.168.1.201:1883', options);
client.on('connect', function () {
    console.log("Connected");
    client.subscribe('Telemetry', function (err) {
    });
});
client.on('message', function (topic, message) {
    var body = JSON.parse(message);
    console.log("Coolant Temperature: ", body.coolantTemp);
    console.log("Fuel Level: ", body.fuelLevel);
});
