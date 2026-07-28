import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/auth.dto';
import { addDays, addMinutes } from './utils/date.util';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // ── Login ─────────────────────────────────────────────────
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('بيانات الدخول غير صحيحة');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('بيانات الدخول غير صحيحة');

    return this.generateTokens(user.id, user.email, user.role);
  }

  // ── Refresh ───────────────────────────────────────────────
  async refresh(refreshToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new ForbiddenException('Refresh token غير صالح أو منتهي الصلاحية');
    }

    // Rotate: delete old, issue new
    await this.prisma.refreshToken.delete({ where: { id: stored.id } });
    return this.generateTokens(stored.user.id, stored.user.email, stored.user.role);
  }

  // ── Logout ────────────────────────────────────────────────
  async logout(refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    return { message: 'تم تسجيل الخروج بنجاح' };
  }

  // ── Me ────────────────────────────────────────────────────
  async me(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, role: true, createdAt: true },
    });
  }

  // ── Helpers ───────────────────────────────────────────────
  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get('jwt.secret'),
      expiresIn: this.config.get('jwt.expiresIn'),
    });

    const refreshToken = this.jwt.sign(payload, {
      secret: this.config.get('jwt.refreshSecret'),
      expiresIn: this.config.get('jwt.refreshExpiresIn'),
    });

    // Store hashed refresh token
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    await this.prisma.refreshToken.create({
      data: {
        token: hashedRefresh,
        userId,
        expiresAt: addDays(new Date(), 7),
      },
    });

    return { accessToken, refreshToken };
  }
}
