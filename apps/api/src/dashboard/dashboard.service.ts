import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(userId: number) {
    const links = await this.prisma.links.findMany({
      where: {
        userId: userId,
      },
    });

    return links;
  }
}
