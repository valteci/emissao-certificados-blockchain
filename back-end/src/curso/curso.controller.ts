import { Controller, Get } from '@nestjs/common';
import { CursoService } from './curso.service';

@Controller('curso')
export class CursoController {

    constructor(private cursos: CursoService) {

    }

    @Get()
    getCursos() {
        return this.cursos.getCursos();
        
    }

}
