import {
	BadGatewayException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common"
import { PrismaService } from "../../../prisma/prisma.service"
import { Profile, UserProfile } from "./entities/profile.entitie"
import * as AWS from "aws-sdk"
import { ConfigService } from "@nestjs/config"
import { v4 as uuidv4 } from "uuid"
import { Express } from "express"
import { MulterModule } from "@nestjs/platform-express"
import { diskStorage } from "multer"

const AVATAR_BASE_URL = "https://eu2.contabostorage.com/profile/avatars"

@Injectable()
export class ProfileService {
	private s3: AWS.S3

	constructor(
		private prisma: PrismaService,
		private configService: ConfigService
	) {
		this.s3 = new AWS.S3({
			accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
			secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
			region: this.configService.get("AWS_S3_REGION"),
		})
	}

	async uploadProfilePicture(
		userId: string,
		file: Express.Multer.File
	): Promise<string> {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		})

		if (!user) {
			throw new BadGatewayException("User not found")
		}

		const fileExtension = file.mimetype.split("/")[1]
		const key = `avatars/${userId}.${fileExtension}`

		try {
			await this.s3
				.upload({
					Bucket: this.configService.get("S3_BUCKET_NAME"),
					Key: key,
					Body: file.buffer,
					ContentType: file.mimetype,
					ACL: "public-read",
				})
				.promise()

			await this.prisma.user.update({
				where: {
					id: userId,
				},
				data: {
					profilePicture: `${AVATAR_BASE_URL}/${key}`,
				},
			})

			return `${AVATAR_BASE_URL}/${key}`
		} catch (error) {
			console.error(error)
			throw new InternalServerErrorException(
				"Failed to upload the profile picture"
			)
		}
	}

	async getProfile(userId: string): Promise<UserProfile> {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
		})

		if (!user) {
			throw new BadGatewayException("User not found")
		}

		const profile = await this.prisma.profile.findUnique({
			where: {
				userId: user.id,
			},
		})

		return {
			user: user,
			info: profile.info,
			isPublic: profile.isPublic,
		}
	}

	async searchUserProfile(
		userName: string,
		limit?: number
	): Promise<{ users: Profile[]; isPublic: boolean[] | null }> {
		const profiles = await this.prisma.profile.findMany({
			where: {
				user: {
					name: {
						contains: userName,
						mode: "insensitive",
					},
				},
				isPublic: true,
			},
			take: limit || 5,
			include: {
				user: true,
			},
		})

		return {
			users: profiles.map((profile) => profile.user),
			isPublic: profiles.map((profile) => profile.isPublic),
		}
	}

	async getAllUsersProfiles(
		limit: string,
		page?: number
	): Promise<{ users: Profile[] }> {
		const users = await this.prisma.user.findMany({
			take: Number(limit),
			skip: page ? Number(page) * Number(limit) : undefined,
			include: {
				profile: true,
			},
		})

		return { users }
	}

	async getSettings(userName: string) {}

	async updateSettings(settings) {}
}
