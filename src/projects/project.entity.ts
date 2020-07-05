import { PrimaryColumn, Column, OneToMany, ManyToMany, JoinColumn, Entity, JoinTable } from "typeorm";
import { Imputation } from "src/imputations/imputation.entity";
import { User } from './../users/user.entity';

@Entity()
export class Project {

  
    @PrimaryColumn({ select: false })
    id: number;

    @Column({ length: 25 })
    name:string;

    @OneToMany(type => Imputation, imputation => imputation.project)
    imputations: Imputation[];

    @ManyToMany(type => User, user => user.projects)
    users: User[];

  
    
    


   

}
