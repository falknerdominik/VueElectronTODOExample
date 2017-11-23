<template>
<section class="todo-component">
  <header>
      <h1>todos</h1>
      <!-- input for todo -->
      <input class="userinput" autofocus autocomplete="off"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="createTodo">
  </header>

    <main v-show="todos.length" v-cloak>
        <ul class="todo-list">
          <li v-for="todo in todos" class="todo" :key="todo.key">
              <div class="view">
                <input @keyup.enter.capture="updateTodo(todo)" v-model.trim="todo.text">
                <div class="button" @click="removeTodo(todo)">x</div>
              </div>
          </li>
        </ul>
    </main>
    <footer class="footer" v-show="todos.length" v-cloak>
        <strong>Number of Todos {{ todos.length }}</strong>
    </footer>
</section>
</template>

<script>
  var data = {
    todos: [],
    newTodo: '',
    config: {
      'host': 'localhost',
      'port': '3000',
      'path': '/todo'
    }
  }

  export default {
    name: 'todoapp',
    // components: { SystemInformation },
    created: function() {
        this.$http({ 
            url: this.endpoint,
            method: "GET"
        })
          .then((res) => this.todos = res.data)
          .catch((err) => console.error(err));
    },

    data: function() { 
      data.endpoint = "http://" + data.config.host + ":" + data.config.port + data.config.path; 
      return data;
    },

    methods: {
      makeRequest(method = "GET", query = "") {
        return this.$http({ 
            url: this.endpoint + query,
            method: method
        });
      },

      createTodo(event) {
        this.makeRequest("POST", "?text=" + encodeURIComponent(event.srcElement.value))
          .then(() => {
            console.log("create successful")
            this.makeRequest().then((res) => this.todos = res.data);
            this.newTodo = '';
          });
      },

      updateTodo(todo) {
        this.makeRequest("PUT", "/" + todo.key + "?text=" + encodeURIComponent(todo.text))
          .then(() => {
            console.log("update successful")
            this.makeRequest().then((res) => this.todos = res.data);
          });
      },

      removeTodo(todo) {
        this.makeRequest("DELETE", "/" + todo.key)
          .then(() => {
            console.log("remove successful")
            this.makeRequest().then((res) => this.todos = res.data);
          });
      }
    },

    computed: {
      remaining: function () {
        return this.todos.length
      }
    },
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

body { font-family: 'Source Sans Pro', sans-serif; }

.todo-component {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header{
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header h1 {
  padding: 5px;
  font-size: 50px;
}

ul.todo-list {
  list-style: none;
}

.todo .view {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: space-between;
}

.view input {
  margin: 10px;
  padding: 5px;
  border: none;
  border-bottom: 1px dashed gray;
  font-size: 22px;
}

.view .button {
  background: rgb(249, 249, 249) linear-gradient(rgb(249, 249, 249) 5%, rgb(233, 233, 233) 100%) repeat scroll 0% 0%; 
  border: 1px solid rgb(220, 220, 220); 
  display: block; cursor: pointer; 
  color: rgb(102, 102, 102); 
  font-family: Arial; 
  font-size: 12px; 
  font-weight: bold; 
  padding: 6px 12px; 
  text-decoration: none;
}

.view .button:hover {
  border: 1px solid lightsalmon;
}

input.userinput {
  font-family: 'Ubuntu', sans-serif;
  display: block;
  margin: 10px;
  padding: 5px;
  border: none;
  border-bottom: 1px dashed gray;
  font-size: 22px;
}

input:focus {
  outline: 0;
}

</style>
