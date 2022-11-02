import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Speedometer() {
    const [speed, setSpeed] = useState(60);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {speed}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'grey',
    },
    text: {
        fontSize: 120,
        fontWeight: 'bold',
        // color: 'white'
    }
})