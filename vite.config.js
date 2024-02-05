import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { watch } from "vite-plugin-watch";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.ts",
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        watch({
            pattern: "routes/*.php",
            command: "php artisan trail:generate",
        }),
        AutoImport({
            vueTemplate: true,
            dts: true,
            imports: ["vue", { "momentum-trail": ["route", "current"] }],
        }),
    ],
});
