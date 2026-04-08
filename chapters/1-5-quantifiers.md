# 1.5 全称量词与存在量词

## 核心讲义

| 名称 | 符号 | 读法 | 否定形式 |
| :--- | :--- | :--- | :--- |
| **全称量词** | $\forall$ | 对所有、对任意、一切 | 存在、至少有一个 ($\exists$) |
| **存在量词** | $\exists$ | 存在、有一个、至少有一个 | 所有、任意、一切 ($\forall$) |

- **全称命题**：含有全称量词的命题。
  - 标准格式：$\forall x \in M, p(x)$
  - 否定格式：$\neg(\forall x \in M, p(x)) \Leftrightarrow \exists x \in M, \neg p(x)$
- **特称命题 (存在命题)**：含有存在量词的命题。
  - 标准格式：$\exists x \in M, p(x)$
  - 否定格式：$\neg(\exists x \in M, p(x)) \Leftrightarrow \forall x \in M, \neg p(x)$

---

## 避坑指南

1. **变词也变性**：在否定一个命题时，不仅要将量词替换（$\forall \leftrightarrow \exists$），还要对结论 $p(x)$ 进行否定。
2. **范围不动**：否定命题时，变量所属的集合 $M$ 保持不变。
