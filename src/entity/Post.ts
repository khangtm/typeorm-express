import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne} from "typeorm";
import {Category} from "./Category";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("character varying")
    title: string;

    @Column("character varying")
    text: string;

    @Column("timestamp with time zone")
    regdate: Date;

    @Column("timestamp with time zone")
    modifydate: Date;

    @OneToOne(type => Category, category => category.post)
    category: Category;

}