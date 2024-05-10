/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/profile/src/avatars/avatars.module.ts":
/*!****************************************************!*\
  !*** ./apps/profile/src/avatars/avatars.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvatarsModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const avatars_service_1 = __webpack_require__(/*! ./avatars.service */ "./apps/profile/src/avatars/avatars.service.ts");
const avatars_resolver_1 = __webpack_require__(/*! ./avatars.resolver */ "./apps/profile/src/avatars/avatars.resolver.ts");
let AvatarsModule = class AvatarsModule {
};
exports.AvatarsModule = AvatarsModule;
exports.AvatarsModule = AvatarsModule = __decorate([
    (0, common_1.Module)({
        providers: [avatars_resolver_1.AvatarsResolver, avatars_service_1.AvatarsService],
    })
], AvatarsModule);


/***/ }),

/***/ "./apps/profile/src/avatars/avatars.resolver.ts":
/*!******************************************************!*\
  !*** ./apps/profile/src/avatars/avatars.resolver.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvatarsResolver = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const avatars_service_1 = __webpack_require__(/*! ./avatars.service */ "./apps/profile/src/avatars/avatars.service.ts");
const avatar_entity_1 = __webpack_require__(/*! ./entities/avatar.entity */ "./apps/profile/src/avatars/entities/avatar.entity.ts");
const create_avatar_input_1 = __webpack_require__(/*! ./dto/create-avatar.input */ "./apps/profile/src/avatars/dto/create-avatar.input.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
let AvatarsResolver = class AvatarsResolver {
    constructor(avatarsService) {
        this.avatarsService = avatarsService;
    }
    async createAvatar(createAvatarInput, file) {
        await this.avatarsService.upload(file.originalname, file.buffer);
    }
};
exports.AvatarsResolver = AvatarsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => avatar_entity_1.Avatar),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    __param(0, (0, graphql_1.Args)("createAvatarInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_avatar_input_1.CreateAvatarInput !== "undefined" && create_avatar_input_1.CreateAvatarInput) === "function" ? _b : Object, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AvatarsResolver.prototype, "createAvatar", null);
exports.AvatarsResolver = AvatarsResolver = __decorate([
    (0, graphql_1.Resolver)(() => avatar_entity_1.Avatar),
    __metadata("design:paramtypes", [typeof (_a = typeof avatars_service_1.AvatarsService !== "undefined" && avatars_service_1.AvatarsService) === "function" ? _a : Object])
], AvatarsResolver);


/***/ }),

/***/ "./apps/profile/src/avatars/avatars.service.ts":
/*!*****************************************************!*\
  !*** ./apps/profile/src/avatars/avatars.service.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AvatarsService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_s3_1 = __webpack_require__(/*! @aws-sdk/client-s3 */ "@aws-sdk/client-s3");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let AvatarsService = class AvatarsService {
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.getOrThrow("AWS_S3_REGION"),
        });
    }
    async upload(fileName, file) {
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: 'profile/avatars',
            Key: fileName,
            Body: file,
        }));
    }
};
exports.AvatarsService = AvatarsService;
exports.AvatarsService = AvatarsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AvatarsService);


/***/ }),

/***/ "./apps/profile/src/avatars/dto/create-avatar.input.ts":
/*!*************************************************************!*\
  !*** ./apps/profile/src/avatars/dto/create-avatar.input.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAvatarInput = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
let CreateAvatarInput = class CreateAvatarInput {
};
exports.CreateAvatarInput = CreateAvatarInput;
__decorate([
    (0, graphql_1.Field)(() => File, { description: 'Example field (placeholder)' }),
    __metadata("design:type", typeof (_a = typeof File !== "undefined" && File) === "function" ? _a : Object)
], CreateAvatarInput.prototype, "File", void 0);
exports.CreateAvatarInput = CreateAvatarInput = __decorate([
    (0, graphql_1.InputType)()
], CreateAvatarInput);


/***/ }),

/***/ "./apps/profile/src/avatars/entities/avatar.entity.ts":
/*!************************************************************!*\
  !*** ./apps/profile/src/avatars/entities/avatar.entity.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Avatar = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
let Avatar = class Avatar {
};
exports.Avatar = Avatar;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Example field (placeholder)' }),
    __metadata("design:type", Number)
], Avatar.prototype, "exampleField", void 0);
exports.Avatar = Avatar = __decorate([
    (0, graphql_1.ObjectType)()
], Avatar);


/***/ }),

/***/ "./apps/profile/src/entities/profile.entitie.ts":
/*!******************************************************!*\
  !*** ./apps/profile/src/entities/profile.entitie.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllUsersProfiles = exports.UserProfileSearch = exports.UserProfile = exports.Profile = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
let Profile = class Profile {
};
exports.Profile = Profile;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Profile.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Profile.prototype, "createdAt", void 0);
exports.Profile = Profile = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@key(fields: "id")')
], Profile);
let UserProfile = class UserProfile {
};
exports.UserProfile = UserProfile;
__decorate([
    (0, graphql_1.Field)(() => Profile, { nullable: false }),
    __metadata("design:type", Profile)
], UserProfile.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true, defaultValue: "" }),
    __metadata("design:type", String)
], UserProfile.prototype, "info", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UserProfile.prototype, "isPublic", void 0);
exports.UserProfile = UserProfile = __decorate([
    (0, graphql_1.ObjectType)()
], UserProfile);
let UserProfileSearch = class UserProfileSearch {
};
exports.UserProfileSearch = UserProfileSearch;
__decorate([
    (0, graphql_1.Field)(() => [Profile], { nullable: true }),
    __metadata("design:type", Array)
], UserProfileSearch.prototype, "users", void 0);
exports.UserProfileSearch = UserProfileSearch = __decorate([
    (0, graphql_1.ObjectType)()
], UserProfileSearch);
let AllUsersProfiles = class AllUsersProfiles {
};
exports.AllUsersProfiles = AllUsersProfiles;
__decorate([
    (0, graphql_1.Field)(() => [Profile], { nullable: true }),
    __metadata("design:type", Array)
], AllUsersProfiles.prototype, "users", void 0);
exports.AllUsersProfiles = AllUsersProfiles = __decorate([
    (0, graphql_1.ObjectType)()
], AllUsersProfiles);


/***/ }),

/***/ "./apps/profile/src/profile.module.ts":
/*!********************************************!*\
  !*** ./apps/profile/src/profile.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const profile_service_1 = __webpack_require__(/*! ./profile.service */ "./apps/profile/src/profile.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const apollo_1 = __webpack_require__(/*! @nestjs/apollo */ "@nestjs/apollo");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma/prisma.service */ "./prisma/prisma.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const profile_resolver_1 = __webpack_require__(/*! ./profile.resolver */ "./apps/profile/src/profile.resolver.ts");
const avatars_module_1 = __webpack_require__(/*! ./avatars/avatars.module */ "./apps/profile/src/avatars/avatars.module.ts");
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            avatars_module_1.AvatarsModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloFederationDriver,
                autoSchemaFile: {
                    federation: 2,
                },
            }),
        ],
        controllers: [],
        providers: [
            profile_service_1.ProfileService,
            config_1.ConfigService,
            prisma_service_1.PrismaService,
            jwt_1.JwtService,
            profile_resolver_1.ProfileResolver,
        ],
    })
], ProfileModule);


/***/ }),

/***/ "./apps/profile/src/profile.resolver.ts":
/*!**********************************************!*\
  !*** ./apps/profile/src/profile.resolver.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileResolver = void 0;
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const profile_service_1 = __webpack_require__(/*! ./profile.service */ "./apps/profile/src/profile.service.ts");
const profile_entitie_1 = __webpack_require__(/*! ./entities/profile.entitie */ "./apps/profile/src/entities/profile.entitie.ts");
const graphql_upload_1 = __webpack_require__(/*! graphql-upload */ "graphql-upload");
let ProfileResolver = class ProfileResolver {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async uploadProfilePicture(userId, file) {
        const uploadedFile = await file;
        return this.profileService.uploadProfilePicture(userId, uploadedFile);
    }
    async profile(userName) {
        return await this.profileService.getProfile(userName);
    }
    async searchProfile(userName, limit) {
        const { users, isPublic } = await this.profileService.searchUserProfile(userName, limit);
        const publicUsers = users.filter((_, index) => isPublic[index]);
        return { users: publicUsers, isPublic: isPublic };
    }
    async getAllUsersProfiles(limit, page) {
        const result = await this.profileService.getAllUsersProfiles(limit, page);
        return { users: result.users };
    }
};
exports.ProfileResolver = ProfileResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)("userId", { type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: "file", type: () => graphql_upload_1.GraphQLUpload })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "uploadProfilePicture", null);
__decorate([
    (0, graphql_1.Query)(() => profile_entitie_1.UserProfile),
    __param(0, (0, graphql_1.Args)("userName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "profile", null);
__decorate([
    (0, graphql_1.Query)(() => profile_entitie_1.UserProfileSearch),
    __param(0, (0, graphql_1.Args)("userName")),
    __param(1, (0, graphql_1.Args)("limit", { defaultValue: 5 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "searchProfile", null);
__decorate([
    (0, graphql_1.Query)(() => profile_entitie_1.AllUsersProfiles),
    __param(0, (0, graphql_1.Args)("limit")),
    __param(1, (0, graphql_1.Args)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "getAllUsersProfiles", null);
exports.ProfileResolver = ProfileResolver = __decorate([
    (0, graphql_1.Resolver)("Profile"),
    __metadata("design:paramtypes", [typeof (_a = typeof profile_service_1.ProfileService !== "undefined" && profile_service_1.ProfileService) === "function" ? _a : Object])
], ProfileResolver);


/***/ }),

/***/ "./apps/profile/src/profile.service.ts":
/*!*********************************************!*\
  !*** ./apps/profile/src/profile.service.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../../../prisma/prisma.service */ "./prisma/prisma.service.ts");
const AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const AVATAR_BASE_URL = "https://eu2.contabostorage.com/profile/avatars";
let ProfileService = class ProfileService {
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
        this.s3 = new AWS.S3({
            accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
            secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
            region: this.configService.get("AWS_S3_REGION"),
        });
    }
    async uploadProfilePicture(userId, file) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.BadGatewayException("User not found");
        }
        const fileExtension = file.mimetype.split("/")[1];
        const key = `avatars/${userId}.${fileExtension}`;
        try {
            await this.s3
                .upload({
                Bucket: this.configService.get("S3_BUCKET_NAME"),
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read",
            })
                .promise();
            await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    profilePicture: `${AVATAR_BASE_URL}/${key}`,
                },
            });
            return `${AVATAR_BASE_URL}/${key}`;
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException("Failed to upload the profile picture");
        }
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new common_1.BadGatewayException("User not found");
        }
        const profile = await this.prisma.profile.findUnique({
            where: {
                userId: user.id,
            },
        });
        return {
            user: user,
            info: profile.info,
            isPublic: profile.isPublic,
        };
    }
    async searchUserProfile(userName, limit) {
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
        });
        return {
            users: profiles.map((profile) => profile.user),
            isPublic: profiles.map((profile) => profile.isPublic),
        };
    }
    async getAllUsersProfiles(limit, page) {
        const users = await this.prisma.user.findMany({
            take: Number(limit),
            skip: page ? Number(page) * Number(limit) : undefined,
            include: {
                profile: true,
            },
        });
        return { users };
    }
    async getSettings(userName) { }
    async updateSettings(settings) { }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], ProfileService);


/***/ }),

/***/ "./prisma/prisma.service.ts":
/*!**********************************!*\
  !*** ./prisma/prisma.service.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),

/***/ "@aws-sdk/client-s3":
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ "@nestjs/apollo":
/*!*********************************!*\
  !*** external "@nestjs/apollo" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/platform-express":
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),

/***/ "@nestjs/platform-fastify":
/*!*******************************************!*\
  !*** external "@nestjs/platform-fastify" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "graphql-upload":
/*!*********************************!*\
  !*** external "graphql-upload" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("graphql-upload");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./apps/profile/src/main.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const profile_module_1 = __webpack_require__(/*! ./profile.module */ "./apps/profile/src/profile.module.ts");
const platform_fastify_1 = __webpack_require__(/*! @nestjs/platform-fastify */ "@nestjs/platform-fastify");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(profile_module_1.ProfileModule, new platform_fastify_1.FastifyAdapter());
    app.enableCors({
        origin: "*",
        credentials: true,
    });
    await app.listen(4002, '0.0.0.0', (err, appURL) => {
        if (err) {
            console.log(err);
            return;
        }
        const logger = new common_1.Logger();
        logger.log(`Server started at ${appURL}`);
        logger.log(`GraphQL URL ${appURL + '/graphql'}`);
    });
}
bootstrap();

})();

/******/ })()
;