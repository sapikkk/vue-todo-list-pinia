import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Impor Pinia
import App from './App.vue';

// Impor Google Font
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

const app = createApp(App);

app.use(createPinia()); // Gunakan Pinia
app.mount('#app');
