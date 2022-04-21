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

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      verifyOptions: {},
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, TokenRefresherMiddleware],
  exports: [AuthService],
})
export class AuthModule {}