import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Resume } from '../../resume/entities/resume.entity';


@Entity('links')
export class LinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  resume_id: string;

  @ManyToOne(() => Resume, resume => resume.links, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'resume_id' })
  resume: Resume;

  @Column()
  label: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  value: string;

  @Column({ default: 'link' })
  type: string;
}
