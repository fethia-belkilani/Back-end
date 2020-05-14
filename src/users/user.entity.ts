import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn, JoinColumn, OneToMany } from 'typeorm';
import { Project } from 'src/projects/project.entity';
import { Imputation } from 'src/imputations/imputation.entity';

@Entity()
export class User {

    @PrimaryColumn()
    id: number;

    @Column({ length: 25 })
    name:string;

    @Column()
    isValidator:boolean

    @ManyToMany(type => Project,project => project.users,{cascade:true})
    @JoinTable()
    projects: Project[];

    
    @ManyToMany(type => User, user => user.validators,{cascade:true})
    @JoinTable()
    collaborators: User[];

  
    @ManyToMany(type => User, user => user.collaborators)
    validators: User[]; 

    @OneToMany(type => Imputation, imputation => imputation.user)
    imputations: Imputation[];

  



   
  
}