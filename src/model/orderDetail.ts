import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    quantity: number
    @Column()
    product: number
    @Column()
    order: number
}