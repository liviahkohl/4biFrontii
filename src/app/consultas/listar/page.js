'use client'
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function ListarConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.clinica.dev.vilhena.ifro.edu.br/consultas?matricula=2024103030040');
        
        if (!response.ok) {
          throw new Error('Erro ao carregar consultas');
        }
        
        const data = await response.json();
        setConsultas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultas();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando consultas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Erro: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Consultas Agendadas</h1>
      
      {consultas.length === 0 ? (
        <div className={styles.empty}>Nenhuma consulta agendada</div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.colPaciente}>Paciente</th>
                <th className={styles.colMedico}>Médico</th>
                <th className={styles.colEspecialidade}>Especialidade</th>
                <th className={styles.colData}>Data</th>
                <th className={styles.colHora}>Hora</th>
                <th className={styles.colTipo}>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((consulta, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.colPaciente} data-label="Paciente:">{consulta.paciente}</td>
                  <td className={styles.colMedico} data-label="Médico:">{consulta.medico}</td>
                  <td className={styles.colEspecialidade} data-label="Especialidade:">{consulta.especialidade}</td>
                  <td className={styles.colData} data-label="Data:">{consulta.data}</td>
                  <td className={styles.colHora} data-label="Hora:">{consulta.hora}</td>
                  <td className={styles.colTipo} data-label="Tipo:">
                    <span className={styles.badge}>{consulta.tipo}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}