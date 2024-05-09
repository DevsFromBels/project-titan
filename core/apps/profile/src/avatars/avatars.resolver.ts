import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"
import { AvatarsService } from "./avatars.service"
import { Avatar } from "./entities/avatar.entity"
import { CreateAvatarInput } from "./dto/create-avatar.input"
import { UpdateAvatarInput } from "./dto/update-avatar.input"
import { UseInterceptors } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"

@Resolver(() => Avatar)
export class AvatarsResolver {
	constructor(private readonly avatarsService: AvatarsService) {}

	@Mutation(() => Avatar)
	@UseInterceptors(FileInterceptor("file"))
	async createAvatar(
		@Args("createAvatarInput") createAvatarInput: CreateAvatarInput,
    file: Express.Multer.File
	) {
		await this.avatarsService.upload(file.originalname, file.buffer)
	}
}
