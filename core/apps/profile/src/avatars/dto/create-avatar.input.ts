import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAvatarInput {
  @Field(() => File, { description: 'Example field (placeholder)' })
  File: File;
}
