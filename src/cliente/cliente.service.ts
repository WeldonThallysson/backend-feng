import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from './cliente.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ValidationUtils } from 'src/utils/validations.utils';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private cliente: Repository<Cliente>,
  ) {}

  async create(item: Cliente): Promise<Cliente> {
    if (!ValidationUtils.isValidEmail(item.email)) {
      throw new BadRequestException('Email inválido');
    }

    if (ValidationUtils.isValidPhone(item.telefone)) {
      throw new BadRequestException(
        'Telefone inválido. Seu número deve ter até 11 ou 10 digitos.',
      );
    }

    if (!ValidationUtils.isValidPassword(item.senha)) {
      throw new BadRequestException('Senha deve ter pelo menos 8 caracteres');
    }

    const data = {
      nome: item.nome,
      email: item.email,
      telefone: item.telefone,
      senha: await bcrypt.hash(item.senha, 10),
    };

    return this.cliente.save(data);
  }

  async findAll(): Promise<Cliente[]> {
    return this.cliente.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const item = await this.cliente.findOne({
      where: {
        id: id,
      },
    });

    if (!item) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado`);
    }

    return item;
  }


  async update(id: number, itemData: Partial<Cliente>): Promise<Cliente> {
    const item = await this.cliente.findOne({
      where: { id },
    });

    if (itemData.email && !ValidationUtils.isValidEmail(itemData.email)) {
      throw new BadRequestException('Email inválido');
    }

    if (itemData.telefone && !ValidationUtils.isValidPhone(itemData.telefone)) {
      throw new BadRequestException(
        'Telefone inválido. Use o formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX',
      );
    }

    if (itemData.senha && !ValidationUtils.isValidPassword(itemData.senha)) {
      throw new BadRequestException('Senha deve ter pelo menos 8 caracteres');
    }

    if (!itemData.senha) {
      itemData.senha = item?.senha;
    } else {
      itemData.senha = await bcrypt.hash(itemData.senha, 10);
    }

    const dataUpdate = {
      nome: itemData.nome,
      email: itemData.email,
      telefone: itemData.telefone,
      senha: await bcrypt.hash(itemData.senha ?? '', 10),
      isAdmin: itemData.isAdmin
    };

    Object.assign(item as Cliente, dataUpdate);
    
    return this.cliente.save(dataUpdate);
  }

  
  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.cliente.remove(item);
  }






}
