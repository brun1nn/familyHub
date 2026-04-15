<template>
  <div class="task-manager-page">
    
    <div class="manager-header">
      <div class="header-titles">
        <h1>Gerenciamento de Tarefas</h1>
        <p>Visualize e edite todos os seus agendamentos em lote.</p>
      </div>
      <div class="header-actions">
        <button class="btn-outline">Voltar ao Calendário</button>
        <button class="btn-solid">+ Nova Tarefa</button>
      </div>
    </div>

    <div class="task-editor-list">
      
      <div v-for="tarefa in mockTarefas" :key="tarefa.id" class="edit-task-card">
        
        <div class="card-top-bar">
          <input type="text" v-model="tarefa.titulo" class="input-title" placeholder="Título da tarefa..." />
          <button class="btn-icon-danger" title="Excluir">🗑️</button>
        </div>
        
        <div class="config-grid">
          
          <div class="input-group">
            <label>Data</label>
            <input type="date" v-model="tarefa.data" class="input-base" />
          </div>

          <div class="input-group time-group">
            <div class="time-col">
              <label>Início</label>
              <input type="time" v-model="tarefa.horaInicio" class="input-base" :disabled="tarefa.diaInteiro" />
            </div>
            <div class="time-col">
              <label>Término</label>
              <input type="time" v-model="tarefa.horaFim" class="input-base" :disabled="tarefa.diaInteiro" />
            </div>
          </div>

          <div class="input-group check-group">
            <label>Dia Todo</label>
            <input type="checkbox" v-model="tarefa.diaInteiro" class="input-checkbox" />
          </div>

          <div class="input-group">
            <label>Localização</label>
            <input type="text" v-model="tarefa.local" class="input-base" placeholder="Onde será?" />
          </div>

          <div class="input-group">
            <label>Videoconferência</label>
            <input type="text" v-model="tarefa.meetLink" class="input-base" placeholder="Link (ex: meet.google...)" />
          </div>

          <div class="input-group">
            <label>Prioridade (Cor)</label>
            <select v-model="tarefa.cor" class="input-base">
              <option value="red">🔴 Vermelho (Alta)</option>
              <option value="yellow">🟡 Amarelo (Média)</option>
              <option value="green">🟢 Verde (Baixa)</option>
            </select>
          </div>
        </div>

        <div class="input-group full-width">
          <label>Descrição / Anotações</label>
          <textarea v-model="tarefa.descricao" class="input-base textarea" placeholder="Adicione detalhes, pautas ou convidados..."></textarea>
        </div>

      </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Lista de tarefas focada no painel de edição
const mockTarefas = ref([
  { 
    id: 1, data: '2026-04-21', titulo: 'Revisão do Projeto Final', 
    diaInteiro: false, horaInicio: '10:00', horaFim: '11:30', 
    local: 'Sala de Reuniões B', meetLink: '', 
    descricao: 'Levar os slides impressos e os protótipos de design.', cor: 'red'
  },
  { 
    id: 2, data: '2026-04-21', titulo: 'Alinhamento de Equipe', 
    diaInteiro: false, horaInicio: '14:00', horaFim: '15:00', 
    local: '', meetLink: 'meet.google.com/abc-defg-hij', 
    descricao: 'Sincronização semanal de tarefas da sprint.', cor: 'yellow'
  },
  { 
    id: 3, data: '2026-04-25', titulo: 'Feriado / Viagem', 
    diaInteiro: true, horaInicio: '', horaFim: '', 
    local: 'Litoral', meetLink: '', 
    descricao: 'Descanso e desconexão.', cor: 'green' 
  }
]);
</script>

<style scoped>
.task-manager-page {
  --bg-page: #0a0a0a;
  --bg-card: rgba(255, 255, 255, 0.03);
  --border-card: rgba(255, 255, 255, 0.06);
  --text-main: #ffffff;
  --text-muted: #888888;
  --accent-green: #56d364;
  --danger-red: #ff5f56;

  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  padding: 40px 20px;
}

/* HEADER DA PÁGINA */
.manager-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--border-card);
  padding-bottom: 20px;
}

.header-titles h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.header-titles p {
  color: var(--text-muted);
  margin: 0;
  font-size: 1rem;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-solid, .btn-outline {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-solid {
  background: var(--accent-green);
  color: #121212;
  border: none;
}
.btn-solid:hover { background: #2bda56; transform: translateY(-2px); }

.btn-outline {
  background: transparent;
  color: var(--text-main);
  border: 1px solid var(--border-card);
}
.btn-outline:hover { background: rgba(255,255,255,0.05); }

/* LISTA DE CARDS DE EDIÇÃO */
.task-editor-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.edit-task-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 24px;
  transition: 0.2s;
}
.edit-task-card:hover { border-color: rgba(255, 255, 255, 0.15); }

.card-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.input-title {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-main);
  font-size: 1.4rem;
  font-weight: 600;
  padding: 5px 0;
  transition: 0.2s;
}
.input-title:focus { outline: none; border-bottom-color: var(--accent-green); }

.btn-icon-danger {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.5;
  transition: 0.2s;
}
.btn-icon-danger:hover { opacity: 1; transform: scale(1.1); }

/* GRID DE INPUTS */
.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group.full-width {
  grid-column: 1 / -1;
}

.input-group label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

.input-base {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  color: white;
  padding: 12px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: 0.2s;
  width: 100%;
}
.input-base:focus { outline: none; border-color: var(--accent-green); background: rgba(0,0,0,0.5);}
.input-base:disabled { opacity: 0.3; cursor: not-allowed; }

.time-group {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
.time-col { flex: 1; display: flex; flex-direction: column; gap: 8px; }

.check-group {
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding-top: 25px; /* Alinha visualmente com os inputs textuais */
}
.input-checkbox {
  width: 20px;
  height: 20px;
  accent-color: var(--accent-green);
  cursor: pointer;
}

.textarea {
  resize: vertical;
  min-height: 80px;
}
</style>