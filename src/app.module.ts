import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { SchoolModule } from './school/school.module';
import { CertificadoModule } from './certificado/certificado.module';
import { TurmaModule } from './turma/turma.module';
import { CursoModule } from './curso/curso.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule, 
    StudentModule,
    SchoolModule, 
    CertificadoModule, 
    TurmaModule, 
    CursoModule, PrismaModule
  ],
})
export class AppModule {}
