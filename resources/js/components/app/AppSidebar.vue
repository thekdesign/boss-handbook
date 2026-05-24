<template>
    <div class="flex flex-col gap-5 text-sm">
        <!-- 搜尋框 -->
        <div class="relative">
            <input
                v-model="filtersStore.searchQuery"
                type="search"
                placeholder="🔍 搜尋手法、關鍵字..."
                class="w-full rounded-full border border-paper-300 bg-white px-4 py-2 pr-9 text-sm text-gray-700 transition-colors placeholder:text-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
            />
            <button
                v-if="filtersStore.searchQuery"
                type="button"
                class="absolute inset-y-0 right-1.5 my-auto flex h-6 w-6 items-center justify-center rounded-full p-0 text-xs leading-none text-gray-500 hover:bg-paper-200 hover:text-primary-700"
                aria-label="清除搜尋"
                @click="filtersStore.clearSearch()"
            >
                ✕
            </button>
        </div>

        <!-- 主選單：最新／結語 -->
        <nav class="flex flex-col gap-0.5">
            <h3 class="px-3 mb-1 font-mono text-[0.65rem] font-bold tracking-[0.2em] text-gray-500 uppercase">§ Menu</h3>
            <button
                type="button"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-paper-200 hover:text-primary-700"
                @click="goToAnchor('#part-latest')"
            >
                <span class="text-base leading-none">🆕</span>
                <span>最新手法</span>
            </button>
            <RouterLink
                v-if="epilogueId"
                :to="{name: 'CASE_DETAIL', params: {caseId: epilogueId}}"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-gray-700 transition-colors hover:bg-paper-200 hover:text-primary-700"
                @click="$emit('navigate')"
            >
                <span class="text-base leading-none">📜</span>
                <span>結語</span>
            </RouterLink>
        </nav>

        <!-- 分類錨點 -->
        <nav class="flex flex-col gap-0.5">
            <h3 class="px-3 mb-1 font-mono text-[0.65rem] font-bold tracking-[0.2em] text-gray-500 uppercase">§ Index · 卷宗</h3>
            <button
                v-for="p in partList"
                :key="p.key"
                type="button"
                class="group flex items-center gap-2 rounded px-3 py-2 text-left text-gray-700 transition-colors hover:bg-paper-200"
                :style="{'--accent': p.accent}"
                @click="goToAnchor(`#part-${p.key.toLowerCase()}`)"
            >
                <span class="font-mono text-[0.62rem] tracking-[0.1em] text-gray-400 group-hover:text-[var(--accent)]">{{ p.abbrev }}</span>
                <span class="text-base leading-none">{{ p.emoji }}</span>
                <span class="flex-1 truncate group-hover:text-[var(--accent)]">{{ partShortLabel(p.label) }}</span>
                <span class="font-mono text-[0.65rem] text-gray-400">{{ String(partCounts[p.key] || 0).padStart(2, '0') }}</span>
            </button>
        </nav>

        <!-- 友站 -->
        <div class="flex flex-col gap-0.5 pt-4 border-t border-paper-300">
            <h3 class="px-3 mb-1 font-mono text-[0.65rem] font-bold tracking-[0.2em] text-gray-500 uppercase">§ Sister Site</h3>
            <a
                href="https://law-dictionary.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-paper-200 hover:text-primary-700"
            >
                <span class="text-base leading-none">⚖️</span>
                <span class="flex-1 truncate">法律奇想終極全紀錄</span>
                <span class="font-mono text-[0.62rem] tracking-[0.1em] text-gray-400">↗</span>
            </a>
        </div>

        <!-- 投稿 / 反映 -->
        <div class="flex flex-col gap-0.5 pt-4 border-t border-paper-300">
            <h3 class="px-3 mb-1 font-mono text-[0.65rem] font-bold tracking-[0.2em] text-gray-500 uppercase">§ Feedback</h3>
            <a
                href="https://forms.gle/UBzoXfrQSRkCgHrS8"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-paper-200 hover:text-primary-700"
            >
                <span class="text-base leading-none">📨</span>
                <span>投稿新手法</span>
                <span class="ml-auto font-mono text-[0.62rem] tracking-[0.1em] text-gray-400">↗</span>
            </a>
            <a
                href="mailto:thek8014@proton.me?subject=%E3%80%90%E6%85%A3%E8%80%81%E9%97%86%E6%89%8B%E5%86%8A%E3%80%91%E5%95%8F%E9%A1%8C%E5%8F%8D%E6%98%A0"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-paper-200 hover:text-primary-700"
            >
                <span class="text-base leading-none">🐛</span>
                <span>反映問題</span>
            </a>
        </div>
    </div>
</template>

<script>
import {computed} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useCaseStore} from 'stores/case/case';
import {useFiltersStore} from 'stores/ui/filters';
import {partList} from 'maps/common/Part';

export default {
    name: 'AppSidebar',
    emits: ['navigate'],
    setup(_props, {emit}) {
        const route = useRoute();
        const router = useRouter();
        const caseStore = useCaseStore();
        const filtersStore = useFiltersStore();

        const epilogueId = computed(() => {
            const ep = caseStore.list.find((c) => c.id === 99);
            return ep ? ep.id : null;
        });

        const partCounts = computed(() => caseStore.list.reduce((acc, c) => {
            if (c.id === 99) return acc;
            acc[c.partKey] = (acc[c.partKey] || 0) + 1;
            return acc;
        }, {}));

        // 「物理衝擊與身體權限」太長，sidebar 顯示截斷成「物理衝擊」
        const partShortLabel = (label) => label.split('與')[0];

        const scrollToHash = (hash) => {
            const el = document.querySelector(hash);
            if (!el) return;
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({top, behavior: 'smooth'});
        };

        const goToAnchor = (hash) => {
            if (route.name === 'HOME_INDEX') {
                scrollToHash(hash);
            } else {
                router.push({name: 'HOME_INDEX', hash});
            }
            emit('navigate');
        };

        return {
            filtersStore,
            partList,
            partCounts,
            partShortLabel,
            epilogueId,
            goToAnchor,
        };
    },
};
</script>
