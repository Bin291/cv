import { CreateResumeDto } from '../dto/create-resume.dto';
import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LinkEntity } from '../../link/entities/link.entity';

export class Resume extends CreateResumeDto{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // … các cột khác …


}
