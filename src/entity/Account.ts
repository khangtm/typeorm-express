import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import {Role} from "./Role";
import {Address} from "./Address";


@Entity()
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("character varying")
    username: string;

    @Column("character varying")
    password: string;

    @Column("character varying")
    status: string;

    @Column("timestamp with time zone")
    regdate: Date;

    @Column("timestamp with time zone")
    modifydate: Date;

    @ManyToOne(type => Role, role => role.account)
    @JoinColumn({ name: "roleid" })
    role: Role;

    @OneToOne(type => Address, address => address.account,{
        cascade: true
    })
    address: Address;

}