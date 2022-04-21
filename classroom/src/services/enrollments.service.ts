import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface FindEnrollmentByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

interface CreateEnrollmentParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  listAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        cancelledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllEnrollmentsFromStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        cancelledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findEnrollmentByCourseAndStudentId({
    courseId,
    studentId,
  }: FindEnrollmentByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        cancelledAt: null,
      },
    });
  }

  async createEnrollment({ studentId, courseId }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }
}
