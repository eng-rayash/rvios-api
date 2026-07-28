import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServicesService, CreateServiceDto, UpdateServiceDto } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private svc: ServicesService) {}

  @Get('public') findPublic() { return this.svc.findAll(true); }
  @Get('public/:slug') findBySlug(@Param('slug') slug: string) { return this.svc.findBySlug(slug); }

  @Get() @UseGuards(AuthGuard('jwt')) findAll() { return this.svc.findAll(); }
  @Get(':id') @UseGuards(AuthGuard('jwt')) findOne(@Param('id') id: string) { return this.svc.findOne(id); }
  @Post() @UseGuards(AuthGuard('jwt')) create(@Body() dto: CreateServiceDto) { return this.svc.create(dto); }
  @Put(':id') @UseGuards(AuthGuard('jwt')) update(@Param('id') id: string, @Body() dto: UpdateServiceDto) { return this.svc.update(id, dto); }
  @Delete(':id') @UseGuards(AuthGuard('jwt')) remove(@Param('id') id: string) { return this.svc.remove(id); }
}
