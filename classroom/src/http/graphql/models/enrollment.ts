import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Course } from './course';
import { Student } from './student';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  @Field(() => Student)
  student: Student;

  // não coloquei @Field aqui pq nao quero que o front end consiga buscar esse campo
  // é só para o backend saber e eu poder usar no enrollments.resolver.ts
  studentId: string;

  @Field(() => Course)
  course: Course;

  courseId: string;

  @Field(() => Date, { nullable: true })
  canceledAt: Date;

  @Field(() => Date)
  createdAt: Date;
}
