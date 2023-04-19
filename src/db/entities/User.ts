import { Field } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Inbox } from './Inbox';
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

  @Field(() => [Inbox], { nullable: true })
  @OneToMany(() => Inbox, inbox => inbox.userId)
  inboxes: Inbox[];
}
