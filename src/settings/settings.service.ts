import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto {
  @IsString() value: string;
}

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  findAll() { return this.prisma.setting.findMany({ orderBy: { key: 'asc' } }); }

  async findByKey(key: string) {
    const s = await this.prisma.setting.findUnique({ where: { key } });
    if (!s) throw new NotFoundException(`الإعداد '${key}' غير موجود`);
    return s;
  }

  async update(key: string, dto: UpdateSettingDto) {
    await this.findByKey(key);
    return this.prisma.setting.update({ where: { key }, data: { value: dto.value } });
  }

  async bulkUpdate(settings: { key: string; value: string }[]) {
    return Promise.all(
      settings.map((s) =>
        this.prisma.setting.upsert({
          where: { key: s.key },
          update: { value: s.value },
          create: { key: s.key, value: s.value, type: 'STRING' },
        }),
      ),
    );
  }
}
