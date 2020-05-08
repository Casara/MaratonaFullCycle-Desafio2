import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'maratona' })
export class Maratona {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'aula',
    type: 'varchar',
    charset: 'utf-8',
    nullable: false,
    unique: true
  })
  aula: string;

}
