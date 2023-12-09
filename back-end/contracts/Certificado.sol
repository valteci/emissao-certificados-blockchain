// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.3;

contract Certificado {
   
   string public message;
   address public studentAddress;
   
   constructor(string memory initMessage, address studentAdd) {
      message = initMessage;
      studentAddress = studentAdd;
   }
}