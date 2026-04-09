<script setup>
import { ref, computed } from 'vue'
import mistakesData from '../../docs/data/mistakes.json'

const mistakes = ref(mistakesData)
const selectedIds = ref([])
const showAnswers = ref({})
const showAllAnswers = ref(false)
const addMarginBottom = ref(false)

// Select all or none
const selectAll = (event) => {
  if (event.target.checked) {
    selectedIds.value = mistakes.value.map(m => m.id)
  } else {
    selectedIds.value = []
  }
}

// Toggle individual answer
const toggleAnswer = (id) => {
  showAnswers.value[id] = !showAnswers.value[id]
}

// Toggle all answers
const toggleAllAnswers = () => {
  const current = showAllAnswers.value
  mistakes.value.forEach(m => {
    showAnswers.value[m.id] = !current
  })
  showAllAnswers.value = !current
}

// Print function
const printPage = () => {
  window.print()
}

// Parse markdown/math if necessary. For now, VitePress doesn't parse math in Vue component templates automatically unless we use something or it is static.
// Since user has Katex css but mathjax3 in md, let's just render the text. If they need parsing inside Vue, they might need a library, but let's stick to basics first.
</script>

<template>
  <div class="mistake-system">
    <!-- Print Control Panel -->
    <div class="print-controls no-print">
      <div class="control-group">
        <label class="control-label">
          <input type="checkbox" @change="selectAll" :checked="selectedIds.length === mistakes.length && mistakes.length > 0" />
          全选
        </label>
        <button @click="toggleAllAnswers" class="btn">
          {{ showAllAnswers ? '隐藏所有解析' : '显示所有解析' }}
        </button>
        <label class="control-label">
          <input type="checkbox" v-model="addMarginBottom" />
          预留作答空间
        </label>
        <button @click="printPage" class="btn btn-primary">
          🖨️ 打印选中试题
        </button>
      </div>
    </div>

    <!-- Mistakes List -->
    <div class="mistake-list">
      <div 
        v-for="(mistake, index) in mistakes" 
        :key="mistake.id"
        class="mistake-card"
        :class="{ 
          'is-selected': selectedIds.includes(mistake.id),
          'print-hidden': !selectedIds.includes(mistake.id),
          'has-space': addMarginBottom
        }"
      >
        <div class="card-header">
          <label class="select-checkbox no-print">
            <input type="checkbox" :value="mistake.id" v-model="selectedIds" />
          </label>
          <span class="chapter-badge">{{ mistake.chapter }}</span>
          <span class="question-number">第 {{ index + 1 }} 题</span>
        </div>
        
        <div class="card-body">
          <div class="question-content">
            {{ mistake.question }}
          </div>
          
          <div class="answer-section" v-show="showAnswers[mistake.id] || false">
            <div class="answer-block">
              <strong>【答案】</strong> {{ mistake.answer }}
            </div>
            <div class="analysis-block">
              <strong>【解析】</strong> {{ mistake.analysis }}
            </div>
          </div>
        </div>
        
        <div class="card-footer no-print">
          <button @click="toggleAnswer(mistake.id)" class="btn btn-text">
            {{ showAnswers[mistake.id] ? '收起解析 ∧' : '查看解析 ∨' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mistake-system {
  font-family: inherit;
  color: var(--vp-c-text-1);
}

.print-controls {
  background: var(--vp-c-bg-soft);
  padding: 16px 20px;
  border-radius: 8px;
  margin-bottom: 24px;
  border: 1px solid var(--vp-c-divider);
}

.control-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-mute);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  color: var(--vp-c-text-1);
}

.btn:hover {
  background: var(--vp-c-bg-soft);
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
}

.btn-text {
  background: transparent;
  border: none;
  color: var(--vp-c-brand-1);
  padding: 4px 8px;
}

.btn-text:hover {
  background: var(--vp-c-bg-soft);
}

.mistake-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mistake-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 20px;
  background: var(--vp-c-bg);
  transition: border-color 0.2s;
}

.mistake-card.is-selected {
  border-color: var(--vp-c-brand-1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed var(--vp-c-divider);
}

.chapter-badge {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
}

.question-number {
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.question-content {
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
  margin-bottom: 16px;
}

.answer-section {
  background: var(--vp-c-bg-soft);
  padding: 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.6;
}

.answer-block {
  margin-bottom: 8px;
}

.card-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* Print Styles */
@media print {
  /* Hide VitePress layout elements */
  :global(.VPNav), :global(.VPSidebar), :global(.VPDocFooter), :global(.VPLocalNav) {
    display: none !important;
  }
  
  :global(.VPDoc) {
    padding: 0 !important;
  }

  :global(main) {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
  }

  /* Hide print controls in component */
  .no-print {
    display: none !important;
  }

  /* Hide unselected cards */
  .print-hidden {
    display: none !important;
  }

  /* Reset card styles for print */
  .mistake-card {
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    padding: 20px 0;
    page-break-inside: avoid;
  }

  .mistake-card.has-space {
    margin-bottom: 200px; /* Space for writing answers */
  }

  /* Color adjustments for print */
  .chapter-badge {
    border: 1px solid #ccc;
    background: transparent;
    color: #333;
  }
}
</style>
