import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Tachometer from '../../Components/Tachometer';
import Speedometer from '../../Components/Speedometer';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Tachometer />
            <Speedometer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // padding: 40,
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
})