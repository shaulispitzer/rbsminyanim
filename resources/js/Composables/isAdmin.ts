import { usePage } from "@inertiajs/vue3";
import { computed } from "vue";
const page = usePage();

export const is_admin = computed(() => {
    if (!page.props.auth.user) {
        return false;
    }
    return page.props.auth.user.is_admin == 1;
});
