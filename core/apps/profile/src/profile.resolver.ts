import { Args, Query, Resolver } from "@nestjs/graphql";
import { ProfileService } from "./profile.service";
import { UserProfile, UserProfileSearch } from "./entities/profile.entitie";
import { ProfileDTO } from "./dto/profile.dto";
import { UseGuards } from "@nestjs/common";

@Resolver("Profile")
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Query(() => UserProfile)
  async profile(@Args("userName") userName: string) {
    return await this.profileService.getProfile(userName);
  }

  @Query(() => UserProfileSearch)
  async searchProfile(
    @Args("userName") userName: string,
    @Args("limit", { defaultValue: 5 }) limit?: number
  ) {
    const { users, isPublic } = await this.profileService.searchUserProfile(userName, limit);
    const publicUsers = users.filter((_, index) => isPublic[index]);
    return { users: publicUsers, isPublic: isPublic };
  }

  // @UseGuards(AuthGuard)
  // async getSettings(@Args('userName') userName: string) {
  //   return await this.profileServie.getSettings(userName);
  // }

  // @UseGuards(AuthGuard)
  // async updateSettings(@Args('userName') settings: object) {
  //   return await this.profileServie.updateSettings(settings);
  // }
}
