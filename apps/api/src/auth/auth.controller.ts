import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UsePipes,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import {
  RegisterUserDto,
  RegisterUserSchema,
  RegisterUserResponse,
} from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<any> {
    return req.user;
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
