import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactsService, CreateContactDto, UpdateContactStatusDto } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private svc: ContactsService) {}

  // Public: submit contact form
  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateContactDto) { return this.svc.create(dto); }

  // Admin
  @Get() @UseGuards(AuthGuard('jwt')) findAll() { return this.svc.findAll(); }
  @Get('stats') @UseGuards(AuthGuard('jwt')) stats() { return this.svc.stats(); }
  @Get(':id') @UseGuards(AuthGuard('jwt')) findOne(@Param('id') id: string) { return this.svc.findOne(id); }
  @Put(':id/status') @UseGuards(AuthGuard('jwt')) updateStatus(@Param('id') id: string, @Body() dto: UpdateContactStatusDto) { return this.svc.updateStatus(id, dto); }
  @Delete(':id') @UseGuards(AuthGuard('jwt')) remove(@Param('id') id: string) { return this.svc.remove(id); }
}
