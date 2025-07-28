<template>
  <div class="app">
    <aside class="palette">
      <h3>Paleta UML</h3>
      <div
        class="palette-item"
        v-for="(item, index) in paletteItems"
        :key="index"
        draggable="true"
        @dragstart="onDragStart(item)"
      >
        <img :src="item.icon" :alt="item.name" />
        <span>{{ item.name }}</span>
      </div>
    </aside>

    <main class="canvas-area">
      <div
        class="canvas"
        @dragover.prevent
        @drop="onDrop"
      >
        <div
          v-for="(element, index) in canvasElements"
          :key="index"
          class="canvas-element"
          :style="{ left: element.x + 'px', top: element.y + 'px' }"
        >
          <img :src="element.icon" :alt="element.name" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Elementos de la paleta
const paletteItems = [
  { name: 'Actor', icon: '/uml/actor.png' },
  { name: 'Use Case', icon: '/uml/usecase.png' },
  { name: '<<extend>>', icon: '/uml/extend.png' },
  { name: '<<include>>', icon: '/uml/include.png' }
]

// Elemento actualmente arrastrado
const draggedItem = ref(null)

// Lista de elementos colocados en el canvas
const canvasElements = ref([])

function onDragStart(item) {
  draggedItem.value = item
}

function onDrop(event) {
  if (draggedItem.value) {
    canvasElements.value.push({
      ...draggedItem.value,
      x: event.offsetX,
      y: event.offsetY
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
  padding: 1rem;
}

.canvas {
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px dashed #ccc;
  background-color: #fff;
}

.canvas-element {
  position: absolute;
  width: 40px;
  height: 40px;
}

.canvas-element img {
  width: 100%;
  height: 100%;
}
</style>
