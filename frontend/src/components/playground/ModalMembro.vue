<template>
  <div v-if="visivel" class="modal-overlay" @click.self="fecharModal">
    <div class="modal-conteudo">
      <h3>{{ editando ? 'Editar Membro' : 'Novo Membro' }}</h3>
      
      <form @submit.prevent="salvar" class="form-membro">
        <div class="grupo-form">
          <label>Nome:</label>
          <input type="text" v-model="form.nome" required placeholder="Ex: Lucas" />
        </div>

        <div class="grupo-form">
          <label>Papel na Família:</label>
          <select v-model="form.papel">
            <option value="Pai/Mãe">Pai/Mãe</option>
            <option value="Filho(a)">Filho(a)</option>
            <option value="Avô/Avó">Avô/Avó</option>
            <option value="Tio/Tia">Tio/Tia</option>
            <option value="Convidado">Convidado</option>
          </select>
        </div>

        <div class="grupo-form">
          <label>Emoji (Avatar):</label>
          <input type="text" v-model="form.avatar" required placeholder="Ex: 🐶" maxlength="2" />
        </div>

        <div class="botoes-modal">
          <button type="button" class="btn-cancelar" @click="fecharModal">Cancelar</button>
          <button type="submit" class="btn-salvar">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  visivel: Boolean,
  membroEditando: Object // Se vier preenchido, é edição. Se vier nulo, é criação.
});

const emit = defineEmits(['fechar', 'salvar']);

// Objeto reativo que guarda o que o usuário digita no formulário
const form = reactive({
  id: null,
  nome: '',
  papel: 'Filho(a)',
  avatar: '👤'
});

// O 'watch' observa as mudanças. Quando o modal abre, preenchemos o form com os dados antigos (se houver)
watch(() => props.visivel, (estaVisivel) => {
  if (estaVisivel) {
    if (props.membroEditando) {
      // Edição
      form.id = props.membroEditando.id;
      form.nome = props.membroEditando.nome;
      form.papel = props.membroEditando.papel;
      form.avatar = props.membroEditando.avatar;
    } else {
      // Novo membro
      form.id = null;
      form.nome = '';
      form.papel = 'Filho(a)';
      form.avatar = '👤';
    }
  }
});

// Verifica se estamos editando ou criando
const editando = () => form.id !== null;

function fecharModal() {
  emit('fechar');
}

function salvar() {
  // Envia os dados preenchidos para o componente pai
  emit('salvar', { ...form });
  fecharModal();
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-conteudo {
  background: #1a1a1a;
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

h3 { margin-top: 0; margin-bottom: 20px; }

.form-membro { display: flex; flex-direction: column; gap: 15px; }
.grupo-form { display: flex; flex-direction: column; gap: 5px; }

label { font-size: 0.9rem; color: #bbb; }
input, select {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-family: inherit;
}

.botoes-modal { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
button { padding: 10px 15px; border-radius: 8px; font-weight: bold; cursor: pointer; border: none; }
.btn-cancelar { background: transparent; color: #bbb; }
.btn-cancelar:hover { color: white; background: rgba(255, 255, 255, 0.1); }
.btn-salvar { background: #56d364; color: black; }
.btn-salvar:hover { background: #46b352; }
</style>