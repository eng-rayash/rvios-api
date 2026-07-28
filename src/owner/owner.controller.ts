import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OwnerService, UpdateOwnerProfileDto } from './owner.service';

@Controller('owner')
export class OwnerController {
  constructor(private svc: OwnerService) {}

  // Public — anyone can read the owner profile
  @Get('profile')
  getProfile() { return this.svc.getProfile(); }

  // Admin only — update
  @Put('profile')
  @UseGuards(AuthGuard('jwt'))
  updateProfile(@Body() dto: UpdateOwnerProfileDto) { return this.svc.updateProfile(dto); }
}
