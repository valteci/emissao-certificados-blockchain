
          async function main() {
            const certificadoFactory = await ethers.getContractFactory("Certificado");                            
            const certificado = await certificadoFactory.deploy(
              "jose da silva",
              "*** - 456 - 789 - **",
              "desenvolvimento web",
              "Aprenda a fazer sites!",
              "0x2a06c53c67af74a250576fc21298fed0b505af5e"
            );
            console.log(certificado.address);
          }         
          main()
          .then(() => process.exit(0))
          .catch(error => {
            console.error(error);
            process.exit(1);
          });