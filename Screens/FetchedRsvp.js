import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native"
/*import { BASE_URL } from '@env'*/


const FetchedRsvp = () => {

    let BASE_URL = ""

    const [ rsvps, setRsvps] = useState([])

    useEffect(() => {
        fetchRequest()
        console.log(BASE_URL)
    }, [])

    const fetchRequest = () => {
        fetch(BASE_URL + "/api/rsvp")
            .then(res => res.json())
            .then(res => setRsvps(res))
            .catch(err => console.log(err))
    }

    const deleteRequest = (id) => {
        fetch(BASE_URL + "/api/rsvp/" + id, {
            method: 'DELETE',
        })
            .then(() => fetchRequest())
    }

    const _renderItem = ({ item: rsvp }) => {
        return (
            <View style={styles.rsvp}>
                <Pressable onPress={() => deleteRequest(rsvp.id)}>
                    <Text>Desc: {rsvp.desc}</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={rsvps}
                renderItem={_renderItem}
                keyExtractor={item => item.id}
    />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50
    },
    todo: {
        margin: 20,
        padding: 20,
        backgroundColor: '#fff',
        width: '70%'
    }
})

export default FetchedRsvp;