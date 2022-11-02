import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Circle } from 'react-native-progress';

export default function Tachometer() {
    const [speed, setSpeed] = useState(60);
    return (
        <View style={styles.container}>
            <Circle size={100} indeterminate={false} strokeCap='square' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'grey',
    }
})