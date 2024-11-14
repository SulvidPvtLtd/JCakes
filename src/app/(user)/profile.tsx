import { View, Text } from 'react-native'
import React from 'react'
import { supabase } from '@/src/lib/supabase'
import Button from '@/src/components/Button'

const ProfileScree = () => {
  return (
    <View>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  )
}

export default ProfileScree