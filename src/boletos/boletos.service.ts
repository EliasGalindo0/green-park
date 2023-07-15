import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Boletos } from './boletos.entity';
import { Lotes } from 'src/lotes/lotes.entity';
import { PDFDocument } from 'pdf-lib';
import { Readable } from 'stream';
import * as csv from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class BoletosService {
  constructor(
    @Inject('BOLETOS_PROVIDERS')
    private boletosRepository: typeof Boletos,
    @Inject('LOTES_PROVIDERS')
    private lotesRepository: typeof Lotes,
  ) { }

  async create(boleto: Boletos): Promise<any> {
    const { nome_sacado, valor, id_lote, linha_digitavel, ativo } = boleto;
    const lote = await this.lotesRepository.findByPk(id_lote);
    if (!lote) {
      throw new NotFoundException(`Lote with ID ${id_lote} not found`);
    }

    return await this.boletosRepository.create({
      nome_sacado,
      id_lote,
      valor,
      linha_digitavel,
      ativo,
    });
  }

  // async findAll(): Promise<Boletos[]> {
  //   try {
  //     return await this.boletosRepository.findAll<Boletos>();
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  async getAllBoletos(
    nome: string,
    valorInicial: number,
    valorFinal: number,
    id_lote: number,
  ): Promise<Boletos[]> {
    try {
      const where = {};

      if (nome) {
        where['nome_sacado'] = nome;
      }

      if (valorInicial && valorFinal) {
        where['valor'] = { between: [valorInicial, valorFinal] };
      } else if (valorInicial) {
        where['valor'] = { gte: valorInicial };
      } else if (valorFinal) {
        where['valor'] = { lte: valorFinal };
      }

      if (id_lote) {
        where['id_lote'] = id_lote;
      }
      console.log(id_lote);

      return this.boletosRepository.findAll({ where });
    } catch (error) {
      console.error(error.message);
    }
  }

  async createFromCSV(file: Express.Multer.File): Promise<void> {
    try {
      return new Promise((resolve, reject) => {
        const results: any[] = [];
        const stream = Readable.from(file.buffer.toString());

        const csvParserOptions: csv.Options = { separator: ';' };

        const csvParser = csv(csvParserOptions);

        stream
          .pipe(csvParser)
          .on('data', (data) => {
            const boleto = data;

            results.push(boleto);
          })
          .on('end', async () => {
            for (const result of results) {
              const idMap = {
                '17': 3,
                '18': 6,
                '19': 7,
              };

              const idLote = result.unidade;
              const lote = await this.lotesRepository.findOne({
                where: { id: idLote },
              });

              if (!lote) {
                console.log(`Lote não encontrado: ${idLote}`);
              }

              const novoIdLote = idMap[result.unidade];
              if (!novoIdLote) {
                console.log(`Nome não mapeado: ${result.unidade}`);
              }
              try {
                await this.boletosRepository.create({
                  nome_sacado: result.nome,
                  id_lote: novoIdLote,
                  valor: parseFloat(result.valor),
                  linha_digitavel: result.linha_digitavel,
                  ativo: true,
                });
              } catch (error) {
                console.log(error.message);
              }
            }
            resolve();
          })
          .on('error', (error) => {
            reject(error);
          });
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async splitPDF(file: Express.Multer.File): Promise<void> {
    try {
      if (!file.originalname.endsWith('.pdf')) {
        throw new Error('Arquivo enviado não é um PDF');
      }

      const pdfBytes = Buffer.from(file.buffer);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      const boletos = await this.boletosRepository.findAll();
      console.log(boletos);

      const boletosIds = boletos.map((boleto) => boleto.id);

      if (pdfDoc.getPageCount() !== boletosIds.length) {
        throw new Error(
          'Número de páginas no PDF não corresponde ao número de boletos',
        );
      }

      const path = require('path');
      // const pdfDirPath = path.join(process.cwd(), 'green-park', 'pdf');
      const pdfDirPath = path.join(
        '/Users/eliasgalindo/Dev/test-backend/green-park/pdf',
      );

      console.log(pdfDirPath);

      if (!fs.existsSync(pdfDirPath)) {
        fs.mkdirSync(pdfDirPath);
      }

      let newPdfDoc;
      for (let i = 0; i < boletosIds.length; i++) {
        const boletoId = boletosIds[i];

        if (i < pdfDoc.getPageCount()) {
          newPdfDoc = await PDFDocument.create();
          const [newPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
          newPdfDoc.addPage(newPage);

          const newPdfBytes = await newPdfDoc.save();
          const newPdfFileName = `${boletoId}.pdf`;
          const newPdfFilePath = path.join(pdfDirPath, newPdfFileName);
          fs.writeFileSync(newPdfFilePath, newPdfBytes);
        }

        console.log(`Número de páginas no PDF: ${pdfDoc.getPageCount()}`);
      }

      fs.unlinkSync(file.path);
    } catch (error) {
      console.log(error.message);
    }
  }
}
