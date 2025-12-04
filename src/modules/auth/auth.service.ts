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
      user.hash_password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Password salah', HttpStatus.UNAUTHORIZED);
    }

    //update last login
    await this.authRepository.updateLastLogin(user.id);

    // generate token
    const payload = {
      id: user.id,
      role: user.role,
      isVerified: user.is_verified,
    };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }

  public async sendVerificationEmail(userId: string) {
    //expired 1 jam dari sekarang
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
    //generate token 6 digit
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    //simpan token ke database
    await this.authRepository.createToken(userId, token, expiresAt);

    //ambil user berdasarkan id
    const user = await this.authRepository.getUserById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    //kirim email
    const EMAIL_USER = this.configService.get<string>('EMAIL_USER');
    const EMAIL_PASS = this.configService.get<string>('EMAIL_PASS');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS, // pakai App Password Gmail
      },
    });

    const mailOptions = {
      from: `"MyApp Support" <${EMAIL_USER}>`,
      to: user?.email as string,
      subject: 'Email Verification',
      text: `Your verification code is ${token}`,
      html: `<p>Your verification code is <b>${token}</b></p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { message: 'Verification email sent' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  public async verifyEmail(userId: string, token: string) {
    const verify = await this.authRepository.verifyToken(userId, token);
    if (!verify) {
      throw new HttpException(
        'Token tidak valid atau sudah kadaluarsa',
        HttpStatus.UNAUTHORIZED,
      );
    }
    // jika token valid, update status user menjadi verified
    await this.authRepository.updateUserVerified(userId);
    return { message: 'Email verified successfully' };
  }
}
