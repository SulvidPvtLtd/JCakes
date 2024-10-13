/*  
    Will make use of: Material Top Tabs Navigator.
    This is not yet supported out of the box.
    A material-design themed tab bar on the top of the screen that lets you switch 
    between different routes by tapping the tabs or swiping horizontally. 
    Transitions are animated by default. Screen components for each route are mounted immediately.
    npm install @react-navigation/material-top-tabs react-native-tab-view
    npx expo install react-native-pager-view
*/
import { withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from "react-native-safe-area-context";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function OrderListNavigator(){
    return(
        <SafeAreaView edges={["top"]} style={{flex:1, backgroundColor:"white"}}>
            <TopTabs>
                <TopTabs.Screen name="index" options={{title:"Active"}}/>
                {/*<TopTabs.Screen name="archive" options={{title:"Archive"}}/>"*/}
            </TopTabs>
        </SafeAreaView>
    )
}

