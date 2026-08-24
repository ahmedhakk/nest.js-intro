import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  // injecting UsersService
  constructor(private readonly usersService: UsersService) {}

  public findAll(userId: string) {
    // Users service
    // Find the User
    const user = this.usersService.findOneById(userId);

    // Return Posts related to this user.
    return [
      {
        user,
        title: 'test title',
        content: 'test content',
      },
      {
        user,
        title: 'test title 2',
        content: 'test content 2',
      },
    ];
  }
}
