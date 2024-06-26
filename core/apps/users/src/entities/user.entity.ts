import { ObjectType, Field, Directive } from "@nestjs/graphql";

@ObjectType()
export class User {
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
export class GetUserByName {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  avatar: string;
}

@ObjectType()
export class DeleteUser {
  @Field()
  message: string;
}