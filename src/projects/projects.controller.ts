import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectsService, CreateProjectDto, UpdateProjectDto } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private svc: ProjectsService) {}

  @Get('public') findAll() { return this.svc.findAll(); }
  @Get('public/featured') findFeatured() { return this.svc.findFeatured(); }

  @Get() @UseGuards(AuthGuard('jwt')) findAllAdmin() { return this.svc.findAll(); }
  @Get(':id') @UseGuards(AuthGuard('jwt')) findOne(@Param('id') id: string) { return this.svc.findOne(id); }
  @Post() @UseGuards(AuthGuard('jwt')) create(@Body() dto: CreateProjectDto) { return this.svc.create(dto); }
  @Put(':id') @UseGuards(AuthGuard('jwt')) update(@Param('id') id: string, @Body() dto: UpdateProjectDto) { return this.svc.update(id, dto); }
  @Delete(':id') @UseGuards(AuthGuard('jwt')) remove(@Param('id') id: string) { return this.svc.remove(id); }
}
