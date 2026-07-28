import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService, CreateCategoryDto, UpdateCategoryDto } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private svc: CategoriesService) {}

  @Get() findAll() { return this.svc.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @Post() @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateCategoryDto) { return this.svc.create(dto); }

  @Put(':id') @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) { return this.svc.update(id, dto); }

  @Delete(':id') @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}
