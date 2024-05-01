let todos = [];

function agregarTodo() {
    const todoInput = document.getElementById("todoInput");
    const todoText = todoInput.value;
    if (todoText === "") {
        alert("Por favor ingrese una tarea");
        return;
    }
    const todo = {
        tarea: todoText,
        completado: false,
        fechaCreacion: new Date(),
        fechaCompletado: null
    };
    todos.push(todo);
    mostrarTodos();
    todoInput.value = "";
}



function mostrarTodos() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const completado = todo.completado ? "text-decoration: line-through" : "";
        todoList.innerHTML += `<li style="${completado}" id="${index}" onclick="toggleCompletado(${index})"><input id="i${index}" type="checkbox">${todo.tarea} - Creado el: ${todo.fechaCreacion.toLocaleString()} ${todo.completado ? "- Completado el: " + todo.fechaCompletado.toLocaleString() : ""}</li>`;
    });
}


function toggleCompletado(index) {
    todos[index].completado = !todos[index].completado;
    if (todos[index].completado) {
        todos[index].fechaCompletado = new Date();
    } else {
        todos[index].fechaCompletado = null;
    }
    const checkbox = document.getElementById(`i${index}`);
    checkbox.classList.toggle("checked");
    mostrarTodos();
}

function mostrarTareaMasRapida() {
    let tareaMasRapida = null;
    let tiempoMasRapido = Infinity;
    todos.forEach(todo => {
        if (todo.completado && todo.fechaCompletado !== null) {
            const tiempoDiferencia = todo.fechaCompletado - todo.fechaCreacion;
            if (tiempoDiferencia < tiempoMasRapido) {
                tareaMasRapida = todo;
                tiempoMasRapido = tiempoDiferencia;
            }
        }
    });
    if (tareaMasRapida !== null) {
        alert(`La tarea más rápida en completarse fue "${tareaMasRapida.tarea}", completada en ${tiempoMasRapido / 1000} segundos`);
    } else {
        alert("No hay tareas completadas");
    }
}