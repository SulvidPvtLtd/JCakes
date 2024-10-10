import { Redirect } from 'expo-router';
import { View} from '@/src/components/Themed';
// import Button from '@/src/components/Button';

export default function TabIndex () {
  return (
  <View>
    <Redirect href={'/(admin)/menu/'} />;    
  </View>
  )
}