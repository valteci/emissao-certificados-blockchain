
          async function main() {
            const certificadoFactory = await ethers.getContractFactory("Certificado");                            
            const certificado = await certificadoFactory.deploy(
              "junior",
              "*** - 666 - 555 - **",
              "Desenvolvimento Web",
              "Aprenda a construir um site do zero",
              "0x5717fe3edc0b2955f3d2fe0ac8cad149107dbdaa"
            );
            console.log(certificado.address);
          }         
          main()
          .then(() => process.exit(0))
          .catch(error => {
            console.error(error);
            process.exit(1);
          });