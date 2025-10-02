import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { links } from 'prisma/generated';
import { LinkResponse } from './dtos/link-response.dto';

@Injectable()
export class LinkService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByUserId(userId: number): Promise<LinkResponse[]> {
    const linksByUser = await this.prisma.links.findMany({ where: { userId } });
    linksByUser.map(r => {
      return {
        id: r.id,
        createdAt: r.createdAt,
        deleted: r.deleted,
        shortenedUrl: r.shortenedUrl,
        url: r.url,
        userId: r.userId,
      } as LinkResponse;
    });
    return linksByUser;
  }

  async create(userId: number, url: string) {
    const alias = await this.generateRandomLink();
    const newLink = await this.prisma.links.create({
      data: {
        shortenedUrl: alias,
        url: url,
        createdAt: new Date(),
        deleted: false,
        userId: userId,
      } as links,
    });
    return newLink;
  }

  async generateRandomLink(): Promise<string> {
    let alias: string;
    let exists = true;
    const shortUrlDomain = process.env.SHORT_URL_DOMAIN;

    // Keep generating until we find a unique alias
    while (exists) {
      alias = shortUrlDomain + '/' + this.generateRandomString(8);
      const existingLink = await this.prisma.links.findUnique({
        where: { shortenedUrl: alias },
      });
      exists = !!existingLink;
    }

    return alias;
  }

  private generateRandomString(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async getLinksState(userId: number): Promise<{
    totalLinks: number;
    totalClicks: number;
    thisMonthClicks: number;
  }> {
    const totalLinks = await this.prisma.links.count({
      where: {
        userId: userId,
      },
    });

    const totalClicks = await this.prisma.linkClicks.count({
      where: {
        links: {
          userId: userId,
        },
      },
    });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const thisMonthClicks = await this.prisma.linkClicks.count({
      where: {
        links: {
          userId: userId,
        },
        visitedAt: {
          gte: startOfMonth,
        },
      },
    });

    return {
      totalLinks,
      totalClicks,
      thisMonthClicks,
    };
  }
}
