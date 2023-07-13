import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Lotes extends Model {
  @Column
  nome: string;

  @Column
  ativo: boolean;
}
