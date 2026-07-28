"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
const date_util_1 = require("./utils/date.util");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            throw new common_1.UnauthorizedException('بيانات الدخول غير صحيحة');
        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid)
            throw new common_1.UnauthorizedException('بيانات الدخول غير صحيحة');
        return this.generateTokens(user.id, user.email, user.role);
    }
    async refresh(refreshToken) {
        const stored = await this.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true },
        });
        if (!stored || stored.expiresAt < new Date()) {
            throw new common_1.ForbiddenException('Refresh token غير صالح أو منتهي الصلاحية');
        }
        await this.prisma.refreshToken.delete({ where: { id: stored.id } });
        return this.generateTokens(stored.user.id, stored.user.email, stored.user.role);
    }
    async logout(refreshToken) {
        await this.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
        return { message: 'تم تسجيل الخروج بنجاح' };
    }
    async me(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, role: true, createdAt: true },
        });
    }
    async generateTokens(userId, email, role) {
        const payload = { sub: userId, email, role };
        const accessToken = this.jwt.sign(payload, {
            secret: this.config.get('jwt.secret'),
            expiresIn: this.config.get('jwt.expiresIn'),
        });
        const refreshToken = this.jwt.sign(payload, {
            secret: this.config.get('jwt.refreshSecret'),
            expiresIn: this.config.get('jwt.refreshExpiresIn'),
        });
        const hashedRefresh = await bcrypt.hash(refreshToken, 10);
        await this.prisma.refreshToken.create({
            data: {
                token: hashedRefresh,
                userId,
                expiresAt: (0, date_util_1.addDays)(new Date(), 7),
            },
        });
        return { accessToken, refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map