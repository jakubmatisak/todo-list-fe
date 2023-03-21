<template>
  <div>
    <v-row class="d-flex jus">
      <v-col
        cols="12"
        md="6"
      >
        <todo-list-create @newList="openTodoLists" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="list in lists"
        :key="list.id"
        md="6"
        cols="12"
      >
        <todo-list-card
          :id="list.id"
          :name="list.name"
          :tasks="list.tasks"
          @openSpecificList="openSpecificList"
          @checkDoneTask="checkDoneTask"
          @removeTask="removeTask"
          @addTask="addTask"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TodoListCard from "../components/TodoListCard.vue";
import services from "../services/axiosService.js"
import urls from "../resources/resources.json"
import TodoListCreate from "../components/TodoListCreate.vue";

export default {
  name: "ToDoListView",
  components: {
    TodoListCreate,
    TodoListCard
  },
  data() {
    return {
      lists: [],
      urls: urls,
      loading: true,
      clicked: false,
    }
  },
  async created() {
    await this.openTodoLists();
  },
  methods: {
    /**
     * open All Todo Lists
     * @returns {Promise<void>}
     */
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
    async openSpecificList(info) {

      let specificList;
      let url = new URL(import.meta.env.VITE_APP_API + urls.todo_lists + urls.backslash + info.list_id + urls.backslash + urls.todo_items);

      if(info.filter.name === undefined) {
        if (info.filter && Object.keys(info.filter).length !== 0) {
          url.searchParams.append('title', info.filter);
        }
        specificList = await services.get(url);
      } else {
        if (info.filter && info.filter.value === 'ALL') {
          specificList = await services.get(url);
        } else if (info.filter) {
          let completed = false;
          switch (info.filter.value) {
            case 'DONE':
              completed = true;
              break;
            case 'NEW':
              completed = false;
              break;
          }
          url.searchParams.append('completed', completed);
        }
        specificList = await services.get(url);
      }

      this.setOneList(specificList.data, info.list_id);
      this.lists[info.list_id - 1].clicked = true;
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

      this.lists[id - 1].tasks = localList;
      this.loading = false;
    },
    /**
     * remove one task
     * @param info
     * @returns {Promise<void>}
     */
    async removeTask(info) {
      await services.destroy(urls.todo_lists + urls.backslash + info.list_id + urls.backslash + urls.todo_items + urls.backslash + info.item_id, {alert: true});
      await this.openSpecificList(info);
    },
    /**
     * add new task
     * @param info
     * @returns {Promise<void>}
     */
    async addTask(info) {
      await services.post(urls.todo_lists + urls.backslash + info.list_id + urls.backslash + urls.todo_items, info.item, {alert: true});
    },
    /**
     * change status of task
     * @param info
     * @returns {Promise<void>}
     */
    async checkDoneTask(info) {
      await services.put(urls.todo_lists + urls.backslash + info.list_id + urls.backslash + urls.todo_items + urls.backslash + info.item_id, info.item, {alert: true});
    }
  }
};
</script>
