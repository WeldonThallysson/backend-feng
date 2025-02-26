import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from 'src/cliente/cliente.entity';
import { Item } from 'src/item/item.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'client_id' })
  cliente: Cliente;

  @OneToMany(() => Item, (item) => item.pedido)
  itens: Item[];
}
