import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { AuthService } from 'src/common/services/auth/auth.service';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: Request | any, res: Response | any, next: () => void): any {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user: string;

    if (!bearerHeader || !accessToken) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="Login Strict"');
      res.send('');
      //return next();
    }
    try {
      user = this.authService.authUser(accessToken);
    } catch (error) {
      throw new ForbiddenException('Invalid Credential');
    }
    if (user) {
      req.user = user;
    }
    next();
  }
}
