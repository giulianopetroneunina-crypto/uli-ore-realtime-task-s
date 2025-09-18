import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { firebaseConfig } from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const appDiv = document.getElementById('app');
const tasksRef = ref(db, 'tasks');

function render(tasks) {
    appDiv.innerHTML = `
      <input id="taskinput" placeholder="Scrivi un task..."/>
      <button id="addtask">Aggiungi</button>
      <ul>
        ${Object.values(tasks || {}).map(t => `<li>${t.text || ''}</li>`).join('')}
      </ul>
    `;
    document.getElementById('addtask').onclick = () => {
      const val = document.getElementById('taskinput').value;
      if (val) push(tasksRef, { text: val });
    };
}

onValue(tasksRef, snap => render(snap.val() || {}));
