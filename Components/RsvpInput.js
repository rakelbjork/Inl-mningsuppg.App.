import { Pressable, View, StyleSheet, Button, TextInput, Text, TouchableOpacity } from "react-native";
import { useState } from 'react';
import Rsvp from "../Models/Rsvp";
import { findAll, insert } from "../Database/localdb"


const RsvpInput = ({setRsvpList}) => {

    const [textInputValue, setTextInputValue] = useState('')
    const [count, setCount] = useState(1)

    const handleTextChange = (text) => {
        setTextInputValue(text)
      }
    
      const handleAdd = () => {
        const rsvp = new Rsvp(count, textInputValue, false)
        setCount(prev => prev + 1);
        insert(rsvp)
            .then(res => {
                console.log("insertres", res)
                return findAll()
            })
            .then(res => setRsvpList(res))

      }

    return (
        <View style={styles.input}>
          <TextInput
            style={styles.textinput}
            onChangeText={handleTextChange}
            value={textInputValue}
            placeholder="Vilka är ni som kommer?"
      />
      <Pressable
                style={styles.addButton}
                onPress={handleAdd}
            >
                <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
     </View>
    )
}

const styles = StyleSheet.create ({
    textinput: {
        backgroundColor: '#FFF',
         width: '70%',
         marginHorizontal: 20,
         paddingHorizontal: 10
      }, 
      input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
      },
      addButton: {
          paddingHorizontal: 10,
          paddingVertical: 6,
          backgroundColor: 'teal',
          borderRadius: 4,
          marginRight: 10
      },
      addButtonText: {
          color: '#fff'
      }
})

export default RsvpInput;