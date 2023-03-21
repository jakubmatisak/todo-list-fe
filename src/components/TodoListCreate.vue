<template>
  <div class="d-flex justify-content-end">
    <v-btn
      color="primary"
      @click="opened = !opened"
    >
      {{ $t('todo_list.new') }}
    </v-btn>
    <v-dialog
      v-model="opened"
      max-width="700px"
    >
      <v-card>
        <v-card-title class="ma-2">
          {{ $t('todo_list.new') }}
        </v-card-title>
        <v-card-text class="">
          <v-text-field
            ref="form"
            v-model="todoListName"
            :label="$t('todo_list.list')"
            counter="15"
            :rules="[required]"
          />
          <v-btn
            color="primary mt-3"
            @click="createTodoList"
          >
            {{ $t('actions.new') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import services from "../services/axiosService.js"
import urls from "../resources/resources.json"

export default {
  name: "TodoListCreate",
  data() {
    return {
      todoListName: null,
      opened: false,
    }
  },
  computed: {
      required() { return (v) => !!v || this.$t("validation.required") },
  },
  methods: {
    async createTodoList() {
      const valid = await this.$refs.form.validate()
      if (valid.length === 0) {
        await services.post(urls.todo_lists + urls.backslash, { name: this.todoListName });
        this.$emit('newList');
        this.opened = false;
      }
    }
  }
}
</script>

<style scoped>

</style>