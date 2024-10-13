import Colors from '@/src/constants/Colors';
import { Stack } from 'expo-router';

export default function MenuStack() {
  return (
    <Stack >
        {/*<Stack.Screen name="index" options={{title:'Order Items', headerTitleStyle:{color:Colors.light.adminBtn, fontSize: 20}}}/>*/}
        <Stack.Screen name="list" options={{headerShown:false}}/>
    </Stack>
  )
};