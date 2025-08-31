import * as bcrypt from 'bcrypt';
import { UsersService } from '@/users/users.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, users } from 'prisma/generated';

@Injectable()
export class AuthService {
  private readonly log = new Logger(AuthService.name);
  constructor(private usersService: UsersService) {}

  async generatePasswordHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private validatePasswordHash(
    password: string,
    hashedPassword: string
  ): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  async registerUser(userData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<Omit<users, 'passwordHash'>> {
    // Hash the password
    const passwordHash = await this.generatePasswordHash(userData.password);

    // Create user via UsersService
    const user = await this.usersService.createUser({
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      passwordHash,
    });

    // Return user without password hash
    const { passwordHash: _, ...secureUser } = user;
    return secureUser;
  }

  async validateUser(
    username: string,
    pass: string
  ): Promise<Prisma.usersGetPayload<{
    select: {
      email: true;
      firstName: true;
      id: true;
      lastName: true;
      passwordHash: false;
    };
  }> | null> {
    const user = await this.usersService.getUserByEmail(username);
    if (!user) return null;

    const passwordValid = this.validatePasswordHash(pass, user.passwordHash);
    if (user && passwordValid) {
      const { passwordHash: _, ...secureUser } = user;
      return secureUser;
    }
    return null;
  }
}
