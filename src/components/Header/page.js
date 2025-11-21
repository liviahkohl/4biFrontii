'use client'
import { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Header() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Header Mobile */}
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

        <div className={styles.logoMobile}>Clínica Saúde Total</div>

        {show && (
          <div className={styles.mobileMenu}>
            <nav>
              <ul className={styles.ulMenuMobile}>
                <li><Link className={styles.link} href="/" onClick={() => setShow(false)}>Home</Link></li>
                
                <li className={styles.mobileSubmenu}>
                  <span className={styles.submenuTitle}>Especialidades</span>
                  <ul className={styles.ulSubMenuMobile}>
                    <li><Link className={styles.link} href="/especialidades/listar" onClick={() => setShow(false)}>Listar</Link></li>
                    <li><Link className={styles.link} href="/especialidades/adicionar" onClick={() => setShow(false)}>Adicionar</Link></li>
                    <li><Link className={styles.link} href="/especialidades/excluir" onClick={() => setShow(false)}>Excluir</Link></li>
                    <li><Link className={styles.link} href="/especialidades/editar" onClick={() => setShow(false)}>Editar</Link></li>
                  </ul>
                </li>

                <li className={styles.mobileSubmenu}>
                  <span className={styles.submenuTitle}>Médicos</span>
                  <ul className={styles.ulSubMenuMobile}>
                    <li><Link className={styles.link} href="/medicos/listar" onClick={() => setShow(false)}>Listar</Link></li>
                    <li><Link className={styles.link} href="/medicos/adicionar" onClick={() => setShow(false)}>Adicionar</Link></li>
                    <li><Link className={styles.link} href="/medicos/excluir" onClick={() => setShow(false)}>Excluir</Link></li>
                    <li><Link className={styles.link} href="/medicos/editar" onClick={() => setShow(false)}>Editar</Link></li>
                  </ul>
                </li>

                <li className={styles.mobileSubmenu}>
                  <span className={styles.submenuTitle}>Pacientes</span>
                  <ul className={styles.ulSubMenuMobile}>
                    <li><Link className={styles.link} href="/pacientes/listar" onClick={() => setShow(false)}>Listar</Link></li>
                    <li><Link className={styles.link} href="/pacientes/adicionar" onClick={() => setShow(false)}>Adicionar</Link></li>
                    <li><Link className={styles.link} href="/pacientes/excluir" onClick={() => setShow(false)}>Excluir</Link></li>
                    <li><Link className={styles.link} href="/pacientes/editar" onClick={() => setShow(false)}>Editar</Link></li>
                  </ul>
                </li>

                <li><Link className={styles.link} href="/consultas" onClick={() => setShow(false)}>Consultas</Link></li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Header Desktop */}
      <header className={styles.header}>
        <div className={styles.logo}>Clínica Saúde Total</div>
        <nav>
          <ul className={styles.ulMenu}>
            <li className={styles.liMenu}>
              <Link className={styles.link} href="/">Home</Link>
            </li>
            
            <li className={styles.liMenu}>
              <Link className={styles.link} href="/especialidades">Especialidades</Link>
              <ul className={styles.ulSubMenu}>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/especialidades/listar">Listar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/especialidades/adicionar">Adicionar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/especialidades/excluir">Excluir</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/especialidades/editar">Editar</Link></li>
              </ul>
            </li>

            <li className={styles.liMenu}>
              <Link className={styles.link} href="/medicos">Médicos</Link>
              <ul className={styles.ulSubMenu}>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/medicos/listar">Listar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/medicos/adicionar">Adicionar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/medicos/excluir">Excluir</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/medicos/editar">Editar</Link></li>
              </ul>
            </li>

            <li className={styles.liMenu}>
              <Link className={styles.link} href="/pacientes">Pacientes</Link>
              <ul className={styles.ulSubMenu}>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/pacientes/listar">Listar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/pacientes/adicionar">Adicionar</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/pacientes/excluir">Excluir</Link></li>
                <li className={styles.liSubMenu}><Link className={styles.link} href="/pacientes/editar">Editar</Link></li>
              </ul>
            </li>

            <li className={styles.liMenu}>
              <Link className={styles.link} href="/consultas">Consultas</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}