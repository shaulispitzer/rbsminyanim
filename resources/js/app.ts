import "./bootstrap";
import "../css/app.css";
import "@formkit/themes/genesis";

import { createApp, h, DefineComponent } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { trail } from "momentum-trail";
import routes from "../scripts/routes/routes.json";
import DefaultLayout from "./Layouts/DefaultLayout.vue";

import { plugin as pluginFK, defaultConfig } from "@formkit/vue";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob<DefineComponent>("./Pages/**/*.vue"),
        );
        {
            page.default.layout = DefaultLayout;
        }
        return page;
    },

    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(trail, { routes, absolute: true })
            .use(pluginFK, defaultConfig)
            .mount(el);
    },
    progress: {
        color: "#4B5563",
        showSpinner: true,
    },
});

// resolve: (name) => {
//         return resolvePageComponent(`../views/Pages/${name}.vue`, import.meta.glob("../views/Pages/**/*.vue")).then(
//             (page) => {
//                 if (page.default.layout === undefined) {
//                     if (name.startsWith("Admin/")) {
//                         page.default.layout = AdminLayout
//                     } else {
//                         page.default.layout = DefaultLayout
//                     }
//                 }
//                 return page
//             }
//         )
//     },

// createInertiaApp({
//     resolve: (name) => {
//         const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
//         let page = pages[`./Pages/${name}.vue`];
//         page.default.layout = page.default.layout || Layout;
//         return page;
//     },
//     // ...
// });

// original code
// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) =>
//         resolvePageComponent(
//             `./Pages/${name}.vue`,
//             import.meta.glob<DefineComponent>("./Pages/**/*.vue")
//         ),
//     setup({ el, App, props, plugin }) {
//         createApp({ render: () => h(App, props) })
//             .use(plugin)
//             .use(ZiggyVue, Ziggy)
//             .use(pluginFK, defaultConfig)
//             .mount(el);
//     },
//     progress: {
//         color: "#4B5563",
//     },
// });

// const pages = import.meta.glob<DefineComponent>("./Pages/**/*.vue", {
//     eager: true,
// });
// let page = pages[`./Pages/${name}.vue`];
// page.default.layout = page.default.layout || DefaultLayout;
// return page;
