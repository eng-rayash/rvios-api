import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /api/auth/login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // POST /api/auth/refresh
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  // POST /api/auth/logout
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Body() dto: RefreshTokenDto) {
    return this.authService.logout(dto.refreshToken);
  }

  // GET /api/auth/me  — protected
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  me(@CurrentUser() user: { id: string }) {
    return this.authService.me(user.id);
  }
}
