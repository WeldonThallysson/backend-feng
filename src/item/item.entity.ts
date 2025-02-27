import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_unitario: number;

  @ManyToMany(() => Pedido, (pedido) => pedido.itens)
  pedido: Pedido[];
}
