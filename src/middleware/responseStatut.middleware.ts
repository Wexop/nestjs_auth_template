import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TransformResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const oldSend = res.send;

    res.send = function (...args: any[]) {
      if (
        (req.method === 'PATCH' || req.method === 'DELETE') &&
        res.statusCode === 200
      ) {
        res.status(204);
      }
      return oldSend.apply(res, args);
    };

    next();
  }
}
