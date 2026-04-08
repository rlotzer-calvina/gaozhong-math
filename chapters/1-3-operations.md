# 1.3 集合的运算

## 核心讲义

- **并集 (Union)**：由所有属于 $A$ 或属于 $B$ 的元素组成的集合。$A \cup B = \{x \mid x \in A \text{ 或 } x \in B\}$
- **交集 (Intersection)**：由所有既属于 $A$ 又属于 $B$ 的元素组成的集合。$A \cap B = \{x \mid x \in A \text{ 且 } x \in B\}$
- **补集 (Complement)**：在全集 $U$ 中，不属于 $A$ 的元素组成的集合。$\complement_U A = \{x \mid x \in U \text{ 且 } x \notin A\}$
- **运算定律**：
  - **交换律**：$A \cup B = B \cup A$, $A \cap B = B \cap A$
  - **结合律**：$(A \cup B) \cup C = A \cup (B \cup C)$, $(A \cap B) \cap C = A \cap (B \cap C)$
  - **分配律**：$A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$, $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$
  - **德·摩根定律 (De Morgan's Laws)**：
    配合记忆口诀：“长杠变短杠，符号变方向”。
    $$\complement_U (A \cup B) = (\complement_U A) \cap (\complement_U B)$$
    $$\complement_U (A \cap B) = (\complement_U A) \cup (\complement_U B)$$

---

## 精选母题

### 例 2
::: info 题目
设 $A = \{x \mid -1 \le x < 3\}$，$B = \{x \mid x > 0\}$，求 $A \cap B$。
:::

::: tip 答案
$\{x \mid 0 < x < 3\}$
:::

<details>
<summary>点击查看详细解析与辅导逻辑</summary>

**详细解析：** 分别在数轴上画出 $A$ 和 $B$ 的区间，寻找两者重合交叉的公共部分。左边界由于 $x>0$ 不含等号，右边界 $x<3$ 也不含等号。
**辅导逻辑：** 考核交集运用及数轴工具。必须让学生养成遇到不等式区间必画数轴的习惯。
</details>

### 例 3
::: info 题目
全集 $U = \mathbb{R}$，集合 $A = \{x \mid x \ge 2\}$，求 $\complement_U A$。
:::

::: tip 答案
$\{x \mid x < 2\}$
:::

<details>
<summary>点击查看详细解析与辅导逻辑</summary>

**详细解析：** 实数域 $\mathbb{R}$ 中去除了所有大于等于 2 的数，即剩余严格小于 2 的实数集。
**辅导逻辑：** 考核补集转化。重点提醒边界值的取舍关系，原来的带等号，其补集必然不带等号。
</details>

### 例 5
::: info 题目
已知 $A = \{1, a, b\}$，$B = \{a, a^2, ab\}$，若 $A=B$，求 $a, b$ 的值。
:::

::: tip 答案
$a = -1, b = 0$
:::

<details>
<summary>点击查看详细解析与辅导逻辑</summary>

**详细解析：** 由集合相等，1属于B，若 $a=1$，此时 $A=\{1,1,b\}$ 违背互异性，舍去；则只能是 $a^2=1$ 或 $ab=1$。分类推演并验算后可得 $a=-1, b=0$ 是唯一满足互异性与相平等的。
**辅导逻辑：** **互异性避坑第一题**！教导学生“一遇参数、必检验互异”。
</details>

### 例 9
::: info 题目
若 $A=\{x \mid y=\sqrt{x-1}\}$，$B=\{y \mid y=x^2-1\}$，求 $A \cap B$。
:::

::: tip 答案
$\{x \mid x \ge 1\}$
:::

<details>
<summary>点击查看详细解析与辅导逻辑</summary>

**详细解析：** $A$ 的限制条件是 $x-1 \ge 0 \implies x \ge 1$，即 $A = [1, +\infty)$。$B$ 表达的是值域限制也就是二次函数求极值 $y \ge -1$，即 $B = [-1, +\infty)$。取两者交集得 $[1, +\infty)$。
**辅导逻辑：** **代表元素错误绝佳错题记录**！教会学生先看竖线前的字母是谁，再看竖线后的方程。
</details>

### 例 10
::: info 题目
化简 $(\complement_U A) \cup (\complement_U B)$，当 $A \cap B = \emptyset$ 时。
:::

::: tip 答案
全集 $U$
:::

<details>
<summary>点击查看详细解析与辅导逻辑</summary>

**详细解析：** 根据德·摩根定律 $(\complement_U A) \cup (\complement_U B) = \complement_U (A \cap B)$。因为 $A \cap B = \emptyset$，空集的补集即为全集 $U$。
**辅导逻辑：** 训练德·摩根公式及长杠短杠变换，体会对称形式化简之美。
</details>

### 例 11
::: info 题目
设 $A=\{x \mid 2x-1>0\}$，$B=\{x \mid x<m\}$。若 $A \cap B \neq \emptyset$，求 $m$ 范围。
:::

::: tip 答案
$m > \frac{1}{2}$
:::

<details>
<summary>点击查看详细解析与辅导逻辑</summary>

**详细解析：** 解 $A$ 得 $x > \frac{1}{2}$。两个区间要形成非空交集，右开区间的顶端 $m$ 必须越过左开区间的底端 $1/2$。
**辅导逻辑：** 再次强调画数轴的重要性，动态移动 $m$ 轴以观察临界点的重叠。
</details>

### 例 16
::: info 题目
全集 $U=\{1,2,3,4,5,6\}$，$A \cup B = U$，$A \cap B=\{2,4\}$，求这能说明什么。
:::

::: tip 答案
集合 A 和 B 均须包含 $\{2, 4\}$，且其余的 $\{1,3,5,6\}$ 将被 A 和 B 二选一地彻底瓜分。
:::

<details>
<summary>点击查看详细解析与辅导逻辑</summary>

**详细解析：** 交集表明两者共享 2 和 4。而并集占满 U，表明除了公共元素，其他的全是独占元素。
**辅导逻辑：** 借用集合运算推导配置方式。可以用来引申出包含不互斥的排布数学思维。
</details>

### 例 17
::: info 题目
已知 $A=\{x \mid x^2-5x+6=0\}$，$B=\{x \mid x>a\}$，若 $A \cap B = \{3\}$，求 $a$。
:::

::: tip 答案
$2 \le a < 3$
:::

<details>
<summary>点击查看详细解析与辅导逻辑</summary>

**详细解析：** $A$ 中含有 2 和 3。因为交集仅含 3，所以 $B$ 集合的区间覆盖必须囊括 3 而避开 2。即 $a < 3$ 且确保 $a \ge 2$（因为如果 $a < 2$ 则会把 2 也包进去）。
**辅导逻辑：** 极高频必考选填题！考核边界“取得到等号”和开闭区间的灵活判断。
</details>

### 例 18
::: info 题目
设 $U$ 是全体实数，若对任意实数 $x$，$|x-1| \ge m$ 恒成立，转化为含有补集的高中数学语言怎么说？
:::

::: tip 答案
解集为 $U$，其等价于对应原条件不满足集合（错集）的补集为空 $\emptyset$。
:::

<details>
<summary>点击查看详细解析与辅导逻辑</summary>

**详细解析：** 恒成立问题代表事件穷举充满了整个实数域，也就反证了对立事件的空间完全为 0。
**辅导逻辑：** 引出后续函数恒成立向转化补集来逆向求参数最值的手段。
</details>
