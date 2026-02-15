<template>
  <main>
    <div class="sm:px-8 mt-16 sm:mt-32">
      <div class="mx-auto max-w-7xl lg:px-8">
        <div class="relative px-4 sm:px-8 lg:px-12">
          <div class="mx-auto max-w-2xl lg:max-w-5xl">
            <header class="max-w-2xl">
              <h1
                class="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
              >
                Users
              </h1>
              <p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
                Manage users by adding, editing, or removing them using the form
                and table below.
              </p>
            </header>

            <!-- User Form -->
            <div class="mt-10">
              <form
                @submit.prevent="handleSubmit"
                class="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
              >
                <h2
                  class="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  {{ isEditing ? "Edit User" : "Add User" }}
                </h2>
                <div
                  class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  <div>
                    <label
                      class="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >Name</label
                    >
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      placeholder="Enter name"
                      class="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >Age</label
                    >
                    <input
                      v-model.number="form.age"
                      type="number"
                      required
                      min="1"
                      placeholder="Enter age"
                      class="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                  <div>
                    <label
                      class="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                      >Description</label
                    >
                    <input
                      v-model="form.description"
                      type="text"
                      required
                      placeholder="Enter description"
                      class="mt-1 w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                </div>
                <div class="mt-6 flex gap-3">
                  <button
                    type="submit"
                    :disabled="loading"
                    class="rounded-md bg-teal-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {{ isEditing ? "Update" : "Add" }}
                  </button>
                  <button
                    v-if="isEditing"
                    type="button"
                    @click="cancelEdit"
                    class="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <!-- Users Table -->
            <div class="mt-10">
              <div
                class="overflow-x-auto rounded-2xl border border-zinc-100 dark:border-zinc-700/40"
              >
                <table class="w-full text-left text-sm">
                  <thead
                    class="border-b border-zinc-100 bg-zinc-50 dark:border-zinc-700/40 dark:bg-zinc-800/50"
                  >
                    <tr>
                      <th
                        class="px-6 py-3 font-medium text-zinc-600 dark:text-zinc-400"
                      >
                        ID
                      </th>
                      <th
                        class="px-6 py-3 font-medium text-zinc-600 dark:text-zinc-400"
                      >
                        Name
                      </th>
                      <th
                        class="px-6 py-3 font-medium text-zinc-600 dark:text-zinc-400"
                      >
                        Age
                      </th>
                      <th
                        class="px-6 py-3 font-medium text-zinc-600 dark:text-zinc-400"
                      >
                        Description
                      </th>
                      <th
                        class="px-6 py-3 font-medium text-zinc-600 dark:text-zinc-400"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="loading && users.length === 0">
                      <td
                        colspan="5"
                        class="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
                      >
                        Loading...
                      </td>
                    </tr>
                    <tr v-else-if="users.length === 0">
                      <td
                        colspan="5"
                        class="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
                      >
                        No users found. Add one using the form above.
                      </td>
                    </tr>
                    <tr
                      v-for="user in users"
                      :key="user.id"
                      class="border-b border-zinc-100 last:border-0 dark:border-zinc-700/40"
                    >
                      <td
                        class="px-6 py-4 text-zinc-900 dark:text-zinc-100"
                      >
                        {{ user.id }}
                      </td>
                      <td
                        class="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100"
                      >
                        {{ user.name }}
                      </td>
                      <td
                        class="px-6 py-4 text-zinc-600 dark:text-zinc-400"
                      >
                        {{ user.age }}
                      </td>
                      <td
                        class="px-6 py-4 text-zinc-600 dark:text-zinc-400"
                      >
                        {{ user.description }}
                      </td>
                      <td class="px-6 py-4">
                        <div class="flex gap-2">
                          <button
                            @click="editUser(user)"
                            class="rounded px-3 py-1 text-sm font-medium text-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-900/20"
                          >
                            Edit
                          </button>
                          <button
                            @click="deleteUser(user.id)"
                            class="rounded px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "src/stores/userStore";

const $q = useQuasar();
const userStore = useUserStore();

const users = computed(() => userStore.users);
const loading = computed(() => userStore.loading);
const isEditing = ref(false);
const editingId = ref(null);

const form = ref({
  name: "",
  age: "",
  description: "",
});

const notify = (message, type = "success") => {
  $q.notify({
    message,
    color: type === "success" ? "positive" : "negative",
    position: "top",
    timeout: 3000,
  });
};

const resetForm = () => {
  form.value = { name: "", age: "", description: "" };
  isEditing.value = false;
  editingId.value = null;
};

const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      const res = await userStore.updateUser(editingId.value, form.value);
      if (res?.success) {
        notify("User updated successfully");
        resetForm();
      }
    } else {
      const res = await userStore.addUser(form.value);
      if (res?.success) {
        notify("User added successfully");
        resetForm();
      }
    }
  } catch (err) {
    const errorMsg = err.response?.data?.error || "Something went wrong";
    notify(errorMsg, "error");
  }
};

const editUser = (user) => {
  form.value = {
    name: user.name,
    age: user.age,
    description: user.description,
  };
  isEditing.value = true;
  editingId.value = user.id;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const deleteUser = async (id) => {
  try {
    const res = await userStore.deleteUser(id);
    if (res?.success) {
      notify("User deleted successfully");
      if (editingId.value === id) {
        resetForm();
      }
    }
  } catch (err) {
    notify("Failed to delete user", "error");
  }
};

onMounted(() => {
  userStore.fetchUsers();
});
</script>
