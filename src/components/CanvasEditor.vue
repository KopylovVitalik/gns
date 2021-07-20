<template>
  <div class="canvas-editor">
    <div class="canvas-editor__controls">
      <div class="canvas-editor__control">
        <input type="range" v-model.number="penWidth" min="2" max="20" />{{
          penWidth
        }}
        px
      </div>
      <div class="canvas-editor__control">
        <md-radio v-model="type" value="pen">Pen</md-radio>
        <md-radio v-model="type" value="eraser">Eraser</md-radio>
      </div>
      <div class="canvas-editor__control">
        <div class="color-picker">
          <input type="color" id="color" name="head" v-model="color" />
          <label for="color">Choose color</label>
        </div>
      </div>
      <div class="canvas-editor__control">
        <md-button class="md-raised" @click="clearCanvas"
          >Clear Canvas</md-button
        >
      </div>
    </div>
    <div class="canvas-editor__wrapper" ref="canvasWrapper">
      <div class="canvas-editor__canvas" :style="{ width: `${width}px` }">
        <canvas
          ref="canvas"
          @mousedown="beginDrawing"
          @mousemove="keepDrawing"
          @mouseup="stopDrawing"
          @touchstart="beginDrawing"
          @touchmove="mobileDrawing"
          @touchend="stopDrawing"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['initialCanvas'],
  data() {
    return {
      x: 0,
      y: 0,
      isDrawing: false,
      canvas: null,
      width: 0,
      height: 0,
      penWidth: 3,
      type: 'pen',
      color: 'red',
    };
  },
  methods: {
    drawLine(x1, y1, x2, y2) {
      const ctx = this.canvas.getContext('2d');
      ctx.beginPath();
      ctx.strokeStyle = this.computedColor;
      ctx.lineWidth = this.penWidth;
      ctx.lineCap = 'round';
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    beginDrawing(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },
    keepDrawing(e) {
      e.preventDefault();
      e.stopPropagation();
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },
    mobileDrawing(e) {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      this.keepDrawing(mouseEvent);
    },
    stopDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
        this.saveCanvas();
      }
    },
    saveCanvas() {
      const dataURL = this.canvas.toDataURL();
      const width = this.canvasWidth;
      const height = this.canvasWidth * 0.4;
      this.$emit('saveCanvas', { data: dataURL, height, width });
    },
    clearCanvas() {
      this.canvas.getContext('2d').clearRect(0, 0, this.width, this.height);
      this.saveCanvas();
    },
    resizeCanvas() {
      this.width = this.$refs.canvasWrapper.offsetWidth;
      this.height = this.width * 0.8;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },
  },
  computed: {
    computedColor() {
      return this.type === 'pen' ? this.color : '#FFF';
    },
  },
  mounted() {
    window.addEventListener('resize', this.resizeCanvas);
    this.$nextTick(() => {
      this.$nextTick(() => {
        this.canvas = this.$refs.canvas;
        this.resizeCanvas();
        if (this.initialCanvas) {
          const img = new Image();
          img.setAttribute('src', this.initialCanvas);
          img.addEventListener('load', () => {
            this.canvas.getContext('2d').drawImage(img, 0, 0);
          });
        }
      });
    });
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeCanvas);
  },
};
</script>

<style lang="scss">
.canvas-editor {
  width: 100%;
  &__controls {
    display: flex;
    align-items: center;
    margin: 0 -20px 20px;
    flex-wrap: wrap;
  }
  &__control {
    padding: 0 20px 10px;
    .md-button {
      margin: 0;
    }
  }
  &__wrapper {
    position: relative;
    padding-bottom: 80%;
  }
  &__canvas {
    position: absolute;
    top: 0;
    left: 0;
    height: 100% !important;
    canvas {
      position: absolute;
      top: 0;
      left: 0;
      border: 2px solid red;
    }
  }
  .navigation {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}

.color-picker {
  display: flex;
  align-items: center;
  label {
    position: relative;
    top: auto;
    margin-left: 10px;
  }
}

.md-radio {
  label {
    top: auto;
  }
}
</style>
