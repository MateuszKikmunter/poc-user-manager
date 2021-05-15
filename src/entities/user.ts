
//libs imports
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    public id!: string;

    @Column({ length: 255, type: 'varchar' })
    name!: string;

    @Column({ length: 255, type: 'varchar', unique: true })
    email!: string;

    //in real life we do not want to return password by default, so we should set select === false
    @Column({ length: 255, type: 'varchar' })
    password!: string;

    //in real life it could be stored in a separate table with other details like ip address, device print etc.
    //also then we would avoid updating user entry with every request - but for this project it's fine
    @Column({ nullable: true, type: 'datetime' })
    lastLogin!: Date;
}