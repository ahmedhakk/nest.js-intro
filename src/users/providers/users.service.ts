import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
  // injecting authservice
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  public findAll(
    getUsersParamsDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const isAuth = this.authService.isAuth();

    if (isAuth)
      return [
        {
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
        },
        {
          firstname: 'Alice',
          lastname: 'Doe',
          email: 'alice.doe@example.com',
        },
      ];
    else return 'unauthentecated';
  }

  public findOneById(id: string) {
    return {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    };
  }
}
