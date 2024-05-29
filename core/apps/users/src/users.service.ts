import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtVerifyOptions } from "@nestjs/jwt";
import { PrismaService } from "../../../prisma/prisma.service";
import { ActivationDto, LoginDto, RegisterDto } from "./dto/user.dto";
import { EmailService } from "./email/email.service";
import * as bcrypt from "bcrypt";
import { TokenSender } from "./utils/sendToken";
import { User } from "@prisma/client";
import { OmitType } from "@nestjs/graphql";

interface UserData {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}

  /**
   * getUserByName
   *
   * @async
   * @param {string} userName
   */
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new BadRequestException("User not found");
    }

    const avatar = await this.prisma.avatars.findFirst({
      where: {
        userId: user.id
      }
    })

    return {
      name: user.name,
      email: user.email,
      avatar: avatar.url
    }
  }

  /**
   * Register a user on the system.
   *
   * @async
   * @param {RegisterDto} registerDto
   * @param {Response} response
   * @returns {unknown}
   */
  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password } = registerDto;
    const id = name.toLowerCase().trim();
    const createdAt = new Date();

    const isEmailExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const existName = await this.prisma.user.findUnique({
      where: {
        name,
      },
    });

    if (existName) {
      throw new BadRequestException("User already exist with this username!");
    }

    if (existName) {
      throw new BadRequestException("User already exist with this username!");
    }

    if (isEmailExists) {
      throw new BadRequestException("User allready exists with this email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id,
      name,
      password: hashedPassword,
      email,
      createdAt,
    };

    const activationToken = await this.createActivationToken(user);

    const activationCode = activationToken.activationCode;

    const activation_token = activationToken.token;

    await this.emailService.sendMail({
      email,
      subject: "Activate your account!",
      template: "./activation-mail",
      name,
      activationCode,
    });

    return { activation_token, response };
  }

  /**
   * Create activation Token for comfirm an email address
   *
   * @async
   * @param {UserData} user
   * @returns {unknown}
   */
  async createActivationToken(user: UserData) {
    const activationCode = Math.floor(100000 + Math.random() * 9000).toString();

    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>("ACTIVATION_SECRET"),
        expiresIn: "5m",
      }
    );

    return { token, activationCode };
  }

  /**
   * Activating user account with email address
   *
   * @async
   * @param {ActivationDto} activationDto
   * @param {Response} response
   * @returns {unknown}
   */
  async activateUser(activationDto: ActivationDto, response: Response) {
    const { activationToken, activationCode } = activationDto;

    const newUser: { user: UserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>("ACTIVATION_SECRET"),
      } as JwtVerifyOptions) as { user: UserData; activationCode: string };

    if (newUser.activationCode !== activationCode) {
      throw new BadRequestException("Invalid activation code");
    }

    const { name, email, password } = newUser.user;
    const id = name.toLowerCase().trim();
    const createdAt = new Date();

    const existName = await this.prisma.user.findUnique({
      where: {
        name,
      },
    });

    const existUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existName) {
      throw new BadRequestException("User already exist with this username!");
    }

    if (existUser) {
      throw new BadRequestException("User already exist with this email!");
    }

    const user = await this.prisma.user.create({
      data: {
        id,
        name,
        email,
        password,
        createdAt,
      },
    });

    const profile = await this.prisma.profile.create({
      data: {
        info: "",
        isPublic: true,
        userId: user.id,
      },
    });

    const avatar = this.prisma.avatars.create({
      data: {
        url: "",
        userId: user.id,
      },
    });

    return { user, response, profile, avatar };
  }

  /**
   * Login user to the system
   *
   * @async
   * @param {LoginDto} loginDto
   * @returns {unknown}
   */
  async Login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user && (await this.comparePassword(password, user.password))) {
      const tokeSender = new TokenSender(this.configService, this.jwtService);
      return tokeSender.sendToken(user);
    } else {
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        error: {
          message: "Invalid email or password",
        },
      };
    }
  }

  /**
   * Get from JWT tokens a user
   *
   * @async
   * @param {*} req
   * @returns {unknown}
   */
  async getLoggedInUser(req: any) {
    const user = req.user;
    const accessToken = req.accesstoken;
    const refreshToken = req.refreshtoken;

    console.log(accessToken);
    console.log(refreshToken);

    return { user, refreshToken, accessToken };
  }

  /**
   * Logout user from JWT token
   *
   * @async
   * @param {*} req
   * @returns {unknown}
   */
  async Logout(req: any) {
    req.user = null;
    req.accesstoken = null;
    req.refreshtoken = null;

    return {
      message: "Logged out successfully!",
    };
  }

  /**
   * Compared password from data get's and server db data
   *
   * @async
   * @param {string} password
   * @param {string} hashedPassword
   * @returns {Promise<boolean>}
   */
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
