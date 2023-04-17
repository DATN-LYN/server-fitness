import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Field } from '@nestjs/graphql';
import { Role } from './Role';

@Entity('user')
export class User extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  @Column()
  googleId: string;

  @Column()
  avatar: string;

  @Column()
  refreshToken: string;

  @Field(() => Role, { nullable: true })
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
