import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, JoinColumn, OneToOne} from "typeorm";
import {Account} from "./Account";
@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(type => Account, account => account.role)
    account: Account;
}