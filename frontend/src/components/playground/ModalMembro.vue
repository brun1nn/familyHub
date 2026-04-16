<template>
  <div v-if="visivel" class="modal-overlay" @click.self="fecharModal">
    <div class="modal-conteudo">
      <h3>{{ form.id ? 'Editar Membro' : 'Novo Membro' }}</h3>
      
      <form @submit.prevent="handleSalvar" class="form-membro">
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
import { supabase } from '../../supabase'; // Verifica se o caminho está correto conforme sua estrutura

const props = defineProps({
  visivel: Boolean,
  membroEditando: Object
});

const emit = defineEmits(['fechar', 'atualizar']);

const form = reactive({
  id: null,
  nome: '',
  papel: 'Filho(a)',
  avatar: '👤'
});

// Monitora abertura do modal para preencher o formulário
watch(() => props.visivel, (estaVisivel) => {
  if (estaVisivel) {
    if (props.membroEditando) {
      Object.assign(form, props.membroEditando);
    } else {
      form.id = null;
      form.nome = '';
      form.papel = 'Filho(a)';
      form.avatar = '👤';
    }
  }
});

function fecharModal() {
  emit('fechar');
}

// FUNÇÃO QUE SALVA NO SUPABASE
async function handleSalvar() {
  try {
    if (form.id) {
      // Lógica de ATUALIZAÇÃO (Update)
      const { error } = await supabase
        .from('membros')
        .update({
          nome: form.nome,
          papel: form.papel,
          avatar: form.avatar
        })
        .eq('id', form.id);

      if (error) throw error;
    } else {
      // Lógica de CRIAÇÃO (Insert)
      const { error } = await supabase
        .from('membros')
        .insert([
          { 
            nome: form.nome, 
            papel: form.papel, 
            avatar: form.avatar,
            pontos: 0,
            nivel: 1,
            progresso: 0
          }
        ]);

      if (error) throw error;
    }

    // Se deu tudo certo, avisa o pai para recarregar a lista e fecha
    emit('atualizar'); 
    fecharModal();
  } catch (error) {
    alert('Erro ao salvar no banco: ' + error.message);
  }
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

h3 { margin-top: 0; margin-bottom: 20px; font-family: sans-serif; }

.form-membro { display: flex; flex-direction: column; gap: 15px; }
.grupo-form { display: flex; flex-direction: column; gap: 5px; }

label { font-size: 0.9rem; color: #bbb; text-align: left; }

input, select {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-family: inherit;
  outline: none;
}

input:focus, select:focus {
  border-color: #56d364;
}

.botoes-modal { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }
button { padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; border: none; transition: 0.2s; }

.btn-cancelar { background: transparent; color: #bbb; }
.btn-cancelar:hover { color: white; background: rgba(255, 255, 255, 0.1); }

.btn-salvar { background: #56d364; color: black; }
.btn-salvar:hover { background: #46b352; transform: translateY(-2px); }
</style>