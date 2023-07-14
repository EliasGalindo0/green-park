import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  DataType,
} from 'sequelize-typescript';
import { Lotes } from '../lotes/lotes.entity';

@Table
export class Boletos extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ type: DataType.STRING(255) })
  nome_sacado: string;

  @ForeignKey(() => Lotes)
  @Column
  id_lote: number;

  @BelongsTo(() => Lotes)
  lote: Lotes;

  @Column({ type: DataType.DECIMAL })
  valor: number;

  @Column({ type: DataType.STRING(255) })
  linha_digitavel: string;

  @Column
  ativo: boolean;

  @CreatedAt
  @Column({ field: 'criado_em' })
  criado_em: Date;
}
