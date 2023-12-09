
          async function main() {
            const certificadoFactory = await ethers.getContractFactory("Certificado");                            
            const certificado = await certificadoFactory.deploy(
              "dsafasdfasdf",
              "0x08965d2dfefc5edaddf876805475027b72bf0200"
            );
            console.log(certificado.address);
          }         
          main()
          .then(() => process.exit(0))
          .catch(error => {
            console.error(error);
            process.exit(1);
          });