import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, ValidateUserDto } from './auth.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';

import { EmailVerifiedGuard } from 'src/common/guards/email-verified.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  private async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.register(createUserDto)
    return {
      "success": true,
      "message": "User registered successfully",
      "data": user
    }
  }

  @Post('login')
  private async login(
    @Body() validateUserDto: ValidateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(validateUserDto);

    // set cookie
    res.cookie('token', access_token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 7 hari
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return { message: 'Login successful', access_token };
  }

  @Get("self")
  @UseGuards(AuthGuard)
  private async getSelf(@Req() req) {
    const user = req.user;
    return user;
  }

  @Delete("logout")
  @UseGuards(AuthGuard)
  private async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Logout successful' };
  }
}
