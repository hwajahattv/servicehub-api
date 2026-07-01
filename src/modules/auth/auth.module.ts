import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

import { AuthService } from './services/auth.service';

import { UsersModule } from '../users/users.module';

import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '@nestjs/config';

import { ConfigService } from '@nestjs/config';

import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),

        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
