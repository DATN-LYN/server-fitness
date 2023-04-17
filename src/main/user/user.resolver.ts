import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
  @Query(() => Number, { name: `getABC` })
  async abc() {
    return 123;
  }
}
