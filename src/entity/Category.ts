import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, JoinColumn} from "typeorm";
import {Post} from "./Post";
@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(type => Post, post => post.category, {
        cascade: true
    })
    @JoinColumn({ name: "id" })
    post: Post;
}