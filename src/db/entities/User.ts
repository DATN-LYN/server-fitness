import { Field, ObjectType } from '@nestjs/graphql';
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

@ObjectType({ isAbstract: true })
@Entity('user')
export class User extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Field()
  @Column({ unique: true, nullable: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  googleId: string;

  @Field()
  @Column()
  avatar: string;
  
  @Field()
  @Column()
  refreshToken: string;

  @Field()
  @Column()
  roleId: string;

  @Field(() => Role, { nullable: true })
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Field(() => [Inbox], { nullable: true })
  @OneToMany(() => Inbox, inbox => inbox.userId)
  inboxes: Inbox[];
}
