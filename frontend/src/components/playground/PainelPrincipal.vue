<template>
  <LoginView v-if="!usuarioLogado" @login-sucesso="handleLoginSucesso" />
  
  <div v-else class="painel-container">
    <header class="app-header">
      <div class="header-conteudo">
        <div class="logo">🏠 Meu App de Tarefas</div>
        
        <nav class="nav-botoes">
          <button 
            :class="{ ativo: visaoAtual === 'tarefas' }" 
            @click="visaoAtual = 'tarefas'"
          >
            🗓️ Tarefas
          </button>
          <button 
            :class="{ ativo: visaoAtual === 'membros' }" 
            @click="visaoAtual = 'membros'"
          >
            👨‍👩‍👧‍👦 Membros
          </button>
          <button class="btn-placeholder">📊 Relatórios</button>
          <button class="btn-placeholder">⚙️ Configurações</button>
        </nav>
      </div>
    </header>
    
    <main class="conteudo-principal">

      <TesteMembrosFamilia v-if="visaoAtual === 'membros'" />

      <div v-else-if="visaoAtual === 'tarefas'" class="tela-tarefas">
        <TesteCalendario @editar="rolarParaEditor" />
        
        <div ref="sessaoEditor" class="espacador-editor">
          <TesteEdicaoTarefas />
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginView from '../LoginView.vue';
import TesteMembrosFamilia from './TesteMembrosFamilia.vue';
import TesteCalendario from './TesteCalendario.vue';
import TesteEdicaoTarefas from './TesteEdicaoTarefas.vue';

// Estado que controla qual página está visível
// Começamos com 'tarefas' por padrão
const visaoAtual = ref('tarefas');

// Referência para o elemento do editor
const sessaoEditor = ref(null);

// Verificar se existe sessão no localStorage
const usuarioLogado = ref(!!localStorage.getItem('user_session'));

const handleLoginSucesso = () => {
  usuarioLogado.value = true;
  visaoAtual.value = 'dashboard';
};

// Função que faz a rolagem suave até o editor
function rolarParaEditor() {
  if (sessaoEditor.value) {
    sessaoEditor.value.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<style scoped>
.painel-container {
  min-height: 100vh;
  background-color: #0a0a0a;
  color: white;
  font-family: 'Inter', sans-serif;
}

.app-header {
  padding: 0 40px;
  height: 70px;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-conteudo {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: -0.5px;
}

.nav-botoes {
  display: flex;
  gap: 10px;
}

.nav-botoes button {
  background: transparent;
  border: none;
  color: #888;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-botoes button:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-botoes button.ativo {
  background: rgba(86, 211, 100, 0.1);
  color: #56d364;
}

.btn-placeholder {
  opacity: 0.4;
  cursor: not-allowed !important;
}

.conteudo-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
}

.tela-tarefas {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

.espacador-editor {
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 60px;
}
</style>