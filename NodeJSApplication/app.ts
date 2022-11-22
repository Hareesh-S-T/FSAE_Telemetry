const mqtt = require('mqtt');

const options = {
    username: 'user',
    password: 'admin',
    clientId: 'Node'
};

const client = mqtt.connect('mqtt://192.168.123.159:1883', options);
client.on('connect', function () {
    console.log("Connected");
    client.subscribe('Telemetry', function (err) {
    })
})

// client.on('message', function ({ topic, message }: types) {
client.on('message', function (topic, message) {
    let body = JSON.parse(message);
    console.log(body);
    console.log("Coolant Temperature: ", body.coolantTemp);
    console.log("Fuel Level: ", body.fuelLevel);
});
