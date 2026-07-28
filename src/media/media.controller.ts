import {
  Body, Controller, Delete, Get, Param,
  Post, UploadedFile, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { memoryStorage } from 'multer';
import { MediaService } from './media.service';

const ALLOWED_MIME = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml',
  'video/mp4', 'video/webm',
  'application/pdf',
];

const MAX_SIZE = 20 * 1024 * 1024; // 20MB

@Controller('media')
@UseGuards(AuthGuard('jwt'))
export class MediaController {
  constructor(private svc: MediaService) {}

  // GET  /api/media
  @Get()
  findAll() { return this.svc.findAll(); }

  // POST /api/media/upload  — multipart file upload
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_SIZE },
      fileFilter: (_req, file, cb) => {
        if (ALLOWED_MIME.includes(file.mimetype)) cb(null, true);
        else cb(new Error('نوع الملف غير مدعوم'), false);
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.svc.upload(file);
  }

  // POST /api/media/presign  — get presigned URL for direct upload
  @Post('presign')
  presign(@Body() body: { filename: string; contentType: string }) {
    return this.svc.getPresignedUrl(body.filename, body.contentType);
  }

  // DELETE /api/media/:id
  @Delete(':id')
  remove(@Param('id') id: string) { return this.svc.remove(id); }
}
