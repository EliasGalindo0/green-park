import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Lotes } from 'src/lotes/lotes.entity';

@Table
export class Boletos extends Model {
  @Column
  nome_sacado: string;

  @ForeignKey(() => Lotes)
  @Column
  id_lote: number;

  @BelongsTo(() => Lotes)
  lote: Lotes;

  @Column
  valor: number;

  @Column
  linha_digitavel: string;

  @Column
  ativo: boolean;
}
