import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('dictionary')
export class Dictionary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  category: string;

  @Column({ length: 255 })
  key: string;

  @Column({ length: 255 })
  value: string;

  @Column({ type: 'bool' })
  enable: boolean;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
