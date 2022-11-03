import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import CircularProgress from 'react-native-circular-progress-indicator';

interface GaugeProps {
    containerStyle: object;
    value: number;
    progressValueStyle: object;
    size: number;
    progressValueColor: string;
    maxValue: number;
    title: string;
    titleColor: string;
    titleStyle: object;
    activeStrokeColor: string;
    strokeColorConfig: any;
    dashedStrokeConfig: any

}

export default function Gauge({ containerStyle, value, progressValueStyle, size, progressValueColor, maxValue, title, titleColor, titleStyle, strokeColorConfig, activeStrokeColor, dashedStrokeConfig }: GaugeProps) {
    return (
        <View style={[styles.container, containerStyle]}>
            <CircularProgress
                value={value}
                progressValueStyle={progressValueStyle}
                radius={size}
                duration={1000}
                progressValueColor={progressValueColor}
                maxValue={maxValue}
                title={title}
                titleColor={titleColor}
                titleStyle={titleStyle}
                strokeColorConfig={strokeColorConfig}
                activeStrokeColor={activeStrokeColor}
                dashedStrokeConfig={dashedStrokeConfig}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        // flex: 1,
        alignItems: 'center',
        // backgroundColor: 'white'

    }
})