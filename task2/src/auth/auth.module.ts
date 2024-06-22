import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [JwtModule, forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AccessTokenStrategy, RefreshTokenStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
