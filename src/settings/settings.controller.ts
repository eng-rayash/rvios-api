import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SettingsService, UpdateSettingDto } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private svc: SettingsService) {}

  @Get() @UseGuards(AuthGuard('jwt')) findAll() { return this.svc.findAll(); }
  @Get(':key') @UseGuards(AuthGuard('jwt')) findOne(@Param('key') key: string) { return this.svc.findByKey(key); }
  @Put(':key') @UseGuards(AuthGuard('jwt')) update(@Param('key') key: string, @Body() dto: UpdateSettingDto) { return this.svc.update(key, dto); }
  @Put() @UseGuards(AuthGuard('jwt')) bulkUpdate(@Body() body: { settings: { key: string; value: string }[] }) { return this.svc.bulkUpdate(body.settings); }
}
