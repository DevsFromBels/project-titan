import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { ProfileService } from "./profile.service"
import {
	AllUsersProfiles,
	UserProfile,
	UserProfileSearch,
} from "./entities/profile.entitie"
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver("Profile")
export class ProfileResolver {
	constructor(private profileService: ProfileService) {}

	@Mutation(() => String)
	async uploadProfilePicture(
		@Args("userId", { type: () => String }) userId: string,
		@Args({ name: "file", type: () => GraphQLUpload })
		file: Promise<FileUpload>
	) {
		const uploadedFile = await file
		return this.profileService.uploadProfilePicture(userId, uploadedFile)
	}

	@Query(() => UserProfile)
	async profile(@Args("userName") userName: string) {
		return await this.profileService.getProfile(userName)
	}

	@Query(() => UserProfileSearch)
	async searchProfile(
		@Args("userName") userName: string,
		@Args("limit", { defaultValue: 5 }) limit?: number
	) {
		const { users, isPublic } = await this.profileService.searchUserProfile(
			userName,
			limit
		)
		const publicUsers = users.filter((_, index) => isPublic[index])
		return { users: publicUsers, isPublic: isPublic }
	}

	@Query(() => AllUsersProfiles)
	async getAllUsersProfiles(
		@Args("limit") limit: string,
		@Args("page") page: number
	) {
		const result = await this.profileService.getAllUsersProfiles(
			limit,
			page
		)

		return { users: result.users }
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
