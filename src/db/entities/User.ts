import { GENDER, ROLE } from '@/common/constant';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Inbox } from './Inbox';
import { Role } from './Role';
import { UserExercise } from './UserExercise';
import { UserProgram } from './UserProgram';

registerEnumType(GENDER, {
  name: "GENDER",
})

registerEnumType(ROLE, {
  name: "ROLE",
})


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
  countProgram: number;

  @Field({ nullable: true})
  @Column({ select: false, insert: false, update: false, nullable: true })
  countInbox: number;

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

  @Field({ nullable: true})
  @Column()
  isActive: boolean;

  @Field(() => Role, { nullable: true })
  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Field(() => [Inbox], { nullable: true })
  @OneToMany(() => Inbox, inbox => inbox.user)
  inboxes: Inbox[];

  @Field(() => [UserProgram], { nullable: true })
  @OneToMany(() => UserProgram, userProgram => userProgram.user)
  userPrograms: UserProgram[];

  @Field(() => [UserExercise], { nullable: true })
  @OneToMany(() => UserExercise, userExercise => userExercise.user)
  userExercises: UserExercise[];

  @Field(() => GENDER, { nullable: true })
  @Column({ type: 'enum', enum: GENDER})
  gender: GENDER

  @Field(() => ROLE, { nullable: true })
  @Column({ type: 'enum', enum: ROLE})
  userRole: ROLE;

  @Field({ nullable: true })
  @Column()
  createdAt: Date;

  @Field({ nullable: true })
  @Column()
  updatedAt: Date;

  @BeforeInsert()
  updateTimestampBeforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  updateTimestampBeforeUpdate() {
    this.updatedAt = new Date();
  }
}
