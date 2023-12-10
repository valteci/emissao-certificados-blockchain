// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.3;

contract Certificado {
      
   address public endereco_estudante;
   string public nome;
   string public cpf;
   string public nome_do_curso;
   string public descricao_curso;

   
   constructor(      
      string memory _nome,
      string memory _cpf,
      string memory _nome_do_curso,
      string memory _descricao_curso,
      address enderedo_do_estudante
      ) {
      
      endereco_estudante = enderedo_do_estudante;
      nome = _nome;
      cpf = _cpf;
      nome_do_curso = _nome_do_curso;
      descricao_curso = _descricao_curso;
   }
}