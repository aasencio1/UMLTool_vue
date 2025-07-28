<!-- src/Html5_App.vue -->
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

    <main class="canvas-area" @dragover.prevent @drop="onDrop">
      <div
        v-for="(element, index) in droppedElements"
        :key="index"
        class="uml-element"
        :style="{ top: `${element.y}px`, left: `${element.x}px` }"
      >
        <img :src="element.icon" :alt="element.label" />
        <span>{{ element.label }}</span>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const draggedItem = ref(null)
const droppedElements = ref([])

const paletteItems = [
  { label: 'Actor', icon: '/uml/actor.png' },
  { label: 'Use Case', icon: '/uml/usecase.png' },
  { label: '<<extend>>', icon: '/uml/extend.png' },
  { label: '<<include>>', icon: '/uml/include.png' }
]

function onDragStart(event, item) {
  draggedItem.value = item
}

function onDrop(event) {
  const canvas = event.currentTarget.getBoundingClientRect()
  droppedElements.value.push({
    ...draggedItem.value,
    x: event.clientX - canvas.left,
    y: event.clientY - canvas.top
  })
}
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
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
}

.canvas-area {
  flex: 1;
  position: relative;
  background-color: #fdfdfd;
  border: 2px dashed #ccc;
  overflow: hidden;
}

.uml-element {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
