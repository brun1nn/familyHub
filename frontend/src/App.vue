<template>
  <PainelPrincipal />
</template>

<script setup>
// Importe o PainelPrincipal apontando para a pasta correta.
// Se a pasta 'playground' estiver dentro de 'src/components', o caminho será assim:
import PainelPrincipal from './components/playground/PainelPrincipal.vue';

/* Nota sobre os caminhos dos outros arquivos:
  Certifique-se de que dentro do seu 'PainelPrincipal.vue', 
  os imports estão assim (já que estão na mesma pasta):
  import TesteCalendario from './TesteCalendario.vue';
  import TesteEdicaoTarefas from './TesteEdicaoTarefas.vue';
*/
</script>

<style>
/* CSS Global (Opcional, mas recomendado para o tema escuro ficar perfeito) */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #0a0a0a; /* Fundo escuro base para preencher a tela toda */
  font-family: 'Inter', sans-serif;
}

#app {
  width: 100%;
  min-height: 100vh;
}
</style>