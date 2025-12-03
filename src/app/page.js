'use client';
import React from 'react';
import styles from './page.module.css';

const Home = () => {
  return (
    <div className={styles.homeContainer}>

    
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Bem-vindo à Clínica Vida+</h1>
          <p>
            Cuidando da sua saúde com responsabilidade, tecnologia e uma equipe
            altamente especializada. Aqui você encontra atendimento humanizado e
            qualidade em cada consulta.
          </p>
          <button 
            className={styles.ctaBtn}
            onClick={() => window.location.href = '/consultas/agendar'}
          >
            Agendar Consulta
          </button>
        </div>

        <div className={styles.heroImage}>
          <img src="/img/clinica.png" alt="Foto da clínica" />
        </div>
      </section>

    </div>
  );
};

export default Home;