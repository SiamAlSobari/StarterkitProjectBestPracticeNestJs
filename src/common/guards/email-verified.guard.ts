import { CanActivate, ExecutionContext, HttpException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { user } = context.switchToHttp().getRequest();

    // Kalau user tidak ada → unauthorized
    if (!user) {
      throw new HttpException('Unauthorized', 401);
    }

    // Kalau email belum diverifikasi → forbidden
    if (!user.emailVerified) {
      throw new HttpException('Email belum terverifikasi', 403);
    }

    // Kalau diverifikasi → lanjut
    return true;
  }
}
