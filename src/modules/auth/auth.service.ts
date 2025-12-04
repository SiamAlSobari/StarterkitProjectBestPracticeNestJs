import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from '../user/user.repository';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  public async register(dto: RegisterDto) {
    // cek apakah user sudah ada
    const existingUser = await this.userRepo.getUserByEmail(
      dto.email,
    );
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    // cek apakah ada admin yang terdaftar
    const getUserAdmin = await this.userRepo.getUserAdmin();
    const role: Role = getUserAdmin.length < 3 ? Role.ADMIN : Role.USER; // jika belum ada admin, user pertama jadi admin

    // hash password
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // simpan user ke repository
    const user = await this.userRepo.createUser(
      dto.email,
      hashedPassword,
      dto.first_name,
      dto.last_name,
      role,
    );
    return user;
  }

  public async login(dto: LoginDto) {
    // cari user berdasarkan email
    const user = await this.userRepo.getUserByEmail(
      dto.email,
    );
    if (!user) {
      throw new HttpException('Email tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    // cek password
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.hashPassword,
    );
    if (!isPasswordValid) {
      throw new HttpException('Password salah', HttpStatus.UNAUTHORIZED);
    }

    //update last login

    // generate token
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

}
