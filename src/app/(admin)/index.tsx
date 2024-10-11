import { Redirect } from 'expo-router';
import { View} from '@/src/components/Themed';


export default function TabIndex () {
  return (
  <View>
    <Redirect href={'/(admin)/menu/'} />   
  </View>
  )
}