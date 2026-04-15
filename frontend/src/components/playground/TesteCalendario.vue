<template>
  <div class="task-calendar-module">
    
    <div class="calendar-core-box">
      <div class="calendar-controls">
        <div class="month-display">
          <span class="current-month">{{ nomeMes }}</span>
          <span class="current-year">{{ anoAtual }}</span>
        </div>
        
        <div class="action-group">
          <div class="nav-btns">
            <button @click="mesAnterior" class="btn-nav">&lt;</button>
            <button @click="proximoMes" class="btn-nav">&gt;</button>
          </div>
          <button @click="irParaHoje" class="btn-today">Hoje</button>
        </div>
      </div>

      <div class="calendar-grid-container">
        <div class="weekdays-grid">
          <div v-for="dia in diasDaSemana" :key="dia" class="weekday">{{ dia }}</div>
        </div>
        
        <div class="days-grid">
          <div 
            v-for="dia in diasCalendario" 
            :key="dia.dataCompleta" 
            class="day-box"
            :class="[dia.classes, { 'selected': diaSelecionado === dia.dataCompleta }]"
            @click="selecionarDia(dia.dataCompleta)"
          >
            <span class="day-num">{{ dia.numero }}</span>
            <div v-if="dia.temTarefa" class="task-dots">
              <span v-for="cor in dia.coresDasTarefas" :key="cor" class="dot" :class="cor"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="scheduled-sidebar">
      <div class="panel-header">
        <div class="panel-title-group">
          <h2>Agendado</h2>
          <p class="selected-date-text">{{ formatarDataLonga(diaSelecionado) }}</p>
        </div>
        <div class="panel-actions">
          <button class="btn-icon" @click="irParaHoje" title="Ir para Hoje">📅</button>
          <button class="btn-icon" @click="diaAnterior">&lt;</button>
          <button class="btn-icon" @click="proximoDia">&gt;</button>
        </div>
      </div>

      <div class="tasks-scroll-area">
        <div v-if="tarefasDoDia.length > 0" class="tasks-list">
          <div 
            v-for="tarefa in tarefasDoDia" 
            :key="tarefa.id" 
            class="task-card"
            :class="{ 'completed': tarefa.concluida }"
          >
            <label class="custom-checkbox-wrapper">
              <input type="checkbox" v-model="tarefa.concluida" class="task-checkbox-input" />
              <span class="custom-checkbox" :class="tarefa.cor">
                <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </label>
            
            <div class="task-content">
              <h4 class="task-title">{{ tarefa.titulo }}</h4>
              <div class="task-meta-grid">
                <span class="meta-item time">
                  🕒 {{ tarefa.diaInteiro ? 'Dia Todo' : `${tarefa.horaInicio} - ${tarefa.horaFim}` }}
                </span>
                <span v-if="tarefa.local" class="meta-item">📍 {{ tarefa.local }}</span>
                <span v-if="tarefa.meetLink" class="meta-item">📹 Videochamada</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="tasks-empty-state">
          <p>Nenhuma tarefa agendada para este dia.</p>
        </div>
      </div>

      <div class="sidebar-footer">
        <button class="btn-action btn-primary">+ Adicionar Tarefa</button>
        <button class="btn-action btn-secondary" @click="acionarEdicao">
          ✏️ Editar Tarefas
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const mockTarefas = ref([
  { id: 1, data: '2026-04-21', titulo: 'Revisão do Projeto Final', diaInteiro: false, horaInicio: '10:00', horaFim: '11:30', local: 'Sala B', meetLink: '', cor: 'red', concluida: false },
  { id: 2, data: '2026-04-21', titulo: 'Alinhamento de Equipe', diaInteiro: false, horaInicio: '14:00', horaFim: '15:00', local: '', meetLink: 'meet.google.com/abc', cor: 'yellow', concluida: false },
  { id: 3, data: '2026-04-21', titulo: 'Academia', diaInteiro: false, horaInicio: '18:30', horaFim: '19:30', local: 'Smart Fit', meetLink: '', cor: 'green', concluida: true }
]);

function formatarIso(dataObj) {
  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const dia = String(dataObj.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

const dataHoje = new Date(); 
const hojeString = formatarIso(dataHoje);
const dataVisao = ref(new Date(2026, 3, 1)); 
const diaSelecionado = ref('2026-04-21'); 

const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const feriados = ['2026-04-03', '2026-04-21'];

const nomeMes = computed(() => dataVisao.value.toLocaleString('pt-BR', { month: 'long' }));
const anoAtual = computed(() => dataVisao.value.getFullYear());
const tarefasDoDia = computed(() => mockTarefas.value.filter(t => t.data === diaSelecionado.value));

const diasCalendario = computed(() => {
  const mes = dataVisao.value.getMonth();
  const ano = dataVisao.value.getFullYear();
  const dias = [];
  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
  const ultimoDiaMesAnt = new Date(ano, mes, 0).getDate();

  for (let i = primeiroDiaSemana - 1; i >= 0; i--) {
    const d = new Date(ano, mes - 1, ultimoDiaMesAnt - i);
    dias.push({ numero: d.getDate(), dataCompleta: formatarIso(d), classes: 'outside', temTarefa: false });
  }
  
  for (let i = 1; i <= ultimoDiaMes; i++) {
    const d = new Date(ano, mes, i);
    const dataIso = formatarIso(d);
    const tarefasNesteDia = mockTarefas.value.filter(t => t.data === dataIso);
    const temTarefa = tarefasNesteDia.length > 0;
    
    dias.push({
      numero: i,
      dataCompleta: dataIso,
      classes: { 'today': dataIso === hojeString, 'holiday': feriados.includes(dataIso), 'has-tasks': temTarefa },
      temTarefa: temTarefa,
      coresDasTarefas: [...new Set(tarefasNesteDia.map(t => t.cor))]
    });
  }
  
  const sobra = 42 - dias.length;
  for (let i = 1; i <= sobra; i++) {
    const d = new Date(ano, mes + 1, i);
    dias.push({ numero: d.getDate(), dataCompleta: formatarIso(d), classes: 'outside', temTarefa: false });
  }
  return dias;
});

function selecionarDia(data) { 
  if (!data) return;
  diaSelecionado.value = data; 
  const [ano, mes] = data.split('-').map(Number);
  if (mes - 1 !== dataVisao.value.getMonth() || ano !== dataVisao.value.getFullYear()) {
    dataVisao.value = new Date(ano, mes - 1, 1);
  }
}
function mesAnterior() { const atual = dataVisao.value; dataVisao.value = new Date(atual.getFullYear(), atual.getMonth() - 1, 1); }
function proximoMes() { const atual = dataVisao.value; dataVisao.value = new Date(atual.getFullYear(), atual.getMonth() + 1, 1); }
function irParaHoje() { const hoje = new Date(); dataVisao.value = new Date(hoje.getFullYear(), hoje.getMonth(), 1); diaSelecionado.value = formatarIso(hoje); }
function diaAnterior() { if (!diaSelecionado.value) return; const [ano, mes, dia] = diaSelecionado.value.split('-').map(Number); selecionarDia(formatarIso(new Date(ano, mes - 1, dia - 1))); }
function proximoDia() { if (!diaSelecionado.value) return; const [ano, mes, dia] = diaSelecionado.value.split('-').map(Number); selecionarDia(formatarIso(new Date(ano, mes - 1, dia + 1))); }
function formatarDataLonga(dataStr) {
  if (!dataStr) return "";
  const [ano, mes, dia] = dataStr.split('-').map(Number);
  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}
// Define que este componente pode emitir um evento chamado 'editar'
const emit = defineEmits(['editar']);

function acionarEdicao() {
  emit('editar');
}
</script>

<style scoped>
.task-calendar-module {
  --bg-module-base: #121212; --bg-panel-overlay: rgba(18, 18, 18, 0.8); --bg-day-base: rgba(255, 255, 255, 0.03); --bg-day-hover: rgba(255, 255, 255, 0.08);
  --text-main: #ffffff; --text-muted: #888888; 
  --accent-green: #56d364; --accent-green-alpha: rgba(86, 211, 100, 0.1); 
  --holiday-red: #ff5f56; --task-yellow: #ffbd2e;
  
  display: flex; gap: 24px; width: 100%; max-width: 1200px; height: 650px; color: var(--text-main); font-family: 'Inter', sans-serif;
}

/* ÁREA DO CALENDÁRIO */
.calendar-core-box { flex: 2; background: var(--bg-panel-overlay); border-radius: 24px; padding: 30px; backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; overflow: hidden; }
.calendar-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.month-display { display: flex; align-items: center; gap: 12px; font-size: 1.4rem; min-width: 200px; }
.current-month { font-weight: 600; text-transform: capitalize; }
.current-year { color: var(--text-muted); font-weight: 400; }
.action-group { display: flex; align-items: center; gap: 16px; }
.nav-btns { display: flex; gap: 4px; }
.btn-nav, .btn-today, .btn-icon { background: rgba(255, 255, 255, 0.05); border: none; color: white; cursor: pointer; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
.btn-nav { width: 32px; height: 32px; }
.btn-nav:hover, .btn-today:hover, .btn-icon:hover { background: rgba(255, 255, 255, 0.15); }
.btn-today { border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 20px; font-weight: 500; }

.calendar-grid-container { display: flex; flex-direction: column; flex-grow: 1; }
.weekdays-grid { display: grid; grid-template-columns: repeat(7, 1fr); margin-bottom: 15px; }
.weekday { text-align: center; color: var(--text-muted); font-size: 0.85rem; font-weight: 500; }
.days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; flex-grow: 1; }
.day-box { background: var(--bg-day-base); border-radius: 14px; min-height: 80px; position: relative; cursor: pointer; border: 2px solid transparent; transition: all 0.2s ease; padding: 10px; }
.day-box:not(.outside):hover { background: var(--bg-day-hover); transform: translateY(-2px); }
.day-box.selected { border-color: var(--accent-green); background: var(--accent-green-alpha); }
.day-num { font-size: 1rem; color: #cccccc; font-weight: 500; }
.day-box.outside { opacity: 0.25; cursor: pointer; }
.day-box.outside:hover { background: var(--bg-day-hover); }
.day-box.today .day-num { color: var(--accent-green); font-weight: 700; }
.day-box.holiday .day-num { color: var(--holiday-red); font-weight: 700; }
.task-dots { position: absolute; bottom: 10px; left: 10px; display: flex; gap: 4px; }
.dot { width: 6px; height: 6px; border-radius: 50%; }
.dot.red { background-color: var(--holiday-red); }
.dot.yellow { background-color: var(--task-yellow); }
.dot.green { background-color: var(--accent-green); }

/* PAINEL LATERAL */
.scheduled-sidebar { flex: 1; min-width: 340px; max-width: 400px; background: var(--bg-panel-overlay); border-radius: 24px; padding: 30px; backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; }
.panel-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
.panel-title-group h2 { font-size: 1.2rem; font-weight: 600; margin: 0 0 4px 0; }
.selected-date-text { color: var(--text-muted); font-size: 0.9rem; margin: 0; text-transform: capitalize; }
.panel-actions { display: flex; gap: 4px; }
.btn-icon { width: 30px; height: 30px; font-size: 0.9rem; }

.tasks-scroll-area { flex-grow: 1; overflow-y: auto; margin-bottom: 20px; padding-right: 5px; }
.tasks-scroll-area::-webkit-scrollbar { width: 4px; }
.tasks-scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
.tasks-empty-state { display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; color: var(--text-muted); font-size: 0.95rem; border: 1px dashed rgba(255, 255, 255, 0.1); border-radius: 16px; }

.tasks-list { display: flex; flex-direction: column; gap: 12px; }
.task-card { background: var(--bg-day-base); border-radius: 12px; padding: 16px; display: flex; gap: 14px; position: relative; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.02); transition: all 0.2s ease; }
.task-card:hover { background: var(--bg-day-hover); }

/* CHECKBOX */
.custom-checkbox-wrapper { display: flex; align-items: flex-start; padding-top: 2px; cursor: pointer; flex-shrink: 0;}
.task-checkbox-input { display: none; }
.custom-checkbox { width: 22px; height: 22px; border: 2px solid var(--text-muted); border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
.custom-checkbox.red { border-color: var(--holiday-red); }
.custom-checkbox.yellow { border-color: var(--task-yellow); }
.custom-checkbox.green { border-color: var(--accent-green); }
.check-icon { width: 14px; height: 14px; color: #121212; stroke-dasharray: 24; stroke-dashoffset: 24; transition: 0.3s ease-in-out; }
.task-checkbox-input:checked + .custom-checkbox { background: var(--accent-green); border-color: var(--accent-green); }
.task-checkbox-input:checked + .custom-checkbox.red { background: var(--holiday-red); border-color: var(--holiday-red); }
.task-checkbox-input:checked + .custom-checkbox.yellow { background: var(--task-yellow); border-color: var(--task-yellow); }
.task-checkbox-input:checked + .custom-checkbox .check-icon { stroke-dashoffset: 0; }

.task-content { flex-grow: 1; display: flex; flex-direction: column; gap: 6px; }
.task-title { margin: 0; font-size: 1rem; font-weight: 600; color: var(--text-main); transition: 0.2s; }
.task-meta-grid { display: flex; flex-wrap: wrap; gap: 8px; row-gap: 4px; }
.meta-item { font-size: 0.75rem; color: var(--text-muted); font-weight: 500;}
.task-card.completed { opacity: 0.4; }
.task-card.completed .task-title { text-decoration: line-through; }

/* RODAPÉ E BOTÕES (ATUALIZADOS) */
.sidebar-footer { display: flex; flex-direction: column; gap: 12px; margin-top: auto; }

/* Classe base para que ambos os botões tenham o mesmo tamanho, fonte e animação */
.btn-action {
  width: 100%;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Estilo do Botão Principal (Adicionar) */
.btn-primary {
  background: var(--accent-green);
  color: #121212;
  box-shadow: 0 4px 15px rgba(86, 211, 100, 0.2); 
}
.btn-primary:hover {
  background: #2bda56; 
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(86, 211, 100, 0.3);
}

/* Estilo do Botão Secundário (Editar) - Mesmo formato, cor elegante */
.btn-secondary {
  background: rgba(255, 255, 255, 0.08); /* Cinza translúcido */
  color: var(--text-main);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15); 
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}
</style>