import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Text, Pressable, DeviceEventEmitter} from "react-native"
import { deleteById } from "../Database/localdb";


const SelectedRsvpScreen = ({ route }) => {

    const nav = useNavigation()

    const { rsvp: { id } } = route.params
    console.log(route.params)

    const handleDelete = () => {
        deleteById(id)
          .then(() => DeviceEventEmitter.emit('removeRsvpEvent'))
        nav.goBack();
    }

    return (
        <View style= {styles.container}>
            <Pressable style={styles.deleteButton}
                onPress={handleDelete}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    deleteButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        backgroundColor: 'teal',
        borderRadius: 4,
        marginRight: 10
    },
    deleteButtonText: {
        color: '#fff'
    }
})

export default SelectedRsvpScreen