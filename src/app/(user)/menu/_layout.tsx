import Colors from '@/src/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';

export default function MenuStack() {
  return (
    <Stack screenOptions={{
      headerRight:() => (
        <Link href="/cart" asChild>
          <Pressable>
            {({ pressed }) => (
              <Feather
                name="shopping-cart"
                size={30}
                color={Colors.light.tint}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
    }}>
      {/*The targeted screen should exactly match the name of the page in the folder*/}
        <Stack.Screen name="index" options={{title:'Menu'}}/>
    </Stack>
  )
};