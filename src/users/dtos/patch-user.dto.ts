import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class PatchUserDto extends PartialType(CreateUserDto) {}
// Now PatchUserDto has all the properties of CreateUserDto but all of them are optional.
