export interface IGetSettings {
  getSettings: GetSettings;
}

export interface GetSettings {
  userSettings: UserSettings;
  profileSettings: ProfileSettings;
  avatar_url: string;
}

export interface UserSettings {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}

export interface ProfileSettings {
  info: string;
  isPublic: boolean;
  address: string;
  referred_users: number;
}
