import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cliente } from 'src/cliente/cliente.entity';  // Importando Cliente
import { Item } from 'src/item/item.entity';  // Importando Item

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: Date;

  // Relacionamento ManyToOne com Cliente (um pedido pertence a um cliente)
  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'client_id' })  // Chave estrangeira no pedido
  cliente: Cliente;

  // Relacionamento OneToMany com Itens (um pedido pode ter vários itens)
  @OneToMany(() => Item, (item) => item.pedido)
  itens: Item[];
}
