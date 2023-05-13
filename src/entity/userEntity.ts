import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,  JoinColumn } from "typeorm"
import { Role } from "./roleEntity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @ManyToOne(()=>Role)
    @JoinColumn({ name: 'role_id' })
    role: Role;
}