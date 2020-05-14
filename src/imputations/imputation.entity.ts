import { Entity, Column, PrimaryColumn,  ManyToOne, Double, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from 'src/projects/project.entity';
import { User } from './../users/user.entity';

@Entity()
export class Imputation  {

    @PrimaryGeneratedColumn({})
    id: number;

    @Column({type:'float'})
    hours:Double;

    @Column({ length: 15 })
    state:string;

    @Column()
    date:Date;

    @ManyToOne(type => Project, project => project.imputations)
    project:Project;

    @ManyToOne(type => User, user => user.imputations)
    user:User;




 
}