import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Home from './screens/Home';
import Login from './screens/Login';
import { LogoutScreen } from './screens/Logout';
import {Proposal} from './screens/Proposal';

export default function App() {
  const Drawer = createDrawerNavigator()
  return (
    <NavigationContainer>
      <Drawer.Navigator useLegacyImplementation initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Proposal" component={Proposal} options={{headerTitle: 'Proposta', title: 'Proposta'}} />
        <Drawer.Screen name="Logout" component={LogoutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
