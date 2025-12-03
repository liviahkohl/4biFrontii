import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

const Footer = () => {
  return (
    <footer className={styles.rodape}>
      <div className={styles.conteudoRodape}>
        <div className={styles.infoClinica}>
          <h3>Clínica Vida+</h3>
          <p>Cuidando da sua saúde com excelência e compromisso. 
            Entre em contato pelos meios:</p>
          
          <div className={styles.contato}>
            <div className={styles.contatoItem}>
              <div className={styles.iconeContainer}>
                <Image
                  src="/img/telefone.png" 
                  alt="Ícone de telefone"
                  width={10}
                  height={10}
                  className={styles.icone}
                  priority
                />
              </div>
              <p className={styles.contatoTexto}>(11) 3456-7890</p>
            </div>
            
            <div className={styles.contatoItem}>
              <div className={styles.iconeContainer}>
                <Image
                  src="/img/email.png" 
                  alt="Ícone de email"
                  width={10}
                  height={10}
                  className={styles.icone}
                  priority
                />
              </div>
              <p className={styles.contatoTexto}>healthcarecenter@gmail.com</p>
            </div>
            
            <div className={styles.contatoItem}>
              <div className={styles.iconeContainer}>
                <Image
                  src="/img/local.png" 
                  alt="Ícone de localização"
                  width={10}
                  height={10}
                  className={styles.icone}
                  priority
                />
              </div>
              <p className={styles.contatoTexto}>Av. Deus nos acuda, 123<br />Vilhena - RO</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.rodapeBase}>
        <p className={styles.copy}>© 2025 HealthCare Center. Todos os direitos reservados.</p>
        <p className={styles.creditos}>Criado por <span>Ana Livia</span> e <span>Ariane</span></p>
      </div>
    </footer>
  );
};

export default Footer;