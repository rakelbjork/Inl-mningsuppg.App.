import RsvpScreen from '../Screens/RsvpScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectedRsvpScreen from '../Screens/SelectedRsvpScreen';


const MainStack = ({ dbInitialized }) => {

    const StackNavigation = createNativeStackNavigator();

    return (
        <StackNavigation.Navigator>
            <StackNavigation.Screen
                options={{ headerShown: false }}
                name='RsvpScreen'
                component={RsvpScreen}
                initialParams={{ dbInitialized: dbInitialized }}
            />
            <StackNavigation.Screen
                name='SelectedRsvpScreen'
                component={SelectedRsvpScreen}
            />
        </StackNavigation.Navigator>
    )
}

export default MainStack