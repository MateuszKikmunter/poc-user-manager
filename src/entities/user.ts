import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @Column({ type: 'uuid' })
    public id!: string;

    @Column({ length: 255, type: 'varchar' })
    name!: string;

    @Column({ length: 255, type: 'varchar', unique: true })
    email!: string;

    //in real life we do not want to return password by default, so we should set select === false
    @Column({ length: 255, type: 'varchar' })
    password!: string;

    @Column({ nullable: true, type: 'datetime' })
    lastLogin!: Date;
}