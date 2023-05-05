import { StyleSheet, TouchableOpacity, Button, Dimensions } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import { BarCodeScanner } from 'expo-barcode-scanner';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function QrScanner({ navigation }: RootStackScreenProps<'QrScanner'>) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [data, setData] = useState(null);



    console.log(windowWidth, windowHeight)
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

    const isJson = (str:any) => {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        console.log(data)
        console.log(type)
        if(isJson(data)) {
          console.log("entre dans le json")
          setData(data)
        }
        alert(`bar code with type ${type} and data ${data} has been scanned!`);
    };

    // if(hasPermission === null) {
    //     getBarCodeScannerPermissions();
    //     return <Text>Requesting for camera permission</Text>
    // }
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
    <View>
        <View style={styles.container}>
          <BarCodeScanner 
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={[StyleSheet.absoluteFillObject, styles.containerQR]}
            />
        </View>
        <View>
          {scanned && <Button title='Tap to scan again' onPress={() => setScanned(false)}/>}
          {data && (
            <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.link}>
            <Text style={styles.linkText}>Go to home screen!</Text>
          </TouchableOpacity>
          )}
           <TouchableOpacity onPress={() => navigation.replace('Home')} style={styles.link}>
            <Text style={styles.linkText}>Go to home screen!</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: windowHeight / 3,
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
  containerQR: {

  }
});
