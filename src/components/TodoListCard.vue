<template>
  <div class="cursor-pointer">
    <v-card>
      <v-card-title class=" justify-space-between text-h5">
        <div class="mb-3">
          {{ name }}
        </div>
        <div class="d-flex ">
          <v-btn
            color="primary"
            class="mr-2 mt-2"
            @click="openSpecificList(id)"
          >
            {{ $t('actions.open') }}
          </v-btn>
          <v-btn
            color="secondary"
            class="mt-2"
            @click="openAddTaskDialog"
          >
            {{ $t('actions.new') }}
          </v-btn>
        </div>
      </v-card-title>
      <v-dialog
        v-model="dialog.new"
        max-width="700px"
      >
        <v-card>
          <v-card-title>{{ $t('todo_list.new_task') }}</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="newTask.title"
                :label="$t('todo_list.title')"
                :rules="[required]"
                type="text"
              />
              <v-text-field
                v-model="newTask.description"
                :label="$t('todo_list.description')"
                :rules="[required]"
                type="text"
              />
              <v-text-field
                v-model="newTask.deadline"
                :label="$t('todo_list.deadline')"
                :rules="[required, date]"
                type="date"
              />
              <v-btn
                color="primary"
                class="mt-2"
                @click="addTask()"
              >
                {{ $t('actions.add') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="dialog.items"
        max-width="700px"
        min-height="95%"
      >
        <v-card>
          <v-card-title>
            {{ $t('todo_list.all_tasks') }}
            <div>{{ name }}</div>
          </v-card-title>
          <v-row class="pa-4">
            <v-col
              cols="12"
              md="12"
            >
              <v-select
                v-model="filter"
                return-object
                :items="items"
                item-title="value"
                @update:modelValue="changeFilter(id)"
              />
              <v-text-field
                v-model="search"
                :label="$t('actions.search')"
                @update:modelValue="changeSearch(id)"
              />
            </v-col>
            <v-col
              v-for="task in tasks"
              :id="task.id"
              :key="task.id"
              cols="12"
              md="6"
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
                </v-card-text>
                <v-card-text>
                  <div>{{ $t('actions.status') }}</div>
                  <v-checkbox
                    v-model="task.completed"
                    class="d-flex"
                    :label=" task.completed ? $t('todo_list.done') : $t('todo_list.to_be_done')"
                    @click="checkDoneTask(task.id)"
                  />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
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
  data: () => ({
    filter: {name: 'ALL', value: 'ALL'},
    items: [{name: 'ALL', value: 'ALL'}, {name: 'DONE', value: 'DONE'}, {name: 'NEW', value: 'NEW'}],
    search: '',
    newTask: {},
    item: {
      title: '',
      description: '',
      deadline: '',
      completed: false,
    },
    opened: false,
    dialog: {
      new: false,
      items: false,
    },
  }),
  computed: {
    required() {
      return (v) => !!v || this.$t("validation.required")
    },
    date() {
      const pattern = /^(?:\d{4})-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01]))$/;
      return (v) => !v || pattern.test(v) || this.$t("validations.rules.date");
    },
  },
  methods: {
    /**
     * add new task to list
     */
    openSpecificList(index, filterValue = {}) {
      this.dialog.items = true;
      this.$emit('openSpecificList', { list_id: index, filter: filterValue});
    },
    /**
     *open dialog for new task
     */
    openAddTaskDialog() {
      this.dialog.new = true;
    },
    /**
     * add new task to list
     */
    async addTask() {
      const valid = await this.$refs.form.validate()
      if (valid.valid) {
        this.$emit('addTask', {list_id: this.id, item: this.newTask});
        this.dialog.new = false;
      }
    },
    /**
     * remove task from list
     * @param index - id of removed task from list
     */
    removeTask(index) {
      this.$emit('removeTask', {list_id: this.id, item_id: index});
    },
    /**
     * remove task from list
     * @param index - id of removed task from list
     */
    checkDoneTask(index) {
      let completed;

      let filteredItem = this.tasks.filter(function (el) {
        return el.id === index;
      })

      if (filteredItem.completed === true) {
        completed = false;
      } else {
        completed = true;
      }

      const doneTask = {
        completed: completed
      };

      this.$emit('checkDoneTask', {list_id: this.id, item_id: index, item: doneTask});
    },
    /**
     * status filter
     * @param index
     */
    changeFilter(index) {
      this.openSpecificList(index, this.filter);
    },
    /**
     * search filter
     * @param index
     */
    changeSearch(index) {
      this.openSpecificList(index, this.search);
    }
  }
};
</script>

<style lang="scss">

.cursor-pointer {
  cursor: pointer;
}
</style>
