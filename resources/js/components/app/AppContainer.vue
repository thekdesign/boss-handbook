<template>
    <div class="flex flex-col min-h-screen">
        <header
            class="sticky top-0 z-50 flex items-center gap-4 px-4 py-3 bg-primary-800 text-paper-100 shadow-[0_4px_18px_rgba(10,20,40,0.18)] sm:px-6"
        >
            <button
                type="button"
                class="inline-flex items-center justify-center w-9 h-9 -ml-1 rounded-full text-paper-100 transition-colors hover:bg-primary-700 hover:text-gold-200"
                aria-label="開啟選單"
                @click="drawerOpen = true"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
            </button>

            <RouterLink :to="{name: 'HOME_INDEX'}" class="flex items-baseline gap-2.5 min-w-0">
                <span class="text-2xl leading-none">🗂️</span>
                <span class="font-serif font-bold text-base sm:text-lg tracking-wider truncate">
                    慣老闆常用手法手冊
                </span>
                <span class="hidden sm:inline font-mono text-[0.65rem] tracking-[0.18em] opacity-65 whitespace-nowrap uppercase">
                    HRM-INTERNAL-2026 · {{ String(caseStore.list.length).padStart(3, '0') }} DOCS
                </span>
            </RouterLink>
        </header>

        <div class="w-full max-w-[1080px] mx-auto px-4 sm:px-6 flex-1 min-w-0">
            <main class="min-w-0 pt-7 pb-16">
                <RouterView v-slot="{Component}">
                    <Transition name="route-fade" mode="out-in">
                        <component :is="Component" />
                    </Transition>
                </RouterView>
            </main>
        </div>

        <!-- Drawer 選單（手機與桌面共用） -->
        <Teleport to="body">
            <Transition name="mask-fade">
                <div
                    v-if="drawerOpen"
                    class="fixed inset-0 z-[60] bg-primary-900/50 backdrop-blur-sm"
                    @click="drawerOpen = false"
                />
            </Transition>
            <Transition name="drawer-slide">
                <aside
                    v-if="drawerOpen"
                    class="fixed top-0 left-0 z-[70] h-full w-[300px] max-w-[85vw] bg-paper-100 shadow-[8px_0_28px_rgba(10,20,40,0.18)] overflow-y-auto"
                >
                    <div class="flex items-center justify-between px-5 py-3 border-b border-paper-300 bg-primary-800 text-paper-100">
                        <div class="flex flex-col">
                            <span class="font-mono text-[0.6rem] tracking-[0.2em] opacity-70 uppercase">§ Menu</span>
                            <span class="font-serif font-bold text-base">
                                <span class="mr-1">🗂️</span>檔案索引
                            </span>
                        </div>
                        <button
                            type="button"
                            class="flex h-8 w-8 items-center justify-center rounded-full text-paper-200 transition-colors hover:bg-primary-700 hover:text-paper-100"
                            aria-label="關閉選單 (Esc)"
                            @click="drawerOpen = false"
                        >
                            ✕
                        </button>
                    </div>
                    <div class="px-4 py-5">
                        <AppSidebar @navigate="drawerOpen = false" />
                    </div>
                </aside>
            </Transition>
        </Teleport>

        <footer class="text-center px-4 py-6 text-xs text-gray-500 space-y-2">
            <div>內容為一般性職場觀察與法規整理，僅供參考，個案請洽勞工局或執業律師</div>
            <div class="flex justify-center flex-wrap gap-x-3 gap-y-1">
                <a
                    href="https://forms.gle/UBzoXfrQSRkCgHrS8"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary-700 hover:text-seal-600 transition-colors underline-offset-2 hover:underline"
                >
                    📨 投稿新手法
                </a>
                <span class="text-gray-400">·</span>
                <a
                    href="mailto:thek8014@proton.me?subject=%E3%80%90%E6%85%A3%E8%80%81%E9%97%86%E6%89%8B%E5%86%8A%E3%80%91%E5%95%8F%E9%A1%8C%E5%8F%8D%E6%98%A0"
                    class="text-primary-700 hover:text-seal-600 transition-colors underline-offset-2 hover:underline"
                >
                    🐛 反映問題
                </a>
            </div>
        </footer>
    </div>
</template>

<script>
import {ref, watch, onMounted, onBeforeUnmount} from 'vue';
import {useRoute} from 'vue-router';
import {useCaseStore} from 'stores/case/case';
import AppSidebar from 'components/app/AppSidebar.vue';

export default {
    name: 'AppContainer',
    components: {AppSidebar},
    setup() {
        const caseStore = useCaseStore();
        const route = useRoute();
        const drawerOpen = ref(false);

        // 換頁時自動關閉 drawer
        watch(() => route.fullPath, () => {
            drawerOpen.value = false;
        });

        // drawer 開啟時鎖住 body 滾動
        watch(drawerOpen, (open) => {
            document.body.style.overflow = open ? 'hidden' : '';
        });

        // ESC 關閉 drawer
        const handleEsc = (e) => {
            if (e.key === 'Escape' && drawerOpen.value) drawerOpen.value = false;
        };
        onMounted(() => window.addEventListener('keydown', handleEsc));
        onBeforeUnmount(() => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        });

        return {caseStore, drawerOpen};
    },
};
</script>

<style>
.route-fade-enter-active,
.route-fade-leave-active {
    transition: opacity 200ms ease, transform 200ms ease;
}
.route-fade-enter-from {
    opacity: 0;
    transform: translateY(6px);
}
.route-fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}

.mask-fade-enter-active,
.mask-fade-leave-active {
    transition: opacity 220ms ease;
}
.mask-fade-enter-from,
.mask-fade-leave-to {
    opacity: 0;
}

.drawer-slide-enter-active,
.drawer-slide-leave-active {
    transition: transform 260ms cubic-bezier(0.32, 0.72, 0.24, 1);
}
.drawer-slide-enter-from,
.drawer-slide-leave-to {
    transform: translateX(-100%);
}
</style>
