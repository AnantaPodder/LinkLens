import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, ConflictException } from '@nestjs/common';
import { users } from 'prisma/generated';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string): Promise<users | null> {
    const user = await this.prisma.users.findUnique({
      where: { email },
    });
    return user;
  }

  async getUserById(id: number): Promise<users | null> {
    const user = await this.prisma.users.findUnique({
      where: { id },
    });
    return user;
  }

  async createUser(userData: {
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
  }): Promise<users> {
    // Check if user already exists
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.prisma.users.create({
      data: userData,
    });
    return user;
  }
}
