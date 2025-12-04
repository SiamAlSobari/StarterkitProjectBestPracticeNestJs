import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, ValidateUserDto } from './auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/enums/role.enum';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async register(createUserDto: CreateUserDto) {
    // cek apakah user sudah ada
    const existingUser = await this.authRepository.getUserByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    // cek apakah ada admin yang terdaftar
    const getUserAdmin = await this.authRepository.getUserAdmin();
    const role: Role = getUserAdmin.length < 3 ? Role.ADMIN : Role.USER; // jika belum ada admin, user pertama jadi admin

    // hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // simpan user ke repository
    const user = await this.authRepository.createUser(
      createUserDto.email,
      hashedPassword,
      createUserDto.first_name,
      createUserDto.last_name,
      role,
    );
    return user;
  }

  public async login(validateUserDto: ValidateUserDto) {
    // cari user berdasarkan email
    const user = await this.authRepository.getUserByEmail(
      validateUserDto.email,
    );
    if (!user) {
      throw new HttpException('Email tidak ditemukan', HttpStatus.NOT_FOUND);
    }

    // cek password
    const isPasswordValid = await bcrypt.compare(
      validateUserDto.password,
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
