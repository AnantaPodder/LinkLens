import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UsePipes,
  HttpStatus,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import {
  RegisterUserDto,
  RegisterUserSchema,
  RegisterUserResponse,
} from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtPayload } from './dto/jwt-payload.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Request() req: Request & { user: JwtPayload }
  ): Promise<{ accessToken: string }> {
    const payload = { email: req.user.email, sub: req.user.sub };
    const token = await this.jwtService.signAsync(payload);
    return { accessToken: token };
  }

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  async registerUser(
    @Body() userData: RegisterUserDto
  ): Promise<RegisterUserResponse> {
    try {
      const user = await this.authService.registerUser({
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname || '',
        password: userData.password,
      });

      return {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        message: 'User registered successfully',
      };
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) {
        throw new HttpException(
          {
            success: false,
            message: error.message,
          },
          HttpStatus.CONFLICT
        );
      }

      throw new HttpException(
        {
          success: false,
          message: 'Registration failed',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
