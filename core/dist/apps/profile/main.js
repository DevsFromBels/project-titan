/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProfileModule = void 0;
const common_1 = __webpack_require__(3);
const profile_service_1 = __webpack_require__(4);
const config_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(8);
const apollo_1 = __webpack_require__(9);
const prisma_service_1 = __webpack_require__(5);
const jwt_1 = __webpack_require__(10);
const profile_resolver_1 = __webpack_require__(11);
const settings_service_1 = __webpack_require__(14);
let ProfileModule = class ProfileModule {
};
exports.ProfileModule = ProfileModule;
exports.ProfileModule = ProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
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
            settings_service_1.SettingsService
        ],
    })
], ProfileModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
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
exports.ProfileService = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(5);
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
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
        const avatar = await this.prisma.avatars.findFirst({
            where: {
                userId: user.id,
            }
        });
        return {
            user: user,
            info: profile.info,
            isPublic: profile.isPublic,
            avatar_url: avatar.url
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
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], ProfileService);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(3);
const client_1 = __webpack_require__(6);
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
/* 6 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/apollo");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 11 */
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
const graphql_1 = __webpack_require__(8);
const profile_service_1 = __webpack_require__(4);
const profile_entitie_1 = __webpack_require__(12);
const common_1 = __webpack_require__(3);
const auth_guard_1 = __webpack_require__(13);
const settings_service_1 = __webpack_require__(14);
const settings_entitie_1 = __webpack_require__(15);
let ProfileResolver = class ProfileResolver {
    constructor(profileService, settingService) {
        this.profileService = profileService;
        this.settingService = settingService;
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
    async getSettings(context) {
        return await this.settingService.getSettings(context);
    }
    async settingsUpdateUserInfo(context, newInfo) {
        return await this.settingService.settingsUpdateUserInfo(context, newInfo);
    }
};
exports.ProfileResolver = ProfileResolver;
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
__decorate([
    (0, graphql_1.Query)(() => settings_entitie_1.Settings),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "getSettings", null);
__decorate([
    (0, graphql_1.Mutation)(() => settings_entitie_1.UpdateInfo),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __param(1, (0, graphql_1.Args)("newInfo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfileResolver.prototype, "settingsUpdateUserInfo", null);
exports.ProfileResolver = ProfileResolver = __decorate([
    (0, graphql_1.Resolver)("Profile"),
    __metadata("design:paramtypes", [typeof (_a = typeof profile_service_1.ProfileService !== "undefined" && profile_service_1.ProfileService) === "function" ? _a : Object, typeof (_b = typeof settings_service_1.SettingsService !== "undefined" && settings_service_1.SettingsService) === "function" ? _b : Object])
], ProfileResolver);


/***/ }),
/* 12 */
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
const graphql_1 = __webpack_require__(8);
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
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "avatar_url", void 0);
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
/* 13 */
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(7);
const graphql_1 = __webpack_require__(8);
const jwt_1 = __webpack_require__(10);
const prisma_service_1 = __webpack_require__(5);
let AuthGuard = class AuthGuard {
    constructor(jwtService, prisma, configService) {
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.configService = configService;
    }
    async canActivate(context) {
        const gqlContext = graphql_1.GqlExecutionContext.create(context);
        const { req } = gqlContext.getContext();
        console.log(req.headers);
        const accessToken = req.headers.accesstoken;
        const refreshToken = req.headers.refreshtoken;
        if (!accessToken || !refreshToken) {
            throw new common_1.UnauthorizedException("Please login to access this resource");
        }
        if (accessToken) {
            const decoded = this.jwtService.verify(accessToken, {
                secret: this.configService.get("ACCESS_TOKEN_SECRET"),
            });
            if (!decoded) {
                throw new common_1.UnauthorizedException("Invalid access token!");
            }
            await this.updateAccessToken(req);
        }
        return true;
    }
    async updateAccessToken(req) {
        try {
            const refreshTokenData = req.headers.refreshtoken;
            const decoded = this.jwtService.decode(refreshTokenData);
            const expirationTime = decoded.exp * 1000;
            if (expirationTime < Date.now()) {
                throw new common_1.UnauthorizedException("Please login to access this resource!");
            }
            const user = await this.prisma.user.findUnique({
                where: {
                    id: decoded.id,
                },
            });
            const accessToken = this.jwtService.sign({ id: user.id }, {
                secret: this.configService.get("ACCESS_TOKEN_SECRET"),
                expiresIn: "5m",
            });
            const refreshToken = this.jwtService.sign({ id: user.id }, {
                secret: this.configService.get("REFRESH_TOKEN_SECRET"),
                expiresIn: "7d",
            });
            req.accesstoken = accessToken;
            req.refreshtoken = refreshToken;
            req.user = user;
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AuthGuard);


/***/ }),
/* 14 */
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
exports.SettingsService = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(5);
let SettingsService = class SettingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSettings(req) {
        const user = req.req.user;
        const userSettings = await this.prisma.user.findFirst({
            where: {
                id: user.id,
            },
        });
        if (!userSettings) {
            return new common_1.BadRequestException(`User not found`);
        }
        const profileSettings = await this.prisma.profile.findFirst({
            where: {
                userId: userSettings.id,
            },
            select: {
                info: true,
                isPublic: true,
                address: true,
                referred_users: true
            },
        });
        if (!profileSettings) {
            return new common_1.BadRequestException(`Profile not found`);
        }
        return {
            userSettings,
            profileSettings
        };
    }
    async settingsUpdateUserInfo(req, newInfo) {
        const user = req.req.user;
        const userSettings = await this.prisma.user.findFirst({
            where: {
                id: user.id,
            },
        });
        if (!userSettings) {
            return new common_1.BadRequestException(`User not found`);
        }
        const profileSettings = await this.prisma.profile.update({
            where: {
                userId: userSettings.id,
            },
            data: {
                info: newInfo
            }
        });
        if (!profileSettings) {
            return new common_1.BadRequestException(`Profile not found`);
        }
        return {
            profileSettings
        };
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], SettingsService);


/***/ }),
/* 15 */
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
exports.UpdateInfo = exports.Settings = exports.ProfileSettings = exports.UserSettings = void 0;
const graphql_1 = __webpack_require__(8);
let UserSettings = class UserSettings {
};
exports.UserSettings = UserSettings;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserSettings.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserSettings.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserSettings.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserSettings.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserSettings.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserSettings.prototype, "createdAt", void 0);
exports.UserSettings = UserSettings = __decorate([
    (0, graphql_1.ObjectType)()
], UserSettings);
let ProfileSettings = class ProfileSettings {
};
exports.ProfileSettings = ProfileSettings;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileSettings.prototype, "info", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ProfileSettings.prototype, "isPublic", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ProfileSettings.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], ProfileSettings.prototype, "referred_users", void 0);
exports.ProfileSettings = ProfileSettings = __decorate([
    (0, graphql_1.ObjectType)()
], ProfileSettings);
let Settings = class Settings {
};
exports.Settings = Settings;
__decorate([
    (0, graphql_1.Field)(() => UserSettings),
    __metadata("design:type", UserSettings)
], Settings.prototype, "userSettings", void 0);
__decorate([
    (0, graphql_1.Field)(() => ProfileSettings),
    __metadata("design:type", ProfileSettings)
], Settings.prototype, "profileSettings", void 0);
exports.Settings = Settings = __decorate([
    (0, graphql_1.ObjectType)()
], Settings);
let UpdateInfo = class UpdateInfo {
};
exports.UpdateInfo = UpdateInfo;
__decorate([
    (0, graphql_1.Field)(() => ProfileSettings),
    __metadata("design:type", ProfileSettings)
], UpdateInfo.prototype, "profileSettings", void 0);
exports.UpdateInfo = UpdateInfo = __decorate([
    (0, graphql_1.ObjectType)()
], UpdateInfo);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-fastify");

/***/ })
/******/ 	]);
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

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const profile_module_1 = __webpack_require__(2);
const platform_fastify_1 = __webpack_require__(16);
const common_1 = __webpack_require__(3);
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