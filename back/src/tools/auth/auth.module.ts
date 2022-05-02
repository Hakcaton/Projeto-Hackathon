import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from 'src/modules/user/users.module';
import { AuthController } from './auth.controller';
import { TokenRefresherMiddleware } from './auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from 'src/modules/contract/entities/contract.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { Auth } from './entities/auth.entity';
import { Emails } from '../emails/emails.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      verifyOptions: {},
      signOptions: { expiresIn: '12h' },
    }),
    forwardRef(() => TypeOrmModule.forFeature([Contract])),
    forwardRef(() => TypeOrmModule.forFeature([Company])),
    forwardRef(() => TypeOrmModule.forFeature([Auth])),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, TokenRefresherMiddleware, Emails],
  exports: [AuthService],
})
export class AuthModule {}