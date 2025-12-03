"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function AgendarConsulta() {
  const [form, setForm] = useState({
    idMedico: "",
    idPaciente: "",
    data: "",
    hora: "",
    tipo: "",
  });

  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consultasAgendadas, setConsultasAgendadas] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");

  const horariosDisponiveis = [
    "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  useEffect(() => {
    fetch("https://api.clinica.dev.vilhena.ifro.edu.br/medicos")
      .then((res) => res.json())
      .then((data) => setMedicos(data))
      .catch((err) => console.error("Erro ao carregar médicos:", err));

    fetch("https://api.clinica.dev.vilhena.ifro.edu.br/pacientes")
      .then((res) => res.json())
      .then((data) => setPacientes(data))
      .catch((err) => console.error("Erro ao carregar pacientes:", err));

    carregarConsultas();
  }, []);

  const carregarConsultas = () => {
    fetch("https://api.clinica.dev.vilhena.ifro.edu.br/consultas?matricula=2024103030040")
      .then((res) => res.json())
      .then((data) => setConsultasAgendadas(data))
      .catch((err) => console.error("Erro ao carregar consultas:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "data" && value) {
      setSelectedDate(value);
      setCurrentMonth(new Date(value));
    }
  };

  const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setForm(prev => ({ ...prev, data: formattedDate }));
    setSelectedDate(formattedDate);
  };

  const handleHorarioSelect = (horario) => {
    setForm(prev => ({ ...prev, hora: horario }));
  };

  const handleClearDate = () => {
    setForm(prev => ({ ...prev, data: "" }));
    setSelectedDate("");
  };

  const handleToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setForm(prev => ({ ...prev, data: today }));
    setSelectedDate(today);
    setCurrentMonth(new Date());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const camposObrigatorios = ['idMedico', 'idPaciente', 'data', 'hora', 'tipo'];
    const camposVazios = camposObrigatorios.filter(campo => !form[campo]);
    
    if (camposVazios.length > 0) {
      alert(`Por favor, preencha todos os campos: ${camposVazios.join(', ')}`);
      setLoading(false);
      return;
    }

    try {
      const payload = {
        idPaciente: Number(form.idPaciente),
        idMedico: Number(form.idMedico),
        data: form.data,
        hora: form.hora,
        tipo: form.tipo === "particular" ? "Particular" : "Plano de Saúde",
        matricula: "2024103030040"
      };

      const res = await fetch("https://api.clinica.dev.vilhena.ifro.edu.br/consultas", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Consulta agendada com sucesso! ID: " + result.id);
        carregarConsultas();
        setForm({
          idMedico: "",
          idPaciente: "",
          data: "",
          hora: "",
          tipo: "",
        });
        setSelectedDate("");
      } else {
        alert(`Erro ao agendar: ${result.error || result.message || 'Erro desconhecido'}`);
      }
    } catch (err) {
      console.error("Erro na conexão:", err);
      alert("Erro na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const Calendario = () => {
    const today = new Date();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const navigateMonth = (direction) => {
      setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + direction, 1));
    };

    const getDaysArray = () => {
      const days = [];
      
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push(new Date(year, month - 1, prevMonthLastDay - i));
      }
      
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }
      
      const totalCells = 42; 
      const nextMonthDays = totalCells - days.length;
      for (let day = 1; day <= nextMonthDays; day++) {
        days.push(new Date(year, month + 1, day));
      }
      
      return days;
    };

    const isToday = (date) => {
      if (!date) return false;
      return date.toDateString() === today.toDateString();
    };

    const isSelected = (date) => {
      if (!date) return false;
      return date.toISOString().split('T')[0] === selectedDate;
    };

    const isCurrentMonth = (date) => {
      return date.getMonth() === month;
    };

    const monthNames = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];

    const dayNames = ["D", "S", "T", "Q", "Q", "S", "S"];

    const formatDateDisplay = (date) => {
      if (!date) return "dd/mm/aaaa";
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}/${date.getFullYear()}`;
    };

    return (
      <div className={styles.calendario}>
        <div className={styles.dataSelecionada}>
          {formatDateDisplay(selectedDate ? new Date(selectedDate) : null)}
        </div>
        
        <div className={styles.calendarioHeader}>
          <h3 className={styles.calendarioTitulo}>
            {monthNames[month]} de {year}
          </h3>
          <div className={styles.calendarioNav}>
            <button onClick={() => navigateMonth(-1)}>‹</button>
            <button onClick={() => navigateMonth(1)}>›</button>
          </div>
        </div>

        <div className={styles.calendarioDiasSemana}>
          {dayNames.map(day => (
            <div key={day} className={styles.diaSemana}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.calendarioDias}>
          {getDaysArray().map((date, index) => (
            <button
              key={index}
              className={`${styles.dia} ${
                !isCurrentMonth(date) ? styles.diaOutroMes : ""
              } ${isToday(date) ? styles.diaHoje : ""} ${
                isSelected(date) ? styles.diaSelecionado : ""
              }`}
              onClick={() => handleDateSelect(date)}
            >
              {date.getDate()}
            </button>
          ))}
        </div>

        <div className={styles.calendarioAcoes}>
          <button className={styles.botaoLimpar} onClick={handleClearDate}>
            Limpar
          </button>
          <button className={styles.botaoHoje} onClick={handleToday}>
            Hoje
          </button>
        </div>
      </div>
    );
  };

  const SeletorHorarios = () => {
    return (
      <div className={styles.seletorHorarios}>
        <h3 className={styles.horariosTitulo}>Selecione uma hora</h3>
        <div className={styles.listaHorarios}>
          {horariosDisponiveis.map(horario => (
            <button
              key={horario}
              className={`${styles.horarioItem} ${
                form.hora === horario ? styles.horarioSelecionado : ""
              }`}
              onClick={() => handleHorarioSelect(horario)}
              type="button"
            >
              {horario}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const medicoSelecionado = medicos.find(m => m.id === Number(form.idMedico));
  const pacienteSelecionado = pacientes.find(p => p.id === Number(form.idPaciente));

  return (
    <section className={styles.agendar}>
      <h1 className={styles.titulo}>Agendar Consulta</h1>
      <p className={styles.subtitulo}>Matrícula: 2024103030040</p>
      
      <div className={styles.gridContainer}>
        <div className={styles.colunaFormulario}>
          <form onSubmit={handleSubmit} className={styles.formAgendar}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Selecione um paciente</label>
              <select
                name="idPaciente"
                value={form.idPaciente}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Selecione um paciente</option>
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nome} - {p.email || p.telefone || ''}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Selecione um médico</label>
              <select
                name="idMedico"
                value={form.idMedico}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Selecione um médico</option>
                {medicos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nome} - {m.especialidade}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tipo de Atendimento</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Selecione o tipo</option>
                <option value="particular">Particular</option>
                <option value="plano_saude">Plano de Saúde</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className={styles.botaoAgendar}
            >
              {loading ? (
                <>
                  <span className={styles.loadingSpinner}></span>
                  Agendando...
                </>
              ) : (
                "Agendar Consulta"
              )}
            </button>
          </form>
        </div>

        <div className={styles.colunaCalendario}>
          <Calendario />
          <SeletorHorarios />
        </div>
      </div>

      {consultasAgendadas.length > 0 && (
        <div className={styles.listaConsultas}>
          <h2 className={styles.listaTitulo}>
            Consultas Agendadas
            <span className={styles.contador}>{consultasAgendadas.length}</span>
          </h2>
          <div className={styles.consultasList}>
            {consultasAgendadas.map((consulta) => (
              <div key={consulta.id} className={styles.consultaItem}>
                <div className={styles.consultaHeader}>
                  <div className={styles.consultaId}>#{consulta.id}</div>
                  <div className={styles.consultaStatus}>Agendada</div>
                </div>
                <div className={styles.consultaInfo}>
                  <div className={styles.infoLinha}>
                    <span className={styles.textoDestaque}>Paciente:</span>
                    <span className={styles.textoValor}>{consulta.paciente}</span>
                  </div>
                  <div className={styles.infoLinha}>
                    <span className={styles.textoDestaque}>Médico:</span>
                    <span className={styles.textoValor}>{consulta.medico}</span>
                  </div>
                  <div className={styles.infoLinha}>
                    <span className={styles.textoDestaque}>Data:</span>
                    <span className={styles.textoValor}>{consulta.data} às {consulta.hora}</span>
                  </div>
                  <div className={styles.infoLinha}>
                    <span className={styles.textoDestaque}>Tipo:</span>
                    <span className={`${styles.textoValor} ${consulta.tipo === 'Particular' ? styles.tipoParticular : styles.tipoPlanoSaude}`}>
                      {consulta.tipo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}