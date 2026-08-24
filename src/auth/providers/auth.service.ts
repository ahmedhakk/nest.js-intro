import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  // Injecting user service
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  public login(email: string, password: string, id: string) {
    // Check user exists in DB
    const user = this.userService.findOneById('12');
    // Login

    // Token
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
