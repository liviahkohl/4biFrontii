'use client'
import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Header() {
  const [show, setShow] = useState(false);

  return (
    <>
      <header className={styles.headerMobile}>
        <button
          className={`${styles.mobileButton} ${show ? styles.open : ''}`}
          onClick={() => setShow(!show)}
          aria-label="Abrir/Fechar menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className={styles.logoMobile}>Clínica Vida+</div>

        {show && (
          <div className={styles.mobileMenu}>
            <nav>
              <ul className={styles.ulMenuMobile}>
                <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Home</Link></li>
                
                <li className={styles.mobileSubmenu}>
                  <span className={styles.submenuTitle}>Especialidades</span>
                  <ul className={styles.ulSubMenuMobile}>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Listar</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Adicionar</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Excluir</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Editar</Link></li>
                  </ul>
                </li>

                <li className={styles.mobileSubmenu}>
                  <span className={styles.submenuTitle}>Médicos</span>
                  <ul className={styles.ulSubMenuMobile}>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Listar</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Adicionar</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Excluir</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Editar</Link></li>
                  </ul>
                </li>

                <li className={styles.mobileSubmenu}>
                  <span className={styles.submenuTitle}>Pacientes</span>
                  <ul className={styles.ulSubMenuMobile}>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Listar</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Adicionar</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Excluir</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Editar</Link></li>
                  </ul>
                </li>

                <li className={styles.mobileSubmenu}>
                  <span className={styles.submenuTitle}>Consultas</span>
                  <ul className={styles.ulSubMenuMobile}>
                    <li><Link className={styles.link} href="/consultas/listar" onClick={() => setShow(false)}>Listar</Link></li>
                    <li><Link className={styles.link} href="/consultas/agendar" onClick={() => setShow(false)}>Agendar</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Editar Agendamento</Link></li>
                    <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Cancelar</Link></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      <header className={styles.header}>
        <div className={styles.logo}>Clínica Vida+</div>
        <nav>
          <ul className={styles.ulMenu}>
            <li className={styles.liMenu}>
              <Link className={styles.link} href="/">Home</Link>
            </li>
            
            <li className={styles.liMenu}>
              <Link className={styles.link} href="/">Especialidades</Link>
              <ul className={styles.ulSubMenu}>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Listar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Adicionar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Excluir</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Editar</Link></li>
              </ul>
            </li>

            <li className={styles.liMenu}>
              <Link className={styles.link} href="/">Médicos</Link>
              <ul className={styles.ulSubMenu}>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Listar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Adicionar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Excluir</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Editar</Link></li>
              </ul>
            </li>

            <li className={styles.liMenu}>
              <Link className={styles.link} href="/">Pacientes</Link>
              <ul className={styles.ulSubMenu}>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Listar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Adicionar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Excluir</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Editar</Link></li>
              </ul>
            </li>

            <li className={styles.liMenu}>
              <Link className={styles.link} href="/">Consultas</Link>
              <ul className={styles.ulSubMenu}>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/consultas/listar">Listar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/consultas/agendar">Agendar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Editar Agendamento</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/">Cancelar</Link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}