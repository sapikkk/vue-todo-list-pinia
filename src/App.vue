<template>
  <div id="app-container">
    <div class="container">
      <h1>TODO LIST</h1>
      <h2 style="text-align: center">M SYAFIQ 213510100</h2>

      <!-- Form untuk menambah tugas -->
      <!-- Menggunakan action `addTodo` dari store -->
      <form @submit.prevent="addTodo" class="todo-form">
        <!-- v-model dihubungkan ke `newTodo` dari store -->
        <input
          v-model="newTodo"
          type="text"
          placeholder="Tambahkan tugas baru..."
          required
          class="todo-input"
        />
        <button type="submit" class="add-btn">Masukkan</button>
      </form>

      <!-- Filter -->
      <div class="filters">
        <!-- Mengubah state `filter` di dalam store -->
        <button
          @click="filter = 'all'"
          :class="{ active: filter === 'all' }"
          class="filter-btn"
        >
          Semua
        </button>
        <button
          @click="filter = 'active'"
          :class="{ active: filter === 'active' }"
          class="filter-btn"
        >
          Aktif
        </button>
        <button
          @click="filter = 'completed'"
          :class="{ active: filter === 'completed' }"
          class="filter-btn"
        >
          Selesai
        </button>
      </div>

      <!-- Counter -->
      <div class="counter">
        <!-- Menggunakan getter `activeCount` dan `completedCount` dari store -->
        <p>
          Total: {{ todoStore.todos.length }} | Selesai: {{ completedCount }} |
          Aktif:
          {{ activeCount }}
        </p>
      </div>

      <!-- Daftar tugas -->
      <!-- Looping `filteredTodos` dari store -->
      <ul class="todo-list">
        <li v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
          <div class="todo-content">
            <input
              type="checkbox"
              v-model="todo.completed"
              class="todo-checkbox"
            />
            <span :class="{ completed: todo.completed }" class="todo-text">
              {{ todo.text }}
            </span>
          </div>
          <!-- Menggunakan action `deleteTodo` dari store -->
          <button @click="deleteTodo(todo.id)" class="delete-btn">Hapus</button>
        </li>
      </ul>

      <!-- Tombol clear completed -->
      <div v-if="completedCount > 0" class="actions">
        <!-- Menggunakan action `clearCompleted` dari store -->
        <button @click="clearCompleted" class="clear-btn">
          Hapus Tugas Selesai ({{ completedCount }})
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTodoStore } from "./stores/todoStore";

// Inisialisasi store
const todoStore = useTodoStore();

// Gunakan storeToRefs untuk menjaga reaktivitas pada state dan getters
// Ini memungkinkan kita untuk mendestrukturisasi tanpa kehilangan reaktivitas
const { newTodo, filter, filteredTodos, completedCount, activeCount } =
  storeToRefs(todoStore);

// Actions bisa didestrukturisasi secara langsung karena mereka adalah fungsi
const { addTodo, deleteTodo, clearCompleted } = todoStore;
</script>
<style>
/* General styling */
:root {
  --primary-color: #4f46e5;
  --secondary-color: #ec4899;
  --background-color: #f3f4f6;
  --container-bg: #ffffff;
  --text-color: #1f2937;
  --text-light: #6b7286;
  --border-color: #d1d5db;
  --danger-color: #ef4444;
  --success-color: #22c55e;
}

body {
  font-family: "Inter", sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
}

#app-container {
  width: 100%;
  max-width: 600px;
  padding: 2rem 1rem;
}

h1 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-weight: 700;
}

h2 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-weight: 700;
}

.container {
  background: var(--container-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Form */
.todo-form {
  display: flex;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}

.todo-input {
  flex-grow: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.todo-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
}

.add-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-btn:hover {
  background-color: #4338ca;
}

/* Filters and Actions */
.filters,
.actions {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}

.filter-btn,
.clear-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background-color: transparent;
  color: var(--text-light);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background-color: #e5e7eb;
  color: var(--text-color);
}

.filter-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.clear-btn {
  border-color: var(--danger-color);
  color: var(--danger-color);
}

.clear-btn:hover {
  background-color: var(--danger-color);
  color: white;
}

/* Counter */
.counter {
  text-align: center;
  color: var(--text-light);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

/* Todo List */
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item:hover {
  background-color: #f9fafb;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
}

.todo-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
  accent-color: var(--primary-color);
}

.todo-text {
  transition: color 0.3s;
}

.todo-text.completed {
  text-decoration: line-through;
  color: var(--text-light);
}

.delete-btn {
  background: transparent;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  color: var(--danger-color);
  background-color: #fee2e2;
}
</style>
