import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    title:string;

    @Column()
    start: Date;

    @Column({ nullable: true })
    end: Date| null;


}
