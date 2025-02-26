import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from '../pedido/pedido.entity'; // Importando Pedido, pois um item pertence a um pedido

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

  // Relacionamento ManyToOne com Pedido (um pedido tem vários itens)
  @ManyToOne(() => Pedido, (pedido) => pedido.itens)
  pedido: Pedido;
}