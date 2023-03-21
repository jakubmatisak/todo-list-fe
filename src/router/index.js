import { createRouter, createWebHashHistory } from "vue-router";
import TodoListView from "../views/TodoListView.vue";
import WelcomeHome from "../views/WelcomeHome.vue";
const routes = [
	{
		path: "/",
		name: "Welcome Home",
		component: WelcomeHome,
	},
	{
		path: "/todo",
		name: "To Do List",
		component: TodoListView,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;