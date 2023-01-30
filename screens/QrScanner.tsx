import { StyleSheet, TouchableOpacity, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QrScanner({ navigation }: RootStackScreenProps<'QrScanner'>) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    const getBarCodeScannerPermissions = () => {
        ( async () => {
            const status = await BarCodeScanner.requestPermissionsAsync();
            console.log(status)
            setHasPermission(status == 'granted');
        })
    }
    useEffect(() => {

        getBarCodeScannerPermissions();
    }, [])

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        alert(`bar code with type ${type} and data ${data} has been scanned!`);
    };

    if(hasPermission === null) {
        return <Text>Requesting for camera permission</Text>
    }
    if(hasPermission === false){
        console.log(hasPermission)
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => getBarCodeScannerPermissions()} />
            </View>
        )
    }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qr scanner</Text>
      <BarCodeScanner 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title='Tap to scan again' onPress={() => setScanned(false)}/>}
      {/* <TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
