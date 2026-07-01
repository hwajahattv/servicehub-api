import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../../users/users.repository';
import { RefreshDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async register(dto) {
    const existingUser = await this.usersRepository.findUnique(dto.email);

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.usersRepository.create(dto, hashedPassword);

    return user;
  }

  async login(dto) {
    const user = await this.usersRepository.findUnique(dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is inactive');
    }

    const isValid = await this.comparePassword(dto.password, user.passwordHash);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    this.usersRepository.updateLastLogin(user.id);

    const accessToken = await this.generateAccessToken(user);

    const refreshToken = await this.usersRepository.generateRefreshToken(
      user.id,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateAccessToken(user: { id: string; email: string }) {
    return this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;

    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async me(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async refresh(dto: RefreshDto) {
    const tokens = await this.usersRepository.findManyRefreshTokens();

    let matchedToken: any = null;
    let matchedUser: any = null;

    for (const token of tokens) {
      const isValid = await bcrypt.compare(dto.refreshToken, token.tokenHash);

      if (isValid) {
        matchedToken = token;
        matchedUser = token.user;
        break;
      }
    }

    if (!matchedToken || !matchedUser) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // ROTATION: revoke old token
    await this.usersRepository.refreshTokenUpdate(matchedToken);

    // generate new tokens
    const accessToken = await this.generateAccessToken(matchedUser);

    const newRefreshToken = await this.usersRepository.generateRefreshToken(
      matchedUser.id,
    );

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  findRefreshTokensByUserId(userId: string) {
    return this.usersRepository.findUserTokens(userId);
  }

  compareTokens(refreshToken: string, tokenHash: string) {
    return bcrypt.compare(refreshToken, tokenHash);
  }

  refreshTokenUpdate(token) {
    return this.usersRepository.refreshTokenUpdate(token);
  }

  async logout(userId: string, refreshToken: string) {
    const tokens = await this.usersRepository.findUserTokens(userId);

    for (const token of tokens) {
      const isMatch = await this.compareTokens(refreshToken, token.tokenHash);

      if (isMatch) {
        await this.usersRepository.refreshTokenUpdate(token);
        break;
      }
    }

    return { success: true };
  }

  async logoutAll(userId: string) {
    await this.usersRepository.refreshTokenUpdateMany({
      userId,
    });

    return { success: true };
  }
}
