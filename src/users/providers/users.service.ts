import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  // injecting authservice
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * The method of getting all the users from the DB
   */
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

  /**
   * The method of getting a user by id
   */
  public findOneById(id: string) {
    return {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    };
  }
}
