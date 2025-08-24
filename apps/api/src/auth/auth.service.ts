import * as bcrypt from 'bcrypt';
import { UsersService } from '@/users/users.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma, users } from 'prisma/generated';

@Injectable()
export class AuthService {
  private readonly log = new Logger(AuthService.name);
  constructor(private usersService: UsersService) {}

  async validatePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

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
    firstname: string;
    lastname: string;
    password: string;
  }): Promise<Omit<users, 'passwordhash'>> {
    // Hash the password
    const passwordhash = await this.generatePasswordHash(userData.password);

    // Create user via UsersService
    const user = await this.usersService.createUser({
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      passwordhash,
    });

    // Return user without password hash
    const { passwordhash: _, ...secureUser } = user;
    return secureUser;
  }

  async validateUser(
    username: string,
    pass: string
  ): Promise<Prisma.usersGetPayload<{
    select: {
      email: true;
      firstname: true;
      id: true;
      lastname: true;
      passwordhash: false;
    };
  }> | null> {
    const user = await this.usersService.getUserByEmail(username);
    if (!user) return null;

    const passwordValid = this.validatePasswordHash(pass, user.passwordhash);
    if (user && passwordValid) {
      const { passwordhash, ...secureUser } = user;
      return secureUser;
    }
    return null;
  }
}
