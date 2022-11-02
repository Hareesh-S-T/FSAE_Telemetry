import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Gauge from '../../Components/Gauge';

export default function HomeScreen() {
    const [speed, setSpeed] = useState(100);
    const [rpm, setRpm] = useState(1000);

    return (
        <View style={styles.container}>
            <Gauge containerStyle={{}} value={rpm} progressValueStyle={styles.gaugeValue} size={100} maxValue={11500} progressValueColor={'white'} title={'rpm'} titleColor={'#FF2500'} titleStyle={styles.gauge} strokeColorConfig={[
                { color: 'green', value: 0 },
                { color: 'yellow', value: 8000 },
                { color: '#FF2500', value: 10000 }
            ]} activeStrokeColor={'white'} />

            <Gauge containerStyle={{}} value={speed} progressValueStyle={styles.gaugeValue} size={120} maxValue={200} progressValueColor={'white'} title={'Km/h'} titleColor={'#00ABFF'} titleStyle={styles.gauge} activeStrokeColor={'#00ABFF'} strokeColorConfig={[
                { color: '#00ABFF', value: 0 },
                { color: '#00ABFF', value: 100 }
            ]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
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
    }
})