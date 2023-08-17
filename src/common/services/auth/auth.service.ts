import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  authUser(token: string): string {
    return token;
  }
}
