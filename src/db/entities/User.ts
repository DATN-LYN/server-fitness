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
import { UserProgram } from './UserProgram';
import { UserExercise } from './UserExercise';

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

  @Field({ nullable: true})
  @Column({ select: false, insert: false, update: false, nullable: true })
  countPrograms: number;

  @Field({nullable: true})
  @Column({nullable: true})
  fullName: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true})
  @Column()
  googleId: string;

  @Field({ nullable: true})
  @Column()
  avatar: string;

  @Field({ nullable: true})
  @Column()
  age: number;
  
  @Field({ nullable: true})
  @Column()
  refreshToken: string;

  @Field({ nullable: true})
  @Column()
  roleId: string;

  @Field(() => Role, { nullable: true })
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Field(() => [Inbox], { nullable: true })
  @OneToMany(() => Inbox, inbox => inbox.userId)
  inboxes: Inbox[];

  @Field(() => [UserProgram], { nullable: true })
  @OneToMany(() => UserProgram, userProgram => userProgram.user)
  userPrograms: UserProgram[];

  @Field(() => [UserExercise], { nullable: true })
  @OneToMany(() => UserExercise, userExercise => userExercise.user)
  userExercises: UserExercise[];
}
