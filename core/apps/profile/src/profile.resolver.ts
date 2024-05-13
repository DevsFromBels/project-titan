import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { ProfileService } from "./profile.service";
import {
  AllUsersProfiles,
  UserProfile,
  UserProfileSearch,
} from "./entities/profile.entitie";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "apps/users/src/guards/auth.guard";
import { SettingsService } from "./services/settings/settings.service";
import { Settings, UpdateInfo } from "./entities/settings.entitie";

@Resolver("Profile")
export class ProfileResolver {
  constructor(
    private profileService: ProfileService,
    private settingService: SettingsService
  ) {}

  @Query(() => UserProfile)
  async profile(@Args("userName") userName: string) {
    return await this.profileService.getProfile(userName);
  }

  @Query(() => UserProfileSearch)
  async searchProfile(
    @Args("userName") userName: string,
    @Args("limit", { defaultValue: 5 }) limit?: number
  ) {
    const { users, isPublic } = await this.profileService.searchUserProfile(
      userName,
      limit
    );
    const publicUsers = users.filter((_, index) => isPublic[index]);
    return { users: publicUsers, isPublic: isPublic };
  }

  @Query(() => AllUsersProfiles)
  async getAllUsersProfiles(
    @Args("limit") limit: string,
    @Args("page") page: number
  ) {
    const result = await this.profileService.getAllUsersProfiles(limit, page);

    return { users: result.users };
  }

  @Query(() => Settings)
  @UseGuards(AuthGuard)
  async getSettings(@Context() context: { req: Request }) {
    return await this.settingService.getSettings(context);
  }

  @Mutation(() => UpdateInfo)
  @UseGuards(AuthGuard)
  async settingsUpdateUserInfo(@Context() context: { req: Request }, @Args("newInfo") newInfo: string) {
    return await this.settingService.settingsUpdateUserInfo(context, newInfo);
  }

  // @UseGuards(AuthGuard)
  // async updateSettings(@Args('userName') settings: object) {
  //   return await this.profileServie.updateSettings(settings);
  // }
}
