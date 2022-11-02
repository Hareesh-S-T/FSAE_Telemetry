import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Gauge from '../../components/Gauge';

export default function HomeScreen() {
    const [speed, setSpeed] = useState(100);
    const [rpm, setRpm] = useState(1000);

    return (
        <View style={styles.container}>
            <Gauge containerStyle={{}} value={rpm} progressValueStyle={styles.gaugeValue} size={110} maxValue={11500} progressValueColor={'white'} title={'rpm'} titleColor={'#FF2500'} titleStyle={styles.gauge} strokeColorConfig={[
                { color: 'green', value: 0 },
                { color: 'yellow', value: 8000 },
                { color: '#FF2500', value: 10000 }
            ]} activeStrokeColor={'white'} />

            <Gauge containerStyle={{}} value={speed} progressValueStyle={styles.gaugeValue} size={120} maxValue={200} progressValueColor={'white'} title={'kmph'} titleColor={'#00ABFF'} titleStyle={styles.gauge} activeStrokeColor={'#00ABFF'} strokeColorConfig={[
                { color: '#00ABFF', value: 0 },
                { color: '#00ABFF', value: 100 }
            ]} />

            <View style={styles.aux}>
                <Icon name={'fuel'} size={35} />
                <Icon name={'coolant-temperature'} size={35} />
                <View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row'
    },
    gauge: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        // transform: [
        //     {rotate: '90deg'}
        // ]
    },
    gaugeValue: {
        fontWeight: 'normal',
        fontStyle: 'italic'
    },
    aux: {
        flex: 1,
        // backgroundColor: 'white'
    }
})