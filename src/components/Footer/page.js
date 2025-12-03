import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './page.module.css';

const Footer = () => {
  return (
    <footer className={styles.rodape}>
      <div className={styles.conteudoRodape}>
        <div className={styles.infoClinica}>
          <h3>HealthCare Center</h3>
          <p>Cuidando da sua saúde com excelência e compromisso.</p>
          
          <div className={styles.contato}>
            <div className={styles.contatoItem}>
              <FaPhone className={styles.icone} />
              <p>(11) 3456-7890</p>
            </div>
            
            <div className={styles.contatoItem}>
              <FaEnvelope className={styles.icone} />
              <p>healthcarecenter@gmail.com</p>
            </div>
            
            <div className={styles.contatoItem}>
              <FaMapMarkerAlt className={styles.icone} />
              <p>Av. Deus nos acuda, 123<br />Vilhena - RO</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.rodapeBase}>
        <p>© 2025 HealthCare Center. Todos os direitos reservados.</p>
        <p className={styles.creditos}>Criado por <span>Ana Livia</span> e <span>Ariane</span></p>
      </div>
    </footer>
  );
};

export default Footer;