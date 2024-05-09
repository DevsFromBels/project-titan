import { Injectable } from "@nestjs/common"
import { CreateAvatarInput } from "./dto/create-avatar.input"
import { UpdateAvatarInput } from "./dto/update-avatar.input"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AvatarsService {
	private readonly s3Client = new S3Client({
		region: this.configService.getOrThrow("AWS_S3_REGION"),
	})

	constructor(private readonly configService: ConfigService) {}

  async upload(fileName:string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'profile/avatars',
        Key: fileName,
        Body: file,
      })
    )

  }
}
