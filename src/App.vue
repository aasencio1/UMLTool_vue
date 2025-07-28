
<template>
  <div class="app">
    <aside class="palette">
      <h3>Paleta UML</h3>
      <div class="palette-item">
        <img src="/uml/actor.png" alt="Actor" />
        <span>Actor</span>
      </div>
      <div class="palette-item">
        <img src="/uml/usecase.png" alt="Use Case" />
        <span>Use Case</span>
      </div>
      <div class="palette-item">
        <img src="/uml/extend.png" alt="Extend" />
        <span>&lt;&lt;extend&gt;&gt;</span>
      </div>
      <div class="palette-item">
        <img src="/uml/include.png" alt="Include" />
        <span>&lt;&lt;include&gt;&gt;</span>
      </div>
    </aside>

    <main class="canvas-area">
      <p>💡 Aquí irá el canvas para modelar el diagrama.</p>
    </main>
  </div>
</template>

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
  cursor: pointer;
}

.palette-item img {
  width: 40px;
  height: auto;
}

.canvas-area {
  flex: 1;
  padding: 1rem;
}
</style>
