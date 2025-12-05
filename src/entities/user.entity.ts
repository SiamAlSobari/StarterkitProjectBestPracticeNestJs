import { Role } from '../common/enums/role.enum';

import { Column, CreateDateColumn, Entity, Index, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({ unique: true })
    email: string;

    @Column()
    hashPassword: string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    // Relasi Ke Profile
    @OneToOne(() => Profile, profile => profile.user, { cascade: true })
    profile: Profile
}
