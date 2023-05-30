import { ResponseMessageBase } from '@/common/dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  ChangePasswordInputDto,
  LoginInputDto,
  LoginResponseDto,
  RefreshTokenResponseDto,
  RegisterInputDto,
} from './dto';
import { Context, GetContext } from '@/decorators/user.decorator';
// import { Auth } from '@/decorators/auth.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // @Auth(['string'])
  /////////////////////////////////////////////
  @Query(() => LoginResponseDto, { name: `loginGoogle` })
  async loginGoogle(
    @Args('input') input: LoginInputDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.loginGoogle(input?.token);
  }

  @Query(() => LoginResponseDto, { name: `login` })
  async login(@Args('input') input: LoginInputDto): Promise<LoginResponseDto> {
    return await this.authService.login(input?.email, input?.password);
  }

  @Mutation(() => ResponseMessageBase, { name: `register` })
  async register(@Args('input') input: RegisterInputDto) {
    return await this.authService.register(input);
  }

  @Query(() => RefreshTokenResponseDto, { name: `refreshToken` })
  async refreshToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<RefreshTokenResponseDto> {
    return await this.authService.refreshToken(refreshToken);
  }

  @Mutation(() => ResponseMessageBase, { name: `logout` })
  async logout(@Args('userId') userId: string) {
    return await this.authService.logout(userId);
  }

  @Mutation(() => ResponseMessageBase, { name: `changePassword` })
  async changePassword(@Args('input') input: ChangePasswordInputDto, @GetContext() ctx: Context) {
    return await this.authService.changePassword(ctx.currentUser.id, input);
  }
}
