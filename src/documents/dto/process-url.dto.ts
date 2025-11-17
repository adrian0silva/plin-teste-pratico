import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class ProcessUrlDto {
  @IsNotEmpty({ message: 'URL é obrigatória' })
  @IsUrl({}, { message: 'URL inválida' })
  url: string;

  @IsNotEmpty({ message: 'ID do cliente é obrigatório' })
  @IsNumber({}, { message: 'ID do cliente deve ser um número' })
  clientId: number;
}
