import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserSettings {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class ProfileSettings {
  @Field()
  info: string;

  @Field()
  isPublic: boolean;

  @Field()
  address: string;

  @Field()
  referred_users: number;
}

@ObjectType()
export class Settings {
  @Field(() => UserSettings)
  userSettings: UserSettings;

  @Field(() => ProfileSettings)
  profileSettings: ProfileSettings;

  @Field({nullable: true})
  avatar_url: string;
}

@ObjectType()
export class UpdateInfo {
  @Field(() => ProfileSettings)
  profileSettings: ProfileSettings;
}
