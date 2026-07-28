import {
  Body, Controller, Delete, Get, Param, Post,
  Put, Query, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto, PostQueryDto } from './dto/post.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // ── Public ────────────────────────────────────────────────
  @Get('public')
  findPublished(@Query() query: PostQueryDto) {
    return this.postsService.findPublished(query);
  }

  @Get('public/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  // ── Admin (JWT protected) ─────────────────────────────────
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Query() query: PostQueryDto) {
    return this.postsService.findAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
