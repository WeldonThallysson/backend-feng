import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity'; 

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;
  

  @Column()
  senha: string;


  @Column()
  telefone: string;

  @Column({ default: false})
  isAdmin: boolean 

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];
}
