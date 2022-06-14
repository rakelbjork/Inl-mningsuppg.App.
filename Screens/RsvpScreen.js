import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Dimensions, Button, FlatList, StyleSheet, Text, TextInput, KeyboardAvoidingView, ImageBackground, _renderItem} from 'react-native';
import Header from '../Components/Header';
import RsvpInput from '../Components/RsvpInput';
import RsvpList from '../Components/RsvpList';
import { findAll } from '../Database/localdb';

export default function RsvpScreen({ dbInitialized }) {

  const [rsvpList, setRsvpList] = useState([])

  useEffect(() => {
    findAll()
        .then(res => setRsvpList(res))

}, [dbInitialized])

  return (
    <>
      <ImageBackground 
        source={require("../assets/wed1.png")}
        resizeMode='cover'
        style={styles.image}
      >
      <StatusBar style="auto" />
      <Header />
      <RsvpInput setRsvpList = {setRsvpList} />
      <RsvpList rsvpList={rsvpList} setRsvpList={setRsvpList} />
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }, image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
  });

