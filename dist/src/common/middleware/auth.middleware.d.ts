import { NestMiddleware } from '@nestjs/common';
import { AuthService } from 'src/common/services/auth/auth.service';
import { Request, Response } from 'express';
export declare class AuthMiddleware implements NestMiddleware {
    private readonly authService;
    constructor(authService: AuthService);
    use(req: Request | any, res: Response | any, next: () => void): any;
}
