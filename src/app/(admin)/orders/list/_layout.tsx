/*  
    Will make use of: Material Top Tabs Navigator.
    This is not yet supported out of the box.
    A material-design themed tab bar on the top of the screen that lets you switch 
    between different routes by tapping the tabs or swiping horizontally. 
    Transitions are animated by default. Screen components for each route are mounted immediately.
    npm install @react-navigation/material-top-tabs react-native-tab-view
    npx expo install react-native-pager-view
*/
import { Tabs } from "expo-router";

export default function OrderListNavigator(){
    return(<Tabs/>)
}

