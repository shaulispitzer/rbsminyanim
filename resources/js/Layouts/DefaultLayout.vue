<template>
    <div class="flex flex-col min-h-screen">
        <div
            class="header flex justify-between px-5 p-2 xl:mx-auto xl:w-[1170px]"
        >
            <!-- Hamburger open/close button shown on small screen only-->
            <div
                class="sm:hidden -mr-2 flex items-center dropdownopenclosebutton"
            >
                <button
                    @click="
                        showingNavigationDropdown = !showingNavigationDropdown
                    "
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                    <svg
                        class="h-6 w-6"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            :class="{
                                hidden: showingNavigationDropdown,
                                'inline-flex': !showingNavigationDropdown,
                            }"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                            :class="{
                                hidden: !showingNavigationDropdown,
                                'inline-flex': showingNavigationDropdown,
                            }"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <div class="flex items-center logo">
                <Link :href="route('home')">
                    <ApplicationLogo
                        class="block h-9 w-auto fill-current text-gray-800"
                    />
                </Link>
            </div>

            <!-- Primary Navigation Menu shown on big screen only-->
            <nav class="sm:flex hidden bg-white flex-1 navigationBigScreens">
                <div class="justify-between">
                    <!-- Navigation Links -->
                    <div class="flex space-x-8 h-16 -my-px ml-10">
                        <NavLink
                            v-for="item in linkItems"
                            :href="item.handler ? item.handler : '#'"
                            :active="item.name"
                            :current-route="currentRoute"
                        >
                            {{ item.label }}
                        </NavLink>
                    </div>
                </div>

                <!-- Responsive Navigation Menu shown on small screens when showing navigation is true -->
            </nav>
            <Menu as="div" class="relative inline-block">
                <MenuButton
                    class="inline-flex justify-center rounded-md bg-black/20 p-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
                >
                    <svg
                        class="ml-2 -mr-0.5 h-4 w-4 ui-open:rotate-180 transition-all"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    {{ user ? userInitial : "Guest" }}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                    </svg>
                </MenuButton>
                <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                >
                    <MenuItems
                        class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                    >
                        <div class="px-1 py-1">
                            <MenuItem
                                v-slot="{ active }"
                                v-if="user"
                                @click="router.get(route('profile.edit'))"
                            >
                                <button
                                    :class="[
                                        active
                                            ? 'bg-violet-500 text-white'
                                            : 'text-gray-900',
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                >
                                    Profile
                                </button>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <button
                                    :class="[
                                        active
                                            ? 'bg-violet-500 text-white'
                                            : 'text-gray-900',
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                    @click="
                                        user
                                            ? router.post(route('logout'))
                                            : router.get(route('login'))
                                    "
                                >
                                    {{ user ? "Log Out" : "Log In" }}
                                </button>
                            </MenuItem>

                            <MenuItem v-slot="{ active }" v-if="!user">
                                <button
                                    @click="router.get(route('register'))"
                                    :class="[
                                        active
                                            ? 'bg-violet-500 text-white'
                                            : 'text-gray-900',
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                >
                                    Register
                                </button>
                            </MenuItem>
                        </div>
                        <div class="px-1 py-1">
                            <MenuItem v-slot="{ active }" v-if="is_admin">
                                <button
                                    :class="[
                                        active
                                            ? 'bg-violet-500 text-white'
                                            : 'text-gray-900',
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                    ]"
                                >
                                    Users
                                </button>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
        </div>
        <div
            :class="{
                block: showingNavigationDropdown,
                hidden: !showingNavigationDropdown,
            }"
            class="sm:hidden linksInSmallScreen border border-purple-500"
        >
            <!-- Responsive Settings Options -->
            <div class="pt-4 pb-1 border-t border-gray-300">
                <div class="px-4">
                    <div class="font-medium text-base text-gray-800">
                        {{ $page.props.auth.user?.name }}
                    </div>
                    <div class="font-medium text-sm text-gray-500">
                        {{ $page.props.auth.user?.email }}
                    </div>
                </div>

                <div class="mt-3 space-y-1">
                    <ResponsiveNavLink
                        v-for="item in linkItems"
                        :href="item.handler ? item.handler : '#'"
                        :active="item.name"
                        :current-route="currentRoute"
                    >
                        {{ item.label }}
                    </ResponsiveNavLink>
                </div>
            </div>
        </div>
        <div class="grow grid">
            <slot />
        </div>
        <footer class="w-full">footer</footer>
    </div>
</template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { user } from "../Composables/isAuthenticated";
import { is_admin } from "@/Composables/isAdmin";
import { Link, router } from "@inertiajs/vue3";
import ApplicationLogo from "@/Components/ApplicationLogo.vue";

import NavLink from "@/Components/NavLink.vue";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink.vue";
import { route } from "momentum-trail";

const userInitial = computed(() => {
    if (user.value) {
        return user.value.name
            .split(" ")
            .map((word) => word.charAt(0))
            .join("");
    }
});
const showingNavigationDropdown = ref(false);

const linkItems = computed(() => {
    let items = [
        { label: "Dashboard", handler: route("dashboard"), name: "dashboard" },
        { label: "About", handler: null, name: "about" },
        { label: "Contact", handler: null, name: "contact" },
    ];
    return items;
});
const currentRoute = ref(route().current());
router.on("navigate", () => {
    currentRoute.value = route().current();
});
</script>
