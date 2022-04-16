import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './tools/auth/auth.module';
import { JwtAuthGuard } from './tools/auth/jwt-auth.guard';
import { PermissionModule } from './modules/permission/permission.module';
import { UserModule } from './modules/user/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entities/user.entity';
import { Permission } from './modules/permission/entities/permission.entity';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    PermissionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [User, Permission],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
