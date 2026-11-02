import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  // injecting authservice
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    // Injecting usersRepository
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // check if user already exists with same email
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    // Handle exception
    // create a new user
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

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
