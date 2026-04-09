<script setup>
import { ref, computed } from 'vue'
import mistakesData from '../../docs/data/mistakes.json'
import katex from 'katex'
import 'katex/dist/katex.min.css'

const mistakes = ref(mistakesData)
const selectedIds = ref([])
const showAnswers = ref({})
const showAllAnswers = ref(false)
const addMarginBottom = ref(false)

// Search and Filter State
const searchQuery = ref('')
const selectedChapter = ref('')
const sortOrder = ref('desc')

// Computed unique chapters
const chapters = computed(() => {
  return [...new Set(mistakes.value.map(m => m.chapter))]
})

// Computed filtered mistakes
const filteredMistakes = computed(() => {
  let result = mistakes.value

  // Filter by chapter
  if (selectedChapter.value) {
    result = result.filter(m => m.chapter === selectedChapter.value)
  }

  // Filter by search query (question or analysis)
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(m => 
      (m.question && m.question.toLowerCase().includes(query)) || 
      (m.analysis && m.analysis.toLowerCase().includes(query))
    )
  }

  // Sort by date
  result = result.slice().sort((a, b) => {
    const timeA = new Date(a.date || 0).getTime()
    const timeB = new Date(b.date || 0).getTime()
    return sortOrder.value === 'desc' ? timeB - timeA : timeA - timeB
  })

  return result
})

// Select all or none
const selectAll = (event) => {
  if (event.target.checked) {
    selectedIds.value = filteredMistakes.value.map(m => m.id)
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
  filteredMistakes.value.forEach(m => {
    showAnswers.value[m.id] = !current
  })
  showAllAnswers.value = !current
}

// Print function
const printPage = () => {
  window.print()
}

// Math Rendering
const renderMath = (text) => {
  if (!text) return '';
  
  // 【关键】只处理 JSON 转义产生的双斜杠，绝对不要去动 \{ 或 \} 等数学指令
  let rawText = text.replace(/\\\\/g, '\\');

  // 使用更精准的正则匹配 $...$
  return rawText.replace(/\$([\s\S]+?)\$/g, (match, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        throwOnError: false,
        displayMode: false,
        // 增加对 SES 常用符号的兼容
        macros: { "\\mid": "|" }
      });
    } catch (e) {
      console.error("KaTeX Error:", e);
      return match; // 失败则原样返回
    }
  });
};
</script>

<template>
  <div class="mistake-system">
    <!-- Search and Filter Panel -->
    <div class="search-panel no-print">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="检索题目或解析中的关键词..." 
        class="filter-input input-text"
      />
      <select v-model="selectedChapter" class="filter-input select-box">
        <option value="">全部章节</option>
        <option v-for="chapter in chapters" :key="chapter" :value="chapter">
          {{ chapter }}
        </option>
      </select>
      <select v-model="sortOrder" class="filter-input select-box">
        <option value="desc">按时间降序</option>
        <option value="asc">按时间升序</option>
      </select>
    </div>

    <!-- Print Control Panel -->
    <div class="print-controls no-print">
      <div class="control-group">
        <label class="control-label">
          <input type="checkbox" @change="selectAll" :checked="selectedIds.length === filteredMistakes.length && filteredMistakes.length > 0" />
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
        v-for="(mistake, index) in filteredMistakes" 
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
          <div class="question" v-html="renderMath(mistake.question_latex || mistake.question)"></div>
          
          <div class="answer-section" v-show="showAnswers[mistake.id] || false">
            <div class="answer-block">
              <strong>【答案】</strong> <span v-html="renderMath(mistake.answer_latex || mistake.answer)"></span>
            </div>
            <div class="analysis-block">
              <strong>【解析】</strong> <div class="analysis-content" v-html="renderMath(mistake.analysis)"></div>
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
:deep(.katex) { font-size: 1.1em !important; }

.mistake-system {
  font-family: inherit;
  color: var(--vp-c-text-1);
}

.search-panel {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-mute);
  font-size: 14px;
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.2s;
}

.filter-input:focus {
  border-color: var(--vp-c-brand-1);
}

.input-text {
  flex: 1;
  min-width: 200px;
}

.select-box {
  cursor: pointer;
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
