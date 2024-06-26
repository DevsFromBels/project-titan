import { Args, Mutation, Resolver, Query, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import {
  ActivationResponse,
  DeleteUserResponse,
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  UserByEmail,
} from "./types/users.types";
import { ActivationDto, RegisterDto } from "./dto/user.dto";
import {
  BadGatewayException,
  BadRequestException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "./guards/auth.guard";
import { DeleteUser, GetUserByName } from "./entities/user.entity";

@Resolver("User")
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args("registerDto") registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.email || !registerDto.name || !registerDto.password) {
      throw new BadRequestException("Please fill the all fields.");
    }

    const { activation_token } = await this.userService.register(
      registerDto,
      context.res,
    );

    return { activation_token };
  }

  @Mutation(() => ActivationResponse)
  async activateUser(
    @Args("activationDto") activationDto: ActivationDto,
    @Context() context: { res: Response },
  ): Promise<ActivationResponse> {
    return await this.userService.activateUser(activationDto, context.res);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<LoginResponse> {
    return await this.userService.Login({ email, password });
  }

  @Query(() => LoginResponse)
  @UseGuards(AuthGuard)
  async getLoggedInUser(@Context() context: { req: Request }) {
    return this.userService.getLoggedInUser(context.req);
  }

  @Query(() => LogoutResponse)
  @UseGuards(AuthGuard)
  async LogOutUser(@Context() context: { req: Request }) {
    return this.userService.Logout(context.req);
  }

  @Mutation(() => DeleteUserResponse)
  async DeleteUser(@Args("userID") userID: string) {
    return this.userService.deleteUser(userID)
  }

  @Query(() => GetUserByName)
  async getUserByName(@Args("email") email: string) {
    return this.userService.getUserByEmail(email);
  }
}
