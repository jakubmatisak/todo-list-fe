<template>
  <v-row>
    <v-col>
      <div v-if="!loading">
        <todo-list-card
          v-for="list in lists"
          :id="list.id"
          :key="list.id"
          :name="list.name"
          :tasks="list.tasks"
          @click="openSpecificList(list.id)"
          @removeTask="removeTask"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import TodoListCard from "../components/TodoListCard.vue";
import services from "../services/axiosService.js"
import urls from "../resources/resources.json"

export default {
  name: "ToDoListView",
  components: {
    TodoListCard
  },
  data() {
    return {
      lists: [],
      urls: urls,
      loading: true,
    }
  },
  async created() {
    await this.openTodoLists();
  },
  methods: {

    async openTodoLists() {
      const todoList = await services.get(urls.todo_lists);
      this.setTasks(todoList.data);
    },
    /**
     * make Todo List
     * @param {Object} todoList
     */
    setTasks(todoList) {

      let localList = [];
      for (const item of todoList) {
        let list = {
          id: item.id,
          name: item.name,
        };
        localList.push(list);
      }

      this.lists = localList;
      this.loading = false;
    },
    /**
     * Call for specific List
     * @returns {Promise<void>}
     */
    async openSpecificList(id) {
      const specificList = await services.get(urls.todo_lists + urls.backslash + id + urls.backslash + urls.todo_items);
      this.setOneList(specificList.data, id);
    },
    /**
     * set Data for specific list
     */
    setOneList(specificList, id) {
      let localList = [];
      for (const item of specificList) {
        let list = {
          id: item.id,
          title: item.title,
          description: item.description,
          deadline: item.deadline,
          completed: item.completed,
        };
        localList.push(list);
      }

      this.lists[id-1].tasks = localList;
      this.loading = false;
    },
    removeTask(info) {
      //this.lists[info.list_id - 1].tasks[info.item_id].splice(-1);
      console.log(info);
    }
  }
};
</script>
