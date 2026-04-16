<template>
  <div class="membros-container">
    <header class="cabecalho-membros">
      <div>
        <h2>👨‍👩‍👧‍👦 Membros da Família</h2>
        <p class="subtitulo">Gerencie quem participa e acompanhe o progresso.</p>
      </div>
      <button class="btn-adicionar" @click="abrirModalNovo">
        ➕ Novo Membro
      </button>
    </header>

    <div class="grid-membros">
      <div v-if="membros.length === 0" class="vazio">
        Nenhum membro cadastrado. Adicione sua família!
      </div>

      <CardMembro 
        v-for="membro in membros" 
        :key="membro.id" 
        :membro="membro" 
        @editar="abrirModalEdicao"
        @remover="removerMembro"
      />
    </div>

    <ModalMembro 
      :visivel="modalAberto" 
      :membroEditando="membroSelecionado"
      @fechar="modalAberto = false"
      @salvar="processarSalvamento"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import CardMembro from './CardMembro.vue';
import ModalMembro from './ModalMembro.vue';

// --- ESTADO DA APLICAÇÃO ---
const membros = ref([]);
const modalAberto = ref(false);
const membroSelecionado = ref(null);

// --- SALVANDO NO NAVEGADOR ---
// 1. Quando a página carrega, buscamos do localStorage
onMounted(() => {
  const dadosSalvos = localStorage.getItem('meuApp_membros');
  if (dadosSalvos) {
    membros.value = JSON.parse(dadosSalvos);
  }
});

// 2. Sempre que a variável "membros" sofrer qualquer alteração, salvamos no localStorage automaticamente
watch(membros, (novosMembros) => {
  localStorage.setItem('meuApp_membros', JSON.stringify(novosMembros));
}, { deep: true });

// --- FUNÇÕES DE CONTROLE ---
function abrirModalNovo() {
  membroSelecionado.value = null; // Garante que o form abra vazio
  modalAberto.value = true;
}

function abrirModalEdicao(membro) {
  membroSelecionado.value = membro; // Manda os dados para o form
  modalAberto.value = true;
}

function removerMembro(id) {
  if (confirm("Tem certeza que deseja remover este membro?")) {
    membros.value = membros.value.filter(m => m.id !== id);
  }
}

function processarSalvamento(dadosFormulario) {
  if (dadosFormulario.id) {
    // EDIÇÃO: Procura o membro existente pelo ID e atualiza
    const index = membros.value.findIndex(m => m.id === dadosFormulario.id);
    if (index !== -1) {
      membros.value[index] = {
        ...membros.value[index],
        nome: dadosFormulario.nome,
        papel: dadosFormulario.papel,
        avatar: dadosFormulario.avatar
      };
    }
  } else {
    // CRIAÇÃO: Gera um ID aleatório e adiciona as métricas de gamificação zeradas
    const novoMembro = {
      id: Date.now(), // ID único baseado no relógio
      nome: dadosFormulario.nome,
      papel: dadosFormulario.papel,
      avatar: dadosFormulario.avatar,
      nivel: 1,
      pontos: 0,
      progresso: 0
    };
    membros.value.push(novoMembro);
  }
}
</script>

<style scoped>
.membros-container {
  width: 100%;
  max-width: 1000px;
  color: white;
  font-family: 'Inter', sans-serif;
}

.cabecalho-membros { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
h2 { margin: 0; font-size: 1.8rem; font-weight: 700; }
.subtitulo { margin: 5px 0 0 0; color: #888; font-size: 0.9rem; }
.btn-adicionar { background-color: #56d364; color: #000; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; transition: all 0.2s; }
.btn-adicionar:hover { background-color: #46b352; transform: translateY(-2px); }

.grid-membros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

.vazio {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: #888;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
</style>