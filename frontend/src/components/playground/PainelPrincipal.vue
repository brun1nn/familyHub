<template>
  <div class="painel-container">
    <header class="app-header">
      <div class="logo">Meu App de Tarefas</div>
    </header>

    <main class="conteudo-principal">
      <TesteCalendario @editar="rolarParaEditor" />
      
      <div ref="sessaoEditor" class="espacador-editor">
        <TesteEdicaoTarefas />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TesteCalendario from './TesteCalendario.vue';
import TesteEdicaoTarefas from './TesteEdicaoTarefas.vue';

// Referência para o elemento do editor
const sessaoEditor = ref(null);

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
}

.conteudo-principal {
  display: flex;
  flex-direction: column; /* FORÇA UM EMBAIXO DO OUTRO */
  align-items: center;
  gap: 60px; /* Espaço generoso entre o calendário e o editor */
  padding: 40px 20px;
}

.espacador-editor {
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 60px;
}

.app-header {
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
</style>