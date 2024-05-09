import { CreateAvatarInput } from './create-avatar.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAvatarInput extends PartialType(CreateAvatarInput) {
  @Field(() => Int)
  id: number;
}
