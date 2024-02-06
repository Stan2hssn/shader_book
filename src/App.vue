<template>
  <canvas ref="canvas" />
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import App from "@/graphics/index";

export default {
  setup() {
    const canvas = ref(null);
    let app = null;
    
    onMounted(() => {
      app = new App({ canvas: canvas.value });
    });
    onUnmounted(() => {
      app.destroy();
    });
    return {
      canvas,
    };
  },
}
</script>


<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
canvas {
  width: 100%;
  height: 100%;
  display: block;
  background-color: red;
}
</style>
