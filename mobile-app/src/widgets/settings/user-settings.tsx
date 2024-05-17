import { UserCog } from 'lucide-react-native';
import React from 'react'
import { Text, View } from 'react-native';

interface IUserSettingsWidget {
    name: string;
    id: string;
    email: string;
    role: string;
}

const UserSettingsWidget = ({name, id, email, role}: IUserSettingsWidget) => {
  return (
    <View className="border rounded-xl mt-5 p-4 flex flex-col gap-2 border-white">
    <View className="flex gap-2 flex-row">
      <UserCog color='white'/>
      <Text className='text-xl text-white'>User Settigns</Text>
    </View>
    <View>
      <Text className='text-xl text-white'>User Name</Text>
      <Text className='text-white'>{name}</Text>
    </View>
    <View>
      <Text className='text-xl text-white'>User ID</Text>
      <Text className='text-white'>{id}</Text>
    </View>
    <View>
      <Text className='text-xl text-white'>Email</Text>
      <Text className='text-white'>{email}</Text>
    </View>
    <View>
      <Text className='text-xl text-white'>Your Role</Text>
      <Text className='text-white'>{role}</Text>
    </View>
  </View>
  )
}

export default UserSettingsWidget