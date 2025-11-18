'use client'
import { useState } from 'react';
import styles from './header.module.css';
import Link from 'next/link';

export default function Header() {
    const [show, setShow] = useState(false);

    return (
        <>
            <header className={styles.headerMobile}>
                <button
                    className={`${styles.botaoFechado} ${show ? styles.aberto : ''}`}
                    onClick={() => setShow(!show)}
                    aria-label="Abrir/Fechar menu"
                >
                </button>

            </header>

            {show && (
                <div className={styles.mobileMenu}>
                    <nav>
                        <ul className={styles.ulMenuMobile}>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/">Especialidades</Link></li>
                            <ul>
                                <li><Link href="/">Listar</Link> </li>
                                <li><Link href="/">Adicionar</Link> </li>
                                <li><Link href="/">Editar</Link> </li>
                                <li><Link href="/">Excluir</Link> </li>
                            </ul>
                            <li><Link href="/">Medicos</Link></li>
                            <ul>
                                <li><Link href="/">Listar</Link> </li>
                                <li><Link href="/">Adicionar</Link> </li>
                                <li><Link href="/">Editar</Link> </li>
                                <li><Link href="/">Excluir</Link> </li>
                            </ul>
                            <li><Link href="/">Pacientes</Link></li>
                            <ul>
                                <li><Link href="/">Listar</Link> </li>
                                <li><Link href="/">Adicionar</Link> </li>
                                <li><Link href="/">Editar</Link> </li>
                                <li><Link href="/">Excluir</Link> </li>
                            </ul>
                            <li><Link href="/">Consultas</Link></li>
                            <ul>
                                <li><Link href="/consultas/listar">Listar</Link> </li>
                                <li><Link href="/consultas/agendar">Agendar</Link> </li>
                                <li><Link href="/">Editar Agendamento</Link> </li>
                                <li><Link href="/">Cancelar</Link> </li>
                            </ul>
                        </ul>
                    </nav>

                    <header className={styles.headerSetup}
                    >
                        <div className={styles.logo}>Policlínica Vitalis</div>
                        <nav>
                            <ul>
                                <li><Link href="/">Home</Link> </li>
                                <li><Link href="/">Especialidades</Link> </li>
                                <ul>
                                    <li><Link href="/">Listar</Link> </li>
                                    <li><Link href="/">Adicionar</Link> </li>
                                    <li><Link href="/">Editar</Link> </li>
                                    <li><Link href="/">Excluir</Link> </li>
                                </ul>
                                <li><Link href="/">Medicos</Link> </li>
                                <ul>
                                    <li><Link href="/">Listar</Link> </li>
                                    <li><Link href="/">Adicionar</Link> </li>
                                    <li><Link href="/">Editar</Link> </li>
                                    <li><Link href="/">Excluir</Link> </li>

                                </ul>
                                <li><Link href="#">Pacientes</Link> </li>
                                <ul>
                                    <li><Link href="/">Listar</Link> </li>
                                    <li><Link href="/">Adicionar</Link> </li>
                                    <li><Link href="/">Editar</Link> </li>
                                    <li><Link href="/">Excluir</Link> </li>
                                </ul>

                                <li><Link href="#">Consultas</Link> </li>
                                <ul>
                                    <li><Link href="/consultas/listar">Listar</Link> </li>
                                    <li><Link href="/consultas/agendar">Agendar</Link> </li>
                                    <li><Link href="/">Editar Agendamento</Link> </li>
                                    <li><Link href="/">Cancelar</Link> </li>
                                </ul>
                            </ul>
                        </nav>
                    </header>
                </div>
            )}
        </>
    )
};