<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps(['activeTab'])
const emit = defineEmits(['update:activeTab'])

const isCollapsed = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('sidebar_collapsed')
  if (saved !== null) {
    isCollapsed.value = saved === 'true'
  }
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('sidebar_collapsed', isCollapsed.value)
}

const navigate = (tab) => {
  emit('update:activeTab', tab)
}
</script>

<template>
  <aside id="menu-lateral" :class="['menu-lateral', { collapsed: isCollapsed }]">
    <div class="sidebar-header">
      <h1>Family Hub</h1>
      <button id="toggle-sidebar" class="toggle-btn" title="Recolher Menu" @click="toggleSidebar">
        <svg v-if="isCollapsed" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
    </div>
    <nav>
      <ul>
        <li>
          <a :class="{ active: activeTab === 'dashboard' }" @click="navigate('dashboard')">
            <img class="icon" src="../assets/icons/house-solid-full.svg" alt="Dashboard">
            <span class="menu-text">Dashboard</span>
          </a>
        </li>
        <li>
          <a :class="{ active: activeTab === 'tarefas' }" @click="navigate('tarefas')">
            <img class="icon" src="../assets/icons/list-solid-full.svg" alt="Tarefas">
            <span class="menu-text">Gerenciar Tarefas</span>
          </a>
        </li>
        <li>
          <a :class="{ active: activeTab === 'membros' }" @click="navigate('membros')">
            <img class="icon" src="../assets/icons/members.svg" alt="Membros">
            <span class="menu-text">Membros da Família</span>
          </a>
        </li>
        <li>
          <a :class="{ active: activeTab === 'relatorios' }" @click="navigate('relatorios')">
            <img class="icon" src="../assets/icons/chart-bar-solid-full.svg" alt="Relatórios">
            <span class="menu-text">Relatórios e Análises</span>
          </a>
        </li>
        <li>
          <a :class="{ active: activeTab === 'configuracoes' }" @click="navigate('configuracoes')">
            <img class="icon" src="../assets/icons/gear-solid-full.svg" alt="Configurações">
            <span class="menu-text">Configurações</span>
          </a>
        </li>
      </ul>
      <hr>
      <ul>
        <li>
          <a class="logout-link">
            <img class="icon" src="../assets/icons/solar_exit-bold.svg" alt="Sair">
            <span class="menu-text">Sair</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.menu-lateral a {
  cursor: pointer;
  user-select: none;
}

.logout-link:hover {
  background-color: rgba(245, 101, 101, 0.1);
  color: var(--danger-color);
}

.logout-link:hover .icon {
  filter: invert(40%) sepia(85%) saturate(2250%) hue-rotate(338deg) brightness(97%) contrast(92%);
}
</style>
