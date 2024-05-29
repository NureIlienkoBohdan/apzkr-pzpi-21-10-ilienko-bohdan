import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
// import { FilesModule } from 'src/files/files.module';
// import { GoogleStrategy } from './strategies/google.strategy';
// import { GithubStrategy } from './strategies/github-strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    JwtModule,
    forwardRef(() => UsersModule),
    // FilesModule,
    // ClientsModule.register([
    //   {
    //     name: 'AUTH_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'], //TODO: test this
    //       queue: 'main_queue',
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [AuthController],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthService,
    // GoogleStrategy,
    // GithubStrategy,
  ],
  exports: [AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
