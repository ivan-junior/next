import { createDrawerNavigator } from "@react-navigation/drawer"
import { LogoutScreen } from "./Logout"
import { Proposal } from "./Proposal"

export default function Home(props): JSX.Element {
    const Drawer = createDrawerNavigator()
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Proposal" component={Proposal} options={{ headerTitle: 'Proposta', title: 'Proposta' }} />
            <Drawer.Screen name="Logout" component={LogoutScreen} />
        </Drawer.Navigator>
    )
}