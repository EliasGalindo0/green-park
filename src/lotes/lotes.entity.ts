import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Lotes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.STRING(100) })
  nome: string;

  @Column
  ativo: boolean;

  @CreatedAt
  @Column({ field: 'criado_em' })
  criado_em: Date;
}
