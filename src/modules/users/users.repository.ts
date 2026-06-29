import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import * as bcrypt from 'bcrypt';
import ms, { StringValue } from 'ms';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findUnique(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email, deletedAt: null },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  create(
    data: {
      name: string;
      email: string;
      phone?: string;
      passwordHash: string;
    },
    hashedPassword,
  ) {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        passwordHash: hashedPassword,
      },
    });
  }

  updateLastLogin(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        lastLoginAt: new Date(),
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;

    return bcrypt.hash(password, saltRounds);
  }

  update(
    id: string,
    data: {
      name?: string;
      email?: string;
      phone?: string;
      passwordHash?: string;
    },
  ) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async generateRefreshToken(userId: string): Promise<string> {
    const token = randomBytes(64).toString('hex');
    const tokenHash = await bcrypt.hash(token, 12);

    const expiresIn = this.configService.getOrThrow<StringValue>(
      'REFRESH_TOKEN_EXPIRES_IN',
    );

    const expiresAt = new Date(Date.now() + ms(expiresIn));

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });

    return token; // return raw token to client ONLY once
  }

  refreshTokenUpdate(matchedToken) {
    return this.prisma.refreshToken.update({
      where: { id: matchedToken.id },
      data: { revokedAt: new Date() },
    });
  }
  refreshTokenUpdateMany(userId) {
    return this.prisma.refreshToken.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  findManyRefreshTokens() {
    return this.prisma.refreshToken.findMany({
      where: {
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        user: true,
      },
    });
  }

  findUserTokens(userId: string) {
    return this.prisma.refreshToken.findMany({
      where: {
        userId,
        revokedAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }
}
