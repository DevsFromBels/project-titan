import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Avatar {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
