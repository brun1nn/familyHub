<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'

// Navegação simplificada - apenas para testar a Sidebar
const activeTab = ref('dashboard')
</script>

<template>
  <div class="layout-principal">
    <Sidebar v-model:activeTab="activeTab" />

    <main class="conteudo-principal">
      <header>
        <h1>{{ activeTab.toUpperCase() }}</h1>
        <p>Aguardando protótipo do Figma e integração com API.</p>
      </header>
      
      <div class="placeholder-content">
        <p>Status do Backend: Configurando...</p>
      </div>
    </main>
  </div>
</template>

<style>
/* Seus estilos globais continuam valendo via main.js */
.placeholder-content {
  margin-top: 2rem;
  padding: 2rem;
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  text-align: center;
  color: var(--text-secondary);
}
</style>
