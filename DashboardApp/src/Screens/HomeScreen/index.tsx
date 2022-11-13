import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gauge from '../../components/Gauge';
import Paho from "paho-mqtt";
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';


init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 3600 * 24,
    enableCache: true,
    reconnect: {
        sync: {}
    }
});

const client = new Paho.Client('192.168.1.201', 1883, `AndroidApp-${Math.random() * 100}`);

export default function HomeScreen() {

    const [speed, setSpeed] = useState(100);
    const [rpm, setRpm] = useState(2500);
    const [fuel, setFuel] = useState(60);
    const [temp, setTemp] = useState(80);
    const [gear, setGear] = useState('N');

    function onMessage(message: any) {
        setTemp(parseInt(message.payloadString));
    }
    useEffect(() => {
        client.connect({
            onSuccess: () => {
                client.subscribe("Telemetry");
                client.onMessageArrived = onMessage;
            },
            onFailure: () => {

            }
        })
    }, []);

    return (
        <>
            <Image source={require('../../assets/images/Gradient2.png')} style={{ position: 'absolute', height: '100%', width: '100%' }} />
            <View style={styles.container}>

                <Gauge containerStyle={{ paddingLeft: 0 }} value={rpm} progressValueStyle={styles.gaugeValue} size={120} maxValue={11500} progressValueColor={'white'} title={'rpm'} titleColor={'rgb(150,0,50)'} titleStyle={styles.gauge} strokeColorConfig={[
                    { color: 'green', value: 0 },
                    { color: 'yellow', value: 8000 },
                    { color: 'red', value: 10000 }
                ]} activeStrokeColor={'white'} dashedStrokeConfig={{
                    count: 50,
                    width: 2.5,
                }} />

                <Gauge containerStyle={{}} value={speed} progressValueStyle={styles.gaugeValue} size={120} maxValue={200} progressValueColor={'white'} title={'kmph'} titleColor={'#00ABFF'} titleStyle={styles.gauge} activeStrokeColor={'#00ABFF'} strokeColorConfig={[
                    { color: '#00ABFF', value: 0 },
                    { color: '#00ABFF', value: 100 }
                ]} dashedStrokeConfig={{
                    count: 50,
                    width: 2.5,
                }} />

                <View style={styles.aux}>

                    <View style={styles.gearIndicator}>
                        <Text style={styles.gearPlusMinus}>{'\u00B1'}</Text>
                        <Image source={require('../../assets/images/Gears.png')} style={styles.gearLogo} />
                        <Text style={[styles.gearText, gear == 'N' ? { color: 'rgb(150,0,50)' } : { color: 'white' }]}>{gear}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MCIcon name={'gas-station'} style={styles.icon} size={30} />

                        <Gauge containerStyle={{ padding: 0, margin: 0 }} value={fuel} progressValueStyle={[styles.gaugeValue, { padding: 0 }]} size={60} maxValue={100} progressValueColor={'white'} title={'%'} titleColor={'white'} titleStyle={[styles.gauge, { fontSize: 20 }]} activeStrokeColor={'#05ED00'} strokeColorConfig={[
                            { color: '#FF2500', value: 0 },
                            { color: '#05ED00', value: 100 }
                        ]} dashedStrokeConfig={{
                            count: 35,
                            width: 2.5
                        }} />

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <MCIcon name={'coolant-temperature'} style={styles.icon} size={30} />

                        <Gauge containerStyle={{ padding: 0, margin: 0 }} value={temp} progressValueStyle={[styles.gaugeValue, { padding: 0 }]} size={60} maxValue={120} progressValueColor={'white'} title={'\u00B0 C'} titleColor={'white'} titleStyle={[styles.gauge, { fontSize: 20 }]} activeStrokeColor={'#05ED00'} strokeColorConfig={[
                            { color: '#05ED00', value: 0 },
                            { color: '#FF2500', value: 120 },
                        ]} dashedStrokeConfig={{
                            count: 35,
                            width: 2.5
                        }} />
                    </View>

                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'black',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    gauge: {
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    gaugeValue: {
        fontWeight: 'normal',
        fontStyle: 'italic'
    },
    aux: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: 'grey',
    },
    gearIndicator: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gearLogo: {
        height: 50,
        width: 50,
    },
    gearPlusMinus: {
        color: 'white',
        fontSize: 50,
    },
    gearText: {
        fontSize: 80,
        fontStyle: 'italic',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    icon: {
        padding: 10,
        color: 'white',
        // backgroundColor: 'red'
    },
    iconText: {
        fontStyle: 'italic',
        color: 'white',
        fontSize: 20,
    }
})