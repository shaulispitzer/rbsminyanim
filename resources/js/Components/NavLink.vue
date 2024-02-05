<script setup lang="ts">
import { computed, ref } from "vue";
import { Link, router, usePage } from "@inertiajs/vue3";

const props = defineProps<{
    href: string;
    active?: string;
    currentRoute?: string;
}>();
const activeLink = computed(() => {
    return props.active && props.active === props.currentRoute;
});

const classes = computed(() =>
    activeLink.value
        ? "items-center px-1 pt-1 border-b-2 border-indigo-400 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-300 ease-in-out"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out",
);
</script>

<template>
    <Link
        :href="href"
        :class="classes"
        class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5"
        as="button"
        :disabled="activeLink"
    >
        <slot />
    </Link>
</template>
