import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Network, Alchemy } from 'alchemy-sdk';
import { PrismaService } from 'src/prisma/prisma.service';
import { CertificadoDtoEmitir } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as fs from 'fs';
/* import { exec } from 'child_process'; */
import { promisify } from 'util';
import {exec as execCallback} from 'child_process';


const exec = promisify(execCallback);


@Injectable({})
export class CertificadoService {
    constructor(private config: ConfigService, private prisma: PrismaService) {

    }

    async getPublicKey() {
        return {
            publicKey: this.config.get('PUBLIC_KEY')
        }
    }

    async verificarCertificado(contractAddress : string) {

      try {
        const settings = {
          apiKey: this.config.get('SEPOLIA_API_KEY'),
          network: Network.ETH_SEPOLIA
        }

        const alchemy = new Alchemy(settings);

        if (!(await alchemy.core.isContractAddress(contractAddress)))
          throw new ForbiddenException(
            'Endereço Do Contrato Não É Válido'
          );

        const enderecoInstituicao = this.config.get('PUBLIC_KEY');
        const resposta = await alchemy.core.findContractDeployer(contractAddress);
        const endercoDeployer = resposta.deployerAddress;
        
        return { isValid: endercoDeployer.toLowerCase() === enderecoInstituicao.toLowerCase() };

      } catch(erro) {
        throw new ForbiddenException('Erro Ao Tentar Validar Contrato!');
      }
        
    }

    async testarAlchemy() {
        const settings = {
            apiKey: this.config.get('SEPOLIA_API_KEY'),
            network: Network.ETH_SEPOLIA
        }

        const alchemy  = new Alchemy(settings);
        const ultimoBloco = await alchemy.core.getBlockNumber();

        return ultimoBloco;

    }

    async verificarAutorizacao(user: any) {
        const dadosUsuario = await this.prisma.loginInstitucional.findUnique({
            where: {
                email: user.email
            }
        })

        if (!dadosUsuario)
            throw new UnauthorizedException('Acesso não autorizado');
    }

    /* async emitirCertificadoBlockchain(dto: CertificadoDtoEmitir) {
        const dados = dto.dados

        const aluno = await this.prisma.student.findUnique({
            where: {
                matricula: dto.matriculaAluno
            },
            select: {
                endereco_eth: true
            }
        });



        const codigo = `
        async function main() {
            const certificadoFactory = await ethers.getContractFactory("Certificado");                            
            const certificado = await certificadoFactory.deploy(
                "${dados}",
                "${aluno.endereco_eth}"
            );
            console.log(certificado.address);
        }         
        main()
        .then(() => process.exit(0))
        .catch(error => {
            console.error(error);
            process.exit(1);
        });`;


        fs.writeFile('./scripts/deploy.js', codigo, (erro) => {
            if (erro) {
                throw new Error(`Erro ao salvar o arquivo deploy.js: ${erro.message}`);
            }
        })

        const comando = "npx hardhat run scripts/deploy.js --network sepolia";
        let enderecoContrato = "";

        exec(comando, (error, stdout, stderr) => {
            if (error) {
              console.error(`Erro ao executar o comando: ${error.message}`);
              return;
            }
            if (stderr) {
              console.error(`Erro no comando: ${stderr}`);
              return;
            }
            enderecoContrato = stdout;
            console.log(`${stdout}`);

            const resultado = {
                enderecoContrato: enderecoContrato,
                url: `https://sepolia.etherscan.io/address/${enderecoContrato}#readContract`
            }                        
          });
    } */
    

    async emitirCertificadoBlockchain(dto: CertificadoDtoEmitir) {
      
        const aluno = await this.prisma.student.findUnique({
          where: {
            matricula: dto.matriculaAluno
          }
        });

        if (!aluno)
          throw new ForbiddenException(
            'Aluno Não Cadastrado'
          );
        

        const curso = await this.prisma.curso.findUnique({
          where: {
            id: dto.idCurso
          }
        })

        if (!curso)
          throw new ForbiddenException(
            'Curso Não Cadastrado'
          );

        const cpfFormatado = '*** - ' + aluno.cpf.slice(3, 6) + ' - ' + aluno.cpf.slice(6, 9) + ' - **';
      
        const codigo = `
          async function main() {
            const certificadoFactory = await ethers.getContractFactory("Certificado");                            
            const certificado = await certificadoFactory.deploy(
              "${aluno.nome}",
              "${cpfFormatado}",
              "${curso.nome}",
              "${curso.descricao}",
              "${aluno.endereco_eth}"
            );
            console.log(certificado.address);
          }         
          main()
          .then(() => process.exit(0))
          .catch(error => {
            console.error(error);
            process.exit(1);
          });`;
      
        try {
          await fs.promises.writeFile('./scripts/deploy.js', codigo);
          const comando = "npx hardhat run scripts/deploy.js --network sepolia";
          const { stdout, stderr } = await exec(comando);
      
          if (stderr) {
            console.error(`Erro no comando: ${stderr}`);
            throw new Error(stderr.toString());
          }
      
          const enderecoContrato = stdout.toString().trim();
          console.log(`${stdout}`);
      
          const resultado = {
            enderecoContrato: enderecoContrato,
            url: `https://sepolia.etherscan.io/address/${enderecoContrato}#readContract`
          };
      
          return resultado;
        } catch (error) {
          console.error(`Erro ao executar o comando: ${error.message}`);
          throw new Error(error.message);
        }
      }


    async emitirCertificadoInstituicao(dto: CertificadoDtoEmitir, endereco_eth: string) {
        
        
        await this.prisma.certificado.create({
            data: {
                endereco_eth: endereco_eth,
                dados: dto.dados,
                studentMatricula: dto.matriculaAluno,
                idCurso: dto.idCurso
            }
        })
    }

}
/* const publicar = `npx hardhat verify --network sepolia ${enderecoContrato} "${dados}" "${aluno.endereco_eth}"`;


exec(publicar, (error, stdout, stderr) => {
    if (error) {
    console.error(`Erro ao executar o comando: ${error.message}`);
    return;
    }
    if (stderr) {
    console.error(`Erro no comando: ${stderr}`);
    return;
    }
    console.log("Certificado Implantado na blockchain no endereço: ", enderecoContrato);
    console.log("Disponível em: ", stdout);
}); */