import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id : string

    @Column()
    userId : string

    @Column()
    firstName : string

    @Column()
    lastName : string

    @Column({
        default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
        nullable: true
    })
    image : string | null

    // Relasi OneToOne User
    @OneToOne(() => User, (user) => user.profile,{
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'userId' })
    user : User
}