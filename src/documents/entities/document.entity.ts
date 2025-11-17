import { Client } from '../../clients/entities/client.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column()
  source: string; // pdf ou web

  @CreateDateColumn({ name: 'processed_at' })
  processedAt: Date;

  @ManyToOne(() => Client, (client) => client.documents)
  client: Client;
}
