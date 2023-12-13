
          async function main() {
            const certificadoFactory = await ethers.getContractFactory("Certificado");                            
            const certificado = await certificadoFactory.deploy(
              "maria dos santos",
              "*** - 333 - 444 - **",
              "Banco de Dados",
              "Aprenda Desde a modelagem até a programação de banco de dados. Aprenda banco de dados relacionais e não relacionais.",
              "0x27f6b696ff24d26a1aa9a8030dc4e50b881f1b35"
            );
            console.log(certificado.address);
          }         
          main()
          .then(() => process.exit(0))
          .catch(error => {
            console.error(error);
            process.exit(1);
          });