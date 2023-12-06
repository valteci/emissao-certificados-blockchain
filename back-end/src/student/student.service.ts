import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';


@Injectable({})
export class StudentService {

    constructor(private prisma: PrismaService) {

    }

    async getMe(email : string) {
        
    }

}
