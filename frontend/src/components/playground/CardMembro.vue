<template>
  <div class="cartao-membro">
    <div class="cartao-topo">
      <div class="avatar">{{ membro.avatar }}</div>
      <div class="acoes-cartao">
        <button
          class="btn-icone"
          title="Editar"
          @click="$emit('editar', membro)"
        >
          ✏️
        </button>
        <button
          class="btn-icone deletar"
          title="Remover"
          @click="$emit('remover', membro.id)"
        >
          🗑️
        </button>
      </div>
    </div>

    <div class="cartao-info">
      <h3 class="nome">{{ membro.nome }}</h3>
      <span class="badge" :class="obterClasseDoPapel(membro.papel)">
        {{ membro.papel }}
      </span>
    </div>

    <div class="cartao-gamificacao">
      <div class="nivel-info">
        <span>Nível {{ membro.nivel }}</span>
        <span class="xp">{{ membro.pontos }} XP</span>
      </div>
      <div class="barra-fundo">
        <div
          class="barra-preenchimento"
          :style="{ width: membro.progresso + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Recebe o objeto "membro" do componente pai
defineProps({
  membro: {
    type: Object,
    required: true
  }
});

// Define quais eventos este cartão pode disparar
defineEmits(['editar', 'remover']);

// Função para definir a cor da etiqueta baseada no papel
function obterClasseDoPapel(papel) {
  switch (papel) {
    case 'Pai/Mãe': return 'badge-admin';
    case 'Avô/Avó':
    case 'Tio/Tia': return 'badge-parente';
    case 'Pet': return 'badge-pet';
    case 'Convidado': return 'badge-convidado';
    default: return 'badge-filho'; // Filho(a) é o padrão
  }
}
</script>

<style scoped>
.cartao-membro {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition:
    transform 0.2s,
    border-color 0.2s;
}

.cartao-membro:hover {
  transform: translateY(-5px);
  border-color: rgba(86, 211, 100, 0.3);
}

.cartao-topo {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.avatar {
  font-size: 3rem;
  background: rgba(255, 255, 255, 0.05);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.acoes-cartao {
  display: flex;
  gap: 5px;
}
.btn-icone {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.5;
  transition: 0.2s;
}
.btn-icone:hover {
  opacity: 1;
  transform: scale(1.1);
}
.deletar:hover {
  color: red;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 4px;
}
.cartao-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
}
.nome {
  margin: 0;
  font-size: 1.2rem;
}
.badge {
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: bold;
}
.badge-admin {
  background-color: rgba(255, 165, 0, 0.1);
  color: #ffa500;
  border: 1px solid rgba(255, 165, 0, 0.3);
}
.badge-filho {
  background-color: rgba(86, 211, 100, 0.1);
  color: #56d364;
  border: 1px solid rgba(86, 211, 100, 0.3);
}
.cartao-gamificacao {
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.nivel-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 8px;
  color: #bbb;
}
.xp {
  color: #56d364;
  font-weight: bold;
}
.barra-fundo {
  width: 100%;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}
.barra-preenchimento {
  height: 100%;
  background-color: #56d364;
  border-radius: 3px;
  transition: width 0.5s ease;
}

/* Cores das Etiquetas (Badges) */
.badge-parente {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6; /* Azul */
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.badge-pet {
  background-color: rgba(168, 85, 247, 0.1);
  color: #a855f7; /* Roxo */
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.badge-convidado {
  background-color: rgba(156, 163, 175, 0.1);
  color: #9ca3af; /* Cinza */
  border: 1px solid rgba(156, 163, 175, 0.3);
}
</style>