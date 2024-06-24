import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens, StrategyTypes, JwtPayload } from 'core';
import { SignUpDto } from './dto/sign-up.dto';
import { hash, verify } from 'argon2';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private readonly i18n: I18nService,
  ) {}

  async signUp(signUpDto: SignUpDto, picture): Promise<Tokens> {
    const { id, roles } = await this.usersService.create(signUpDto);

    const { accessToken, refreshToken } = await this.generateTokens({
      id,
      roles,
    });

    return { accessToken, refreshToken };
  }

  async signIn(signInDto: SignInDto): Promise<Tokens> {
    const { id, roles, password } = await this.usersService.findOneByParams({
      email: signInDto.email,
    });

    const isPasswordValid = await verify(password, signInDto.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(this.i18n.t('errors.INVALID_PASSWORD'));
    }

    const { accessToken, refreshToken } = await this.generateTokens({
      id,
      roles,
    });

    return { accessToken, refreshToken };
  }

  logOut(userId: string): void {
    this.usersService.updateRefreshToken(userId, null);
  }

  async refreshTokens(userId: string, token: string): Promise<Tokens> {
    const { token: hashedRefreshToken, roles } =
      await this.usersService.findOneByParams({ id: userId });

    if (!hashedRefreshToken) {
      throw new ForbiddenException(this.i18n.t('errors.INVALID_REFRESH_TOKEN'));
    }
    const isRefreshTokenValid = await verify(hashedRefreshToken, token);

    if (!isRefreshTokenValid) {
      throw new ForbiddenException(this.i18n.t('errors.INVALID_REFRESH_TOKEN'));
    }
    const { accessToken, refreshToken } = await this.generateTokens({
      id: userId,
      roles,
    });

    return { accessToken, refreshToken };
  }

  //#region reusable methods
  async generateTokens(payload: JwtPayload): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(payload, '1d'), //TODO: refactor to ENV
      this.signToken(payload, '7d'),
    ]);
    const hashedRefreshToken = await hash(refreshToken);
    await this.usersService.updateRefreshToken(payload.id, hashedRefreshToken);

    return { accessToken, refreshToken };
  }

  private async signToken(payload: JwtPayload, expiresIn: string) {
    return this.jwtService.signAsync(payload, {
      secret: process.env.JWT_KEY || 'some_jwt_secret',
      expiresIn,
    });
  }

  //#endregion
}
