import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import {
  Controller,
  UseGuards,
  Request,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { JwtPayload } from '@/auth/dto/jwt-payload.dto';
import { LinkService } from './link.service';
import { LinkResponse } from './dtos/link-response.dto';

@Controller('links')
@UseGuards(JwtAuthGuard)
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('')
  async getAllUrls(
    @Request() req: Request & { user: JwtPayload }
  ): Promise<LinkResponse[]> {
    return this.linkService.getAllByUserId(req.user.sub);
  }

  @Post('')
  async createUrl(
    @Request() req: Request & { user: JwtPayload },
    @Body('url') url: string
  ) {
    return this.linkService.create(req.user.sub, url);
  }

  @Get('state')
  async getLinksState(@Request() req: Request & { user: JwtPayload }) {
    return await this.linkService.getLinksState(req.user.sub);
  }
}
