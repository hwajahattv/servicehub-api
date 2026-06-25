import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/users.repository';

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
}
