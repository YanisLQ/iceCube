import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default function QRScanner({ navigation }: RootStackScreenProps<'QrScanner'>) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  console.log(scannedData)
  const handleBarCodeScanned = ({ type, data }) => {
    const [restaurantId, numtable] = data.split(',');
    navigation.replace('Home', { restaurantId: restaurantId,numtable: numtable });

  };
  if (hasCameraPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera.</Text>;
  }


  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={handleBarCodeScanned}
      />
      {scannedData && (
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scanned Data:</Text>
          <Text style={styles.scanResult}>{scannedData}</Text>
        </View>
      )}
      {!scannedData && (
        <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.overlay}>
          <Text style={styles.scanText}>Scan QR code</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  scanText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  scanResult: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
