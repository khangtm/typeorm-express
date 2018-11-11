import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, JoinColumn} from "typeorm";
import {Account} from "./Account";
@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    accountid: number;

    @OneToOne(type => Account, account => account.address)
    @JoinColumn({ name: "accountid" })
    account: Account;
}