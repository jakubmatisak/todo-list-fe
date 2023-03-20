<template>
  <div>
    <v-card>
      <v-card-title class="text-h5">
        {{ name }}
      </v-card-title>
      <v-card-text>
        <v-btn
          color="primary"
          @click="addTask()"
        >
          {{ $t('actions.add') }}
        </v-btn>
      </v-card-text>
      <v-row>
        <v-col
          v-for="task in tasks"
          :id="task.id"
          :key="task.id"
          cols="12"
          md="4"
        >
          <v-card :color="task.completed ? 'success' : '' ">
            <v-card-title class="text-h6 d-flex justify-space-between">
              <div>{{ task.title }}</div>
              <v-icon
                class="d-flex align-self-end"
                @click="removeTask(task.id)"
              >
                mdi-delete
              </v-icon>
            </v-card-title>
            <v-card-text>
              <div>{{ task.description }}</div>
              <div>{{ task.deadline }}</div>
              <div>{{ task.completed }}</div>
            </v-card-text>
            <v-card-text class="d-flex justify-start">
              <v-checkbox
                v-model="task.completed"
                class="d-flex"
                :label=" task.completed ? 'Done' : 'To be done'"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>

export default {
  name: "TodoListCard",
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    tasks: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newTodo: '',
      item: {},
    };
  },
  methods: {
    addTask() {
      this.newTask = {
        title: '',
        description: '',
        deadline: '',
        completed: false,
      }
     // this.tasks.push(this.newTask)
    },

    // eslint-disable-next-line no-unused-vars
    removeTask(index) {
      this.$emit('removeTask', {list_id: this.id, item_id: index })
    },
  }
};
</script>

<style lang="scss">
.card-actions {
  width: 15rem;
}
</style>
