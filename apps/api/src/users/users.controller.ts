import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtPayload } from '@/auth/dto/jwt-payload.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('info')
  async getProfile(@Request() req: Request & { user: JwtPayload }) {
    const user = await this.usersService.getUserById(req.user.sub);
    const { passwordhash, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  }
}
