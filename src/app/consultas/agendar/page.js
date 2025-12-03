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
  }, []);

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

  // Componente Calendário integrado
  const CalendarioCompacto = () => {
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
      
      // Dias do mês anterior
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push(new Date(year, month - 1, prevMonthLastDay - i));
      }
      
      // Dias do mês atual
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }
      
      // Dias do próximo mês
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

    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    const formatDateDisplay = (date) => {
      if (!date) return "dd/mm/aaaa";
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}/${date.getFullYear()}`;
    };

    return (
      <div className={styles.calendarioCompacto}>
        <div className={styles.dataSelecionada}>
          {formatDateDisplay(selectedDate ? new Date(selectedDate) : null)}
        </div>
        
        <div className={styles.calendarioHeader}>
          <h3 className={styles.calendarioTitulo}>
            {monthNames[month]} de {year}
          </h3>
          <div className={styles.calendarioNav}>
            <button type="button" onClick={() => navigateMonth(-1)}>‹</button>
            <button type="button" onClick={() => navigateMonth(1)}>›</button>
          </div>
        </div>

        <div className={styles.calendarioDiasSemana}>
          {dayNames.map((day) => (
            <div key={day} className={styles.diaSemana}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.calendarioDias}>
          {getDaysArray().map((date, index) => (
            <button
              key={index}
              type="button"
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
          <button type="button" className={styles.botaoLimpar} onClick={handleClearDate}>
            Limpar
          </button>
          <button type="button" className={styles.botaoHoje} onClick={handleToday}>
            Hoje
          </button>
        </div>
      </div>
    );
  };

  // Componente Seletor de Horários integrado
  const SeletorHorariosCompacto = () => {
    return (
      <div className={styles.seletorHorariosCompacto}>
        <h3 className={styles.horariosTitulo}>Selecione uma hora</h3>
        <div className={styles.listaHorarios}>
          {horariosDisponiveis.map(horario => (
            <button
              key={horario}
              type="button"
              className={`${styles.horarioItem} ${
                form.hora === horario ? styles.horarioSelecionado : ""
              }`}
              onClick={() => handleHorarioSelect(horario)}
            >
              {horario}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className={styles.agendar}>
      <h1 className={styles.titulo}>Agendar Consulta</h1>
      
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
                    {p.nome}
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

            {/* Calendário e Horários dentro do formulário */}
            <div className={`${styles.formGroup} ${styles.calendarioHorario}`}>
              <CalendarioCompacto />
              <SeletorHorariosCompacto />
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
      </div>
    </section>
  );
}