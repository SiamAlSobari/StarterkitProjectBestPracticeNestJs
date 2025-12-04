import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Role } from "src/common/enums/role.enum";

@Injectable()
export class AuthRepository {
    constructor(
        private readonly prismaService: PrismaService
    ) {}

    // ambil user berdasarkan email
    public async getUserByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: { email }
        });
    }

    // ambil semua user admin
    public async getUserAdmin() {
        return this.prismaService.user.findMany({
            where: { role: Role.ADMIN }
        });
    }

    public async getUserById(id: string) {
        return this.prismaService.user.findUnique({
            where: { id }
        });
    }
    // simpan user ke database
    public async createUser (email: string, hashedPassword: string, first_name: string, last_name: string, role: Role) {
        return this.prismaService.user.create({
            data: {
                email,
                hash_password: hashedPassword,
                role,
                profile: {
                    create: {
                        first_name,
                        last_name
                    }
                }
            }
        });
    }

    // simpan token ke database
    public async createToken (userId: string, token: string, expiresAt: Date) {
        return this.prismaService.verificationEmail.create({
            data: {
                user_id: userId,
                token,
                expires_at: expiresAt
            }
        });
    }

    // cek token valid
    public async verifyToken(userId: string, token: string) {
        return this.prismaService.verificationEmail.findFirst({
            where: {
                user_id: userId,
                token, // token harus sesuai
                expires_at: {
                    gte: new Date() // token belum expired gte menunjukan lebih besar atau sama dengan sekarang
                }
            }
        });
    }

    // update status user menjadi verified
    public async updateUserVerified(userId: string) {
        return this.prismaService.user.update({
            where: { id: userId },
            data: { is_verified: true }
        });
    }

    public async updateLastLogin(userId: string) {
        return this.prismaService.user.update({
            where: { id: userId },
            data: { last_login: new Date() }
        });
    }
}