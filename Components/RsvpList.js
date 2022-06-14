import { useEffect } from 'react'
import { Text, FlatList, View, StyleSheet, Pressable, DeviceEventEmitter } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { findAll } from '../Database/localdb'

const RsvpList = ({ rsvpList, setRsvpList }) => {

    useEffect(() => {
        return DeviceEventEmitter.removeAllListeners()
    }, []) 

    const nav = useNavigation()

    const handleNavigate = (rsvp) => {
        nav.navigate('SelectedRsvpScreen', {rsvp: rsvp })
    }

    DeviceEventEmitter.addListener("removeRsvpEvent", () => {
        findAll()
            .then(res => setRsvpList(res))

    })


    const _renderItem = ({ item }) => {
        return (
            <Pressable onPress={() => handleNavigate(item)} >
                <View style={styles.rsvp} >
                    <Text>{item.title}</Text>
                </View>
            </Pressable>
        )
    }


    return (
        <FlatList
            data={rsvpList}
            renderItem={_renderItem}
            keyExtractor={(item, index) => index}
        />
    )
}

const styles = StyleSheet.create({
    rsvp: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 4
    }
})

export default RsvpList;