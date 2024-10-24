/*
  This file sets up the layout for the admin section using tabs. 
  It defines the tab bar options, including the active and inactive 
  colors, and sets up navigation for the various admin screens, 
  such as "Menu" and "Orders."
*/
import Colors from '@/src/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';

export default function MenuStack() {
  return (
    <Stack>
      {/*The targeted screen should exactly match the name of the page in the folder*/}
        <Stack.Screen 
          name="index" 
          options={{
            headerTitleStyle:{color:Colors.light.adminBtn, fontSize: 20},
            title:'Menu',  headerRight:() => (
              <Link href="/(admin)/menu/create" asChild>
                <Pressable>
                  {({ pressed }) => (
                      <FontAwesome
                        name="plus-square-o"
                        size={25}
                        color={Colors.light.adminBtn}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                  )}
                </Pressable>
              </Link>
            ),
         }}/>

         
        
    </Stack>
  )
};