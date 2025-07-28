<template>
  <div class="app">
    <aside class="palette">
      <h3>Paleta UML</h3>
      <div
        class="palette-item"
        v-for="(item, index) in paletteItems"
        :key="index"
        draggable="true"
        @dragstart="onDragStart($event, item)"
      >
        <img :src="item.icon" :alt="item.label" />
        <span>{{ item.label }}</span>
      </div>
    </aside>

    <main class="canvas-area">
      <VueFlow
        v-model="elements"
        class="vueflow-canvas"
        @drop="onDrop"
        @dragover.prevent
        :default-viewport="{ zoom: 1.1, x: 0, y: 0 }"
        :fit-view-on-init="true"
      />
    </main>
  </div>
</template>

<script setup>
import { VueFlow, useVueFlow } from '@braks/vue-flow'
import { ref } from 'vue'

const { addNodes } = useVueFlow()

const draggedItem = ref(null)

const paletteItems = [
  { label: 'Actor', icon: '/uml/actor.png' },
  { label: 'Use Case', icon: '/uml/usecase.png' },
  { label: '<<extend>>', icon: '/uml/extend.png' },
  { label: '<<include>>', icon: '/uml/include.png' }
]

const elements = ref([])

function onDragStart(event, item) {
  draggedItem.value = item
}

function onDrop(event) {
  const bounds = event.target.getBoundingClientRect()
  const position = {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top
  }

  if (draggedItem.value) {
    elements.value.push({
      id: `${draggedItem.value.label}-${+new Date()}`,
      type: 'default',
      position,
      data: {
        label: draggedItem.value.label,
        icon: draggedItem.value.icon
      }
    })
  }
}
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
}

.palette {
  width: 200px;
  background-color: #f4f4f4;
  padding: 1rem;
  border-right: 1px solid #ccc;
}

.palette-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  cursor: grab;
}

.palette-item img {
  width: 40px;
  height: auto;
}

.canvas-area {
  flex: 1;
  padding: 0;
  position: relative;
}

.vueflow-canvas {
  width: 100%;
  height: 100%;
}
</style>
