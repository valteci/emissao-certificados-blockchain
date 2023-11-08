import { secp256k1 } from 'ethereum-cryptography/secp256k1.js';
import { getRandomBytesSync } from 'ethereum-cryptography/random.js';
import { toHex } from 'ethereum-cryptography/utils.js';
import { keccak256 } from 'ethereum-cryptography/keccak.js'

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('btnGerar').addEventListener('click', gerarChaves);
});

function gerarChaves() {
    const chavePrivada = getRandomBytesSync(32);
    const chavePublica = secp256k1.getPublicKey(chavePrivada, false);
    const hashChavePublica = keccak256(chavePublica.slice(1));
    const endereco = hashChavePublica.slice(-20);
    
    const inputChavePrivada = document.getElementById('chavePrivada');
    inputChavePrivada.value = '0x' + toHex(chavePrivada);

    const inputChavePublic = document.getElementById('endereco');
    inputChavePublic.value = '0x' + toHex(endereco);

    

}