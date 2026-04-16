<script setup>
import { ref, reactive, computed } from 'vue';

const emit = defineEmits(['auth-sucesso']);

const modo = ref('login'); // 'login' ou 'cadastro'
const erro = ref('');
const familyCode = ref(''); // Para quem está sendo convidado

const form = reactive({
  nome: '',
  email: '',
  senha: '',
  nomeFamilia: ''
});

// Simulação de Banco de Dados no LocalStorage
const DB = {
  getUsers: () => JSON.parse(localStorage.getItem('app_users') || '[]'),
  saveUser: (user) => {
    const users = DB.getUsers();
    users.push(user);
    localStorage.setItem('app_users', JSON.stringify(users));
  },
  saveFamily: (family) => {
    const families = JSON.parse(localStorage.getItem('app_families') || '[]');
    families.push(family);
    localStorage.setItem('app_families', JSON.stringify(families));
  }
};

const executarAcao = () => {
  erro.value = '';
  
  if (modo.value === 'cadastro') {
    // 1. Criar Usuário (Líder)
    const novoUsuario = {
      id: Date.now(),
      nome: form.nome,
      email: form.email,
      senha: form.senha,
      role: 'admin'
    };
    
    // 2. Criar Família
    const novaFamilia = {
      id: `FAM-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      nome: form.nomeFamilia,
      liderId: novoUsuario.id,
      membros: [novoUsuario.id]
    };

    DB.saveUser(novoUsuario);
    DB.saveFamily(novaFamilia);
    
    finalizar(novoUsuario, novaFamilia.id);
  } else {
    // Lógica de Login Simples
    const user = DB.getUsers().find(u => u.email === form.email && u.senha === form.senha);
    if (user) {
      finalizar(user);
    } else {
      erro.value = "Usuário não encontrado ou senha incorreta.";
    }
  }
};

const finalizar = (user, familyId = null) => {
  localStorage.setItem('session_user', JSON.stringify(user));
  if(familyId) localStorage.setItem('current_family_id', familyId);
  emit('auth-sucesso', user);
};
</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <h2>{{ modo === 'login' ? 'Bem-vindo de volta!' : 'Começar Nova Família' }}</h2>
      
      <div class="tabs">
        <button :class="{ active: modo === 'login' }" @click="modo = 'login'">Login</button>
        <button :class="{ active: modo === 'cadastro' }" @click="modo = 'cadastro'">Sou Líder</button>
      </div>

      <form @submit.prevent="executarAcao" class="form-grid">
        <div v-if="modo === 'cadastro'" class="input-stack">
          <label>Seu Nome</label>
          <input v-model="form.nome" type="text" placeholder="Ex: Rodrigo" required>
        </div>

        <div v-if="modo === 'cadastro'" class="input-stack">
          <label>Nome da Família</label>
          <input v-model="form.nomeFamilia" type="text" placeholder="Ex: Família Silva" required>
        </div>

        <div class="input-stack">
          <label>E-mail</label>
          <input v-model="form.email" type="email" placeholder="email@exemplo.com" required>
        </div>

        <div class="input-stack">
          <label>Senha</label>
          <input v-model="form.senha" type="password" placeholder="••••••••" required>
        </div>

        <p v-if="erro" class="error">{{ erro }}</p>

        <button type="submit" class="btn-primary">
          {{ modo === 'login' ? 'Entrar' : 'Criar Grupo Familiar' }}
        </button>
      </form>

      <div class="invite-section" v-if="modo === 'login'">
        <p>Recebeu um código de convite?</p>
        <div class="invite-input">
          <input v-model="familyCode" placeholder="CÓDIGO-123">
          <button @click="unirAFamilia" class="btn-secondary">Unir-se</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mantendo seu padrão de cores */
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0a0a0a;
}

.auth-card {
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 20px;
  width: 100%;
  max-width: 450px;
  border: 1px solid #333;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
  background: #222;
  padding: 5px;
  border-radius: 10px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  background: transparent;
  border: none;
  color: #888;
  cursor: pointer;
  border-radius: 8px;
  transition: 0.3s;
}

.tabs button.active {
  background: #333;
  color: #56d364;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-stack {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label { color: #888; font-size: 0.8rem; }

input {
  background: #0a0a0a;
  border: 1px solid #333;
  padding: 12px;
  border-radius: 8px;
  color: white;
}

input:focus { border-color: #56d364; outline: none; }

.btn-primary {
  background: #56d364;
  color: black;
  border: none;
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.invite-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #333;
  text-align: center;
}

.invite-input {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-secondary {
  background: #333;
  color: white;
  border: none;
  padding: 0 15px;
  border-radius: 8px;
  cursor: pointer;
}

.error { color: #ff6b6b; font-size: 0.8rem; }
</style>