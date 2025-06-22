import { defineStore } from 'pinia';
import { ref, computed, watch, onMounted } from 'vue';

// Define the store
export const useTodoStore = defineStore('todos', () => {
    // === STATE ===
    // Semua data reaktif yang sebelumnya ada di App.vue
    const todos = ref([]);
    const newTodo = ref('');
    const filter = ref('all');

    // === GETTERS ===
    // Semua computed properties, sekarang menjadi getters di store
    const filteredTodos = computed(() => {
        switch (filter.value) {
            case 'active':
                return todos.value.filter((todo) => !todo.completed);
            case 'completed':
                return todos.value.filter((todo) => todo.completed);
            default:
                return todos.value;
        }
    });

    const completedCount = computed(
        () => todos.value.filter((todo) => todo.completed).length
    );

    const activeCount = computed(
        () => todos.value.filter((todo) => !todo.completed).length
    );

    // === ACTIONS ===
    // Semua method, sekarang menjadi actions di store
    function addTodo() {
        if (newTodo.value.trim() !== '') {
            todos.value.unshift({
                id: Date.now(),
                text: newTodo.value.trim(),
                completed: false,
            });
            newTodo.value = '';
        }
    }

    function deleteTodo(id) {
        todos.value = todos.value.filter((todo) => todo.id !== id);
    }

    function clearCompleted() {
        todos.value = todos.value.filter((todo) => !todo.completed);
    }

    // === LOGIC UNTUK LOCALSTORAGE ===
    function saveTodos() {
        localStorage.setItem('vue-pinia-todos', JSON.stringify(todos.value));
    }

    function loadTodos() {
        const savedTodos = localStorage.getItem('vue-pinia-todos');
        if (savedTodos) {
            todos.value = JSON.parse(savedTodos);
        }
    }

    // Muat data dari localStorage saat store pertama kali dibuat
    loadTodos();

    // Simpan data ke localStorage setiap kali ada perubahan
    watch(todos, saveTodos, { deep: true });

    // Kembalikan semua yang perlu diakses oleh komponen
    return {
        todos,
        newTodo,
        filter,
        filteredTodos,
        completedCount,
        activeCount,
        addTodo,
        deleteTodo,
        clearCompleted,
    };
});
