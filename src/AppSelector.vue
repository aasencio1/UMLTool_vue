<template>
  <div>
    <h2>UML Diagrams</h2>

    <div style="margin-bottom: 20px;">
      <button @click="selectedView = 'html5'">Usar HTML5 Drag & Drop</button>
      <button @click="selectedView = 'vueflow'">Usar VueFlow</button>
    </div>

    <component :is="selectedComponent" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Html5App from './Html5_App.vue'
import VueFlowApp from './VueFlow_App.vue'

const selectedView = ref('html5')

const selectedComponent = computed(() => {
  return selectedView.value === 'vueflow' ? VueFlowApp : Html5App
})
</script>
