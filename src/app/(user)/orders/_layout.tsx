import { Link, Stack } from 'expo-router';

export default function MenuStack() {
  return (
    <Stack >
      {/*The targeted screen should exactly match the name of the page in the orders folder*/}
        <Stack.Screen name="index" options={{title:'Orders'}}/>
    </Stack>
  )
};