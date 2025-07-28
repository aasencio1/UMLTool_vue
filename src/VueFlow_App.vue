<template>
  <div class="app">
    <aside class="palette">
      <h3>Use Cases Elements</h3>
      <div
        v-for="(item, index) in paletteItems"
        :key="index"
        class="palette-item"
        draggable="true"
        @dragstart="onDragStart(item, $event)"
      >
        <img :src="item.icon" :alt="item.name" />
        <span>{{ item.name }}</span>
      </div>
    </aside>

    <main class="canvas-area" @dragover.prevent @drop="onDrop">
      <VueFlow
        v-model:nodes="nodes"
        v-model:edges="edges"
        class="vueflow-container"
        :default-viewport="{ zoom: 1, x: 0, y: 0 }"
      >
        <template #node-custom="props">
          <div class="uml-node" v-if="props?.data?.icon">
                <img :src="props.data.icon" :alt="props.data.label" />
                 <span>{{ props.data.label }}</span>
          </div>
        </template>
      </VueFlow>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@braks/vue-flow'
import '@braks/vue-flow/dist/style.css'

const nodes = ref([])
const edges = ref([])

const { findNode } = useVueFlow()

let draggedItem = null

const paletteItems = [
  { name: 'Actor', icon: '/uml/actor.png' },
  { name: 'Use Case', icon: '/uml/usecase.png' },
  { name: '<<extend>>', icon: '/uml/extend.png' },
  { name: '<<include>>', icon: '/uml/include.png' }
]

function onDragStart(item, event) {
  draggedItem = item
}

function onDrop(event) {
  const bounds = event.target.getBoundingClientRect()
  const position = {
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top
  }

  if (draggedItem) {
    nodes.value.push({
      id: `${draggedItem.name}-${Date.now()}`,
      type: 'custom',
      position,
      data: {
        label: draggedItem.name,
        icon: draggedItem.icon
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
  position: relative;
  overflow: hidden;
}

.vueflow-container {
  width: 100%;
  height: 100%;
}

.uml-node {
  background: #fff;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  text-align: center;
  width: 100px;
}

.uml-node img {
  width: 40px;
  height: auto;
}
</style>
