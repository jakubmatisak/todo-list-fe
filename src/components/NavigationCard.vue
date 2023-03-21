<template>
  <div class="navigation">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="navigate(item.path)"
        >
          <template #prepend>
            <v-icon :icon="item.icon" />
          </template>
          <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
          <v-list-item-title v-text="item.title" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          icon
          @click="changeLocale"
        >
          <v-icon>mdi-web</v-icon>
          {{ locale }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>

export default {
	name: "NavigationCard",
	data: () => ({
		drawer: false,
		locale: "sk",
		items: [
			{
				title: "Home",
				icon: "mdi-home",
				path: "/",
			},
			{
        title: "Todo List",
				icon: "mdi-account",
				path: "/todo",
			},
		],
	}),
	methods: {
    /**
     * Navigate in menu
     * @param {string} path - The path to navigate to.
     */
		navigate(path) {
			this.$router.push(path);
			this.drawer = false;
		},
		/**
     * Change local language in I18n library.
     */
		changeLocale() {
			switch (this.locale) {
			case "sk":
				this.locale = "en";
				this.$i18n.locale = "en";
				break;
			case "en":
				this.locale = "sk";
				this.$i18n.locale = "sk";
				break;
			default:
				this.locale = "sk";
				this.$i18n.locale = "sk";
				break;
			}
		},
	},
};
</script>

