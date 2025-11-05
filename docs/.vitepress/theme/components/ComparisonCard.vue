<template>
  <div class="comparison-card" :class="framework">
    <div class="comparison-header">
      <span class="framework-icon">{{ icon }}</span>
      <span class="framework-name">{{ title }}</span>
    </div>
    <div class="comparison-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  framework: {
    type: String,
    required: true,
    validator: (value) => ['react', 'flutter', 'compose'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: '📱'
  }
})
</script>

<style scoped>
.comparison-card {
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: var(--vp-c-bg-soft);
}

.comparison-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.comparison-card.react {
  border-color: #61dafb;
}

.comparison-card.flutter {
  border-color: #027dfd;
}

.comparison-card.compose {
  border-color: #4caf50;
}

.comparison-card:hover.react {
  border-color: #21a1c4;
  box-shadow: 0 8px 24px rgba(97, 218, 251, 0.3);
}

.comparison-card:hover.flutter {
  border-color: #02569b;
  box-shadow: 0 8px 24px rgba(2, 125, 253, 0.3);
}

.comparison-card:hover.compose {
  border-color: #388e3c;
  box-shadow: 0 8px 24px rgba(76, 175, 80, 0.3);
}

.comparison-header {
  padding: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.react .comparison-header {
  background: linear-gradient(135deg, #61dafb 0%, #21a1c4 100%);
}

.flutter .comparison-header {
  background: linear-gradient(135deg, #027dfd 0%, #02569b 100%);
}

.compose .comparison-header {
  background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
}

.framework-icon {
  font-size: 1.5rem;
}

.framework-name {
  font-size: 1rem;
}

.comparison-content {
  padding: 1rem;
}
</style>
