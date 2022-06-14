import { NavigationContainer } from '@react-navigation/native';
import MainStack from './Navigation/MainStack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native'
import { useEffect, useState } from 'react';
import { findAll, initDB } from './Database/localdb';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import FetchedRsvp from './Screens/FetchedRsvp';



export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false)

  const BottomTab = createBottomTabNavigator();

  useEffect(() => {
    initDB()
      .then(res => {
        console.log(res)
        setDbInitialized(true)
      })
      .catch(err => console.log(err))
  }, [])


  const About = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <BottomTab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
        <BottomTab.Screen
          options={{ tabBarIcon: () => <FontAwesome name="tasks" size={24} color="black" /> }}
          name='MainStack'
          component={MainStack}
          initialParams={{ dbInitialized: dbInitialized }}
        />
        <BottomTab.Screen
          options={{ tabBarIcon: () => <AntDesign name="solution1" size={24} color="black" /> }}
          name='FetchedRsvp'
          component={FetchedRsvp}
        />
      </BottomTab.Navigator>
    </NavigationContainer>

  );
}


