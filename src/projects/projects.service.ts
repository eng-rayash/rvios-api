import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class CreateProjectDto {
  @IsString() title: string;
  @IsString() description: string;
  @IsUrl() @IsOptional() imageUrl?: string;
  @IsArray() @IsString({ each: true }) @IsOptional() technologies?: string[];
  @IsUrl() @IsOptional() url?: string;
  @IsBoolean() @IsOptional() featured?: boolean;
  @IsInt() @Min(0) @IsOptional() order?: number;
}

export class UpdateProjectDto {
  @IsString() @IsOptional() title?: string;
  @IsString() @IsOptional() description?: string;
  @IsUrl() @IsOptional() imageUrl?: string;
  @IsArray() @IsString({ each: true }) @IsOptional() technologies?: string[];
  @IsUrl() @IsOptional() url?: string;
  @IsBoolean() @IsOptional() featured?: boolean;
  @IsInt() @Min(0) @IsOptional() order?: number;
}

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  findAll() { return this.prisma.project.findMany({ orderBy: [{ featured: 'desc' }, { order: 'asc' }] }); }
  findFeatured() { return this.prisma.project.findMany({ where: { featured: true }, orderBy: { order: 'asc' } }); }

  async findOne(id: string) {
    const p = await this.prisma.project.findUnique({ where: { id } });
    if (!p) throw new NotFoundException('المشروع غير موجود');
    return p;
  }

  create(dto: CreateProjectDto) {
    return this.prisma.project.create({ data: { ...dto, technologies: dto.technologies ?? [] } });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
    return { message: 'تم حذف المشروع' };
  }
}
