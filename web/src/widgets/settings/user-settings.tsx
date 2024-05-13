import { UserCog } from 'lucide-react';
import React from 'react'

interface IUserSettingsWidget {
    name: string;
    id: string;
    email: string;
    role: string;
}

const UserSettingsWidget = ({name, id, email, role}: IUserSettingsWidget) => {
  return (
    <div className="border rounded-xl mt-5 p-4 flex flex-col gap-2">
    <div className="flex gap-2">
      <UserCog />
      <h1>User Settigns</h1>
    </div>
    <div>
      <span>User Name</span>
      <div>{name}</div>
    </div>
    <div>
      <span>User ID</span>
      <div>{id}</div>
    </div>
    <div>
      <span>Email</span>
      <div>{email}</div>
    </div>
    <div>
      <span>Your Role</span>
      <div>{role}</div>
    </div>
  </div>
  )
}

export default UserSettingsWidget