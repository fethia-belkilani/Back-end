import { Project } from "src/projects/project.entity";
import { Imputation } from 'src/imputations/imputation.entity';
import { User } from './user.entity';

  
export class UpdateUserDto {
    readonly id: number
    readonly name: string;
    readonly isValidator: boolean
    readonly projects: Project[]
    readonly imputations:Imputation
    readonly collaborators:User[]
    readonly validators: User[]
    
  }