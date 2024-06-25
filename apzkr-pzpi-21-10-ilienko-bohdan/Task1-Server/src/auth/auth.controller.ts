import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Tokens, UserId, Public, User, RefreshTokenGuard } from 'core';
import { SignInDto } from './dto/sign-in.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AccessTokenGuard,
  GoogleOAuthGuard,
  GithubOAuthGuard,
  StrategyTypes,
} from 'core';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //TODO: implement OAuth (Google, Github)
  //#region OAuth (unused right now)
  // @Public()
  // @Get('google')
  // @UseGuards(GoogleOAuthGuard)
  // async googleAuth() {}

  // @Public()
  // @Get('google/callback')
  // @UseGuards(GoogleOAuthGuard)
  // async googleAuthRedirect(@User() user: any, @Res() res: any) {
  //   const tokens = await this.authService.loginWithAnotherProvider(
  //     user,
  //     StrategyTypes.GOOGLE,
  //   );
  //   res.redirect(
  //     `http://${process.env.CLIENT_URL}/authCallback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`,
  //   );
  // }

  // @Public()
  // @Get('github')
  // @UseGuards(GithubOAuthGuard)
  // async githubAuth() {}

  // @Public()
  // @Get('github/callback')
  // @UseGuards(GithubOAuthGuard)
  // async githubAuthRedirect(@User() user: any, @Res() res: any) {
  //   const tokens = await this.authService.loginWithAnotherProvider(
  //     user,
  //     StrategyTypes.GITHUB,
  //   );
  //   res.redirect(
  //     `http://${process.env.CLIENT_URL}/authCallback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`,
  //   );
  // }
  //#endregion

  @ApiBadRequestResponse({
    description:
      'email must be an email. password must be longer than or equal to 8 characters. password must be a string',
  })
  @ApiConflictResponse({ description: 'User already exists' })
  @Post('sign-up')
  @Public()
  // @UseInterceptors(
  //   FileInterceptor('picture', {
  //     fileFilter: imageFileFilter,
  //   }),
  // )
  signUp(
    @Body() signUpDto: SignUpDto,
    @UploadedFile() picture,
  ): Promise<Tokens> {
    // console.log('signUpDto', signUpDto);
    return this.authService.signUp(signUpDto, picture);
  }

  @ApiUnauthorizedResponse({ description: 'Invalid password' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Post('sign-in')
  @Public()
  signIn(@Body() signInDto: SignInDto): Promise<Tokens> {
    return this.authService.signIn(signInDto);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(AccessTokenGuard)
  @Post('log-out')
  @HttpCode(200)
  logOut(@UserId() userId: string): void {
    return this.authService.logOut(userId);
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Invalid refresh token' })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(200)
  refresh(
    @UserId() userId: string,
    @User('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
