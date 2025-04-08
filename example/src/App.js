import React, { useState } from 'react';
import { Button } from './Button';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { CameraKitContext } from '@snap/camera-kit-react-native';
import { Preview } from './CameraPreview';
import { CameraContext } from './CameraStateContext';

// const apiToken =
//     'REPLACE-THIS-WITH-YOUR-API-TOKEN';

const apiToken =
    'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQ0MDU5NzM0LCJzdWIiOiIzY2EwYzFmNS0xM2MzLTRiNmUtOTUzOC1iOTU4YjhmZmQ4ZGZ-U1RBR0lOR34xMWRhNTZhNC03ZDA5LTQ1NTQtODZhZi1iY2VjNGY1YjEzNGMifQ.TkiMw3NZyQsurrsceJm8yLpZftQPHpvEIIc856T5IVY';

export default function App() {
    const [stopRendering, setStopRendering] = useState(false);

    if (stopRendering) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Button title="Render context" onPress={() => setStopRendering(false)} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <CameraContext>
                <CameraKitContext apiToken={apiToken}>
                    <Preview onStopRendering={() => setStopRendering(true)} />
                </CameraKitContext>
            </CameraContext>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '30%',
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
    },
});
