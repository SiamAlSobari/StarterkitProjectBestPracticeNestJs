import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "src/common/enums/role.enum";
import { Profile } from "src/entities/profile.entity";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,

        // @InjectRepository(Profile)
        // private readonly profileRepo: Repository<Profile>,
    ) { }

    public async getUserByEmail(email: string) {
        return this.userRepo.findOne({
            where: { email },
            relations: ['profile']
        });
    }

    public async getUserAdmin() {
        return this.userRepo.find({
            where: { role: Role.ADMIN }
        });
    }

    public async getUserById(id: string) {
        return this.userRepo.findOne({
            where: { id }
        });
    }
    public async createUser(email: string, hashedPassword: string, first_name: string, last_name: string, role: Role) {
        const user = this.userRepo.create({
            email,
            hashPassword: hashedPassword,
            role,
            profile: {
                firstName: first_name,
                lastName: last_name
            }
        })

        return this.userRepo.save(user);
    }
}