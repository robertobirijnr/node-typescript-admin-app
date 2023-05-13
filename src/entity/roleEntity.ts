import { Permission } from './permissionEntity';
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(()=>Permission)
    @JoinTable({
        name:'role_permissions',
        joinColumn:{name:'role_id', referencedColumnName:'id'},
        inverseJoinColumn:{name:'permission_id', referencedColumnName:'id'}
    })
    permissions: Permission
}