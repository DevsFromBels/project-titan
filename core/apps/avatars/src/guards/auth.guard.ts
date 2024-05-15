import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from "@nestjs/common";
  import { ConfigService } from "@nestjs/config";
  import { JwtService } from "@nestjs/jwt";
  import { PrismaService } from "../../../../prisma/prisma.service";

  
  @Injectable()
  export class HeadersGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly prisma: PrismaService,
      private readonly configService: ConfigService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
  
      const accessToken = request.headers.accesstoken;
      const refreshToken = request.headers.refreshtoken;
  
      if (!accessToken || !refreshToken) {
        throw new UnauthorizedException("Please login to access this resource");
      }
  
      if (accessToken) {
        try {
          const decoded = this.jwtService.verify(accessToken, {
            secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
          });
  
          if (!decoded) {
            throw new UnauthorizedException("Invalid access token!");
          }
  
          request.user = { id: decoded.id };
  
          await this.updateAccessToken(request);
        } catch (error) {
          if (error.name === "JsonWebTokenError") {
            throw new UnauthorizedException("Invalid access token!");
          }
          throw new UnauthorizedException("Please login to access this resource");
        }
      }
  
      return true;
    }
  
    private async updateAccessToken(req: any): Promise<void> {
      try {
        const refreshTokenData = req.headers.refreshtoken as string;
  
        const decoded = this.jwtService.decode(refreshTokenData);
  
        const expirationTime = decoded.exp * 1000;
  
        if (expirationTime < Date.now()) {
          throw new UnauthorizedException(
            "Please login to access this resource!"
          );
        }
  
        const user = await this.prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
        });
  
        const accessToken = this.jwtService.sign(
          { id: user.id },
          {
            secret: this.configService.get<string>("ACCESS_TOKEN_SECRET"),
            expiresIn: "5m",
          }
        );
  
        const refreshToken = this.jwtService.sign(
          { id: user.id },
          {
            secret: this.configService.get<string>("REFRESH_TOKEN_SECRET"),
            expiresIn: "7d",
          }
        );
  
        req.accesstoken = accessToken;
        req.refreshtoken = refreshToken;
        req.user = user;
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
  