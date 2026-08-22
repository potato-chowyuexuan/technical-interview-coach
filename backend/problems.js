export const problems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays / Hash Maps",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`. You may assume each input has exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists"],
    starter_code: `function twoSum(nums, target) {\n  // your code here\n}`,
    clarifying_questions: ["Can the array contain duplicates?", "Are the numbers always integers?", "Should I return indices or values?"],
    optimal_approach: "Hash map — O(n) time, O(n) space"
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks / Strings",
    description: `Given a string \`s\` containing just the characters \`(\`, \`)\`, \`{\`, \`}\`, \`[\` and \`]\`, determine if the input string is valid. A string is valid if open brackets are closed by the same type of brackets in the correct order.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" }
    ],
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses characters only"],
    starter_code: `function isValid(s) {\n  // your code here\n}`,
    clarifying_questions: ["Can the string be empty?", "Are there any other characters?"],
    optimal_approach: "Stack — O(n) time, O(n) space"
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Arrays / Sorting",
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals and return an array of the non-overlapping intervals.`,
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "[1,3] and [2,6] overlap → merge to [1,6]" },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]", explanation: "Intervals touch at 4" }
    ],
    constraints: ["1 ≤ intervals.length ≤ 10⁴", "intervals[i].length == 2", "0 ≤ start_i ≤ end_i ≤ 10⁴"],
    starter_code: `function merge(intervals) {\n  // your code here\n}`,
    clarifying_questions: ["Are intervals guaranteed to be sorted?", "Can start equal end?", "What should be returned if there's only one interval?"],
    optimal_approach: "Sort by start, then linear scan — O(n log n) time, O(n) space"
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    description: `Given a sorted array of distinct integers \`nums\` and a target value, return the index of \`target\` if it exists, otherwise return \`-1\`. You must write an algorithm with O(log n) runtime complexity.`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" }
    ],
    constraints: ["1 ≤ nums.length ≤ 10⁴", "nums is sorted ascending with distinct values", "Must be O(log n)"],
    starter_code: `function search(nums, target) {\n  // your code here\n}`,
    clarifying_questions: ["Is the array always sorted?", "Can there be duplicate values?", "What if the array is empty?"],
    optimal_approach: "Classic binary search — O(log n) time, O(1) space"
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    category: "Design / Hash Maps / Linked Lists",
    description: `Design a data structure that follows the Least Recently Used (LRU) cache constraints. Implement the \`LRUCache\` class: \`get(key)\` returns the value if it exists, else \`-1\`; \`put(key, value)\` inserts or updates the key. When capacity is reached, evict the least recently used key.`,
    examples: [
      {
        input: 'LRUCache(2); put(1,1); put(2,2); get(1)→1; put(3,3); get(2)→-1; put(4,4); get(1)→-1; get(3)→3; get(4)→4',
        output: "See above"
      }
    ],
    constraints: ["1 ≤ capacity ≤ 3000", "0 ≤ key, value ≤ 10⁴", "Both get and put must run in O(1) average time"],
    starter_code: `class LRUCache {\n  constructor(capacity) {\n    // your code here\n  }\n  get(key) {\n    // your code here\n  }\n  put(key, value) {\n    // your code here\n  }\n}`,
    clarifying_questions: ["What happens on a get when capacity is 0?", "Is the capacity always > 0?", "Should put update the recency on an existing key?"],
    optimal_approach: "HashMap + doubly linked list — O(1) get and put"
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "1+1, 2" },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, 2+1" }
    ],
    constraints: ["1 ≤ n ≤ 45"],
    starter_code: `function climbStairs(n) {\n  // your code here\n}`,
    clarifying_questions: ["Can n be 0?", "Are the two steps distinct (order matters)?"],
    optimal_approach: "Fibonacci DP — O(n) time, O(1) space"
  },
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked Lists",
    description: `Given the head of a singly linked list, reverse the list and return the reversed list's head.`,
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]", output: "[2,1]" },
      { input: "head = []", output: "[]" }
    ],
    constraints: ["0 ≤ length ≤ 5000", "-5000 ≤ Node.val ≤ 5000"],
    starter_code: `// Definition: function ListNode(val, next) { this.val=val; this.next=next||null; }\nfunction reverseList(head) {\n  // your code here\n}`,
    clarifying_questions: ["Can the list be empty?", "Should I reverse in-place or create a new list?"],
    optimal_approach: "Iterative with three pointers — O(n) time, O(1) space"
  },
  {
    id: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    category: "Backtracking / Graphs",
    description: `Given an \`m × n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid. The word can be constructed from adjacent cells (horizontally or vertically). The same cell may not be used more than once.`,
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
      { input: '... word = "SEE"', output: "true" },
      { input: '... word = "ABCB"', output: "false" }
    ],
    constraints: ["1 ≤ m, n ≤ 6", "1 ≤ word.length ≤ 15", "board and word contain only uppercase English letters"],
    starter_code: `function exist(board, word) {\n  // your code here\n}`,
    clarifying_questions: ["Can we move diagonally?", "Can a cell be reused?", "Is the grid always rectangular?"],
    optimal_approach: "DFS + backtracking — O(m·n·4^L) time where L = word length"
  }
];
