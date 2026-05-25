<template>
    <div>
        <section class="relative mb-7 overflow-hidden rounded-[6px] border-2 border-primary-700 bg-white shadow-[0_4px_22px_rgba(20,30,25,0.12)]">
            <!-- 文件 header bar -->
            <div class="flex items-center justify-between gap-2 border-b border-paper-300 bg-primary-800 px-4 py-1.5 font-mono text-[0.65rem] tracking-[0.15em] text-paper-100">
                <span class="truncate">HRM-INTERNAL-2026 · MASTER FILE</span>
                <span class="hidden sm:flex items-center gap-2 shrink-0">
                    <span>REV.2026.05</span>
                    <span class="opacity-50">|</span>
                    <span>CONFIDENTIAL</span>
                </span>
            </div>

            <!-- 主視覺 -->
            <div class="relative px-6 py-10 text-center sm:px-10 sm:py-12">
                <!-- 機密斜印章戳，右上角 -->
                <div class="absolute right-4 top-4 sm:right-7 sm:top-7">
                    <StampBadge label="機密" size="lg" :opacity="0.7" />
                </div>

                <div class="font-mono text-[0.65rem] tracking-[0.3em] text-seal-600 mb-3">
                    CLASSIFIED · 限管理階層閱讀
                </div>

                <h1 class="font-serif font-black text-3xl sm:text-4xl text-primary-800 m-0 mb-2 tracking-wide">
                    慣老闆常用手法手冊
                </h1>

                <div class="font-mono text-[0.7rem] tracking-[0.2em] text-gray-500 mb-5">
                    MANAGER'S INTERNAL REFERENCE · 2026 EDITION
                </div>

                <p class="max-w-xl mx-auto text-gray-700 text-sm leading-loose">
                    從凍薪話術到責任制濫用、PUA 到畫餅升遷——
                    那些「合法但缺德」的管理術，認真用法條跟職場常識拆給你看。
                </p>
            </div>

            <!-- 下方 metadata bar -->
            <div class="grid grid-cols-3 border-t-2 border-dashed border-paper-300 bg-paper-100 divide-x divide-paper-300">
                <div class="py-3">
                    <div class="font-mono text-lg sm:text-xl font-bold text-primary-800">{{ String(regularCount).padStart(3, '0') }}</div>
                    <div class="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray-500">DOCS</div>
                </div>
                <div class="py-3">
                    <div class="font-mono text-lg sm:text-xl font-bold text-primary-800">{{ String(partList.length).padStart(2, '0') }}</div>
                    <div class="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray-500">SECTIONS</div>
                </div>
                <div class="py-3">
                    <div class="font-mono text-lg sm:text-xl font-bold text-primary-800">2026.05</div>
                    <div class="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray-500">REV.</div>
                </div>
            </div>
        </section>

        <!-- 導讀：新讀者入口 -->
        <section
            v-if="showLatest"
            class="mb-6 border-2 border-dashed border-primary-700 bg-paper-100 px-4 py-4 sm:px-5 sm:py-5"
        >
            <div class="flex items-baseline justify-between gap-2 mb-2 flex-wrap">
                <div class="flex items-baseline gap-2">
                    <span class="font-mono text-[0.65rem] tracking-[0.2em] text-gray-500 uppercase">§ Reading Guide</span>
                    <span class="font-serif font-bold text-sm sm:text-base text-primary-800">導讀</span>
                </div>
                <span class="font-mono text-[0.6rem] tracking-[0.15em] text-gray-500 uppercase">FOR NEW READERS</span>
            </div>
            <p class="m-0 mb-3 text-sm text-gray-700 leading-relaxed">
                本手冊以「<strong>老闆視角的法務建議書</strong>」為敘事框架，拆解台灣職場常見的「<strong>合法但缺德</strong>」管理術——
                <strong class="text-seal-700">內容是諷刺、不是教戰手冊</strong>。目的是讓員工讀懂老闆會收到的劇本長什麼樣，看完卷末破題才會理解全書語境。
            </p>
            <div class="font-mono text-[0.62rem] tracking-[0.18em] text-gray-500 uppercase mb-2">§ Featured · 不知從哪看起就從這 5 篇</div>
            <ul class="grid sm:grid-cols-2 gap-1.5">
                <li v-for="c in featured" :key="c.id">
                    <RouterLink
                        :to="{name: 'CASE_DETAIL', params: {caseId: c.id}}"
                        class="flex items-baseline gap-2 overflow-hidden border border-paper-300 bg-white px-3 py-2 text-sm transition-all hover:border-primary-700 hover:-translate-y-0.5"
                    >
                        <span class="shrink-0 font-mono text-[0.6rem] tracking-[0.15em] text-gray-400 whitespace-nowrap">
                            HRM-{{ featuredPart(c).abbrev }}-{{ c.number }}
                        </span>
                        <span class="shrink-0 text-base leading-none">{{ c.emoji }}</span>
                        <span class="min-w-0 flex-1 truncate font-serif font-medium text-primary-800">{{ c.title }}</span>
                    </RouterLink>
                </li>
            </ul>
        </section>

        <!-- 投稿 CTA：警示貼紙風 -->
        <a
            href="https://forms.gle/UBzoXfrQSRkCgHrS8"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center gap-3 mb-6 border-2 border-dashed border-seal-500 bg-seal-100 px-4 py-3 transition-colors hover:bg-seal-200"
        >
            <span class="text-xl leading-none">📨</span>
            <div class="flex-1 min-w-0">
                <div class="font-mono text-[0.65rem] tracking-[0.2em] text-seal-700 uppercase">§ Submission · 匿名投稿</div>
                <div class="font-serif font-bold text-sm sm:text-base text-seal-800">
                    你也經歷過這種劇本？把它寫進手冊
                </div>
            </div>
            <span class="hidden sm:inline font-mono text-[0.7rem] tracking-[0.18em] text-seal-700 uppercase group-hover:translate-x-1 transition-transform">
                Submit →
            </span>
            <span class="sm:hidden text-seal-700 font-bold">→</span>
        </a>

        <Transition name="fade">
            <section v-if="filtersStore.searchQuery" class="mb-4 rounded-xl border border-paper-300 bg-white px-4 py-3 text-sm text-gray-700">
                <span class="text-gray-500">搜尋「<strong class="text-primary-700">{{ filtersStore.searchQuery }}</strong>」：</span>
                找到 <strong class="text-primary-700">{{ searchMatchCount }}</strong> 篇
                <button
                    type="button"
                    class="ml-2 text-xs text-primary-600 underline-offset-2 hover:underline"
                    @click="filtersStore.clearSearch()"
                >
                    清除
                </button>
            </section>
        </Transition>

        <!-- 分類索引 tabs -->
        <section class="mb-6">
            <div class="font-mono text-[0.65rem] tracking-[0.2em] text-gray-500 uppercase mb-2">§ INDEX · 卷宗分類</div>
            <div class="flex flex-wrap gap-1.5">
                <button
                    class="inline-flex items-center gap-1.5 border px-2.5 py-1.5 sm:px-3 text-xs sm:text-sm font-medium transition-colors"
                    :class="filtersStore.activePartKey === ''
                        ? 'border-primary-700 bg-primary-700 text-paper-100'
                        : 'border-paper-300 bg-white text-gray-700 hover:border-primary-700 hover:text-primary-700'"
                    @click="filtersStore.activePartKey = ''"
                >
                    <span class="hidden sm:inline font-mono text-[0.65rem] tracking-[0.15em] opacity-70">ALL</span>
                    <span>全部</span>
                </button>
                <button
                    v-for="p in partList"
                    :key="p.key"
                    class="inline-flex items-center gap-1.5 border px-2.5 py-1.5 sm:px-3 text-xs sm:text-sm font-medium transition-colors"
                    :class="filtersStore.activePartKey === p.key ? 'text-paper-100' : 'border-paper-300 bg-white text-gray-700'"
                    :style="filtersStore.activePartKey === p.key
                        ? {background: p.accent, borderColor: p.accent}
                        : {'--hover-accent': p.accent}"
                    @click="filtersStore.activePartKey = p.key"
                >
                    <span class="hidden sm:inline font-mono text-[0.65rem] tracking-[0.15em] opacity-70">{{ p.abbrev }}</span>
                    <span class="sm:hidden">{{ p.emoji }} {{ p.shortLabel }}</span>
                    <span class="hidden sm:inline">{{ p.emoji }} {{ p.label }}</span>
                </button>
            </div>
        </section>

        <Transition name="fade">
            <p v-if="filtersStore.searchQuery && !displayParts.length"
               class="my-12 text-center text-gray-500 text-sm">
                沒有符合「<strong class="text-primary-700">{{ filtersStore.searchQuery }}</strong>」的內容，試試別的關鍵字看看。
            </p>
        </Transition>

        <Transition name="fade">
        <section
            v-if="showLatest && latestCases.length"
            id="part-latest"
            class="mt-2 mb-8 scroll-mt-20"
        >
            <header class="mb-4">
                <h2 class="group m-0 flex items-stretch border-b-2 border-gold-500">
                    <span class="flex items-center gap-1.5 px-3 py-1.5 bg-gold-500 text-gray-900 font-mono text-[0.7rem] tracking-[0.18em] uppercase">
                        <span>NEW</span>
                        <span class="text-base">🆕</span>
                    </span>
                    <span class="flex-1 flex items-center gap-2 px-3 py-1.5 font-serif text-lg sm:text-xl font-black text-gray-900">
                        <a href="#part-latest"
                           class="text-gold-600 opacity-0 transition-opacity no-underline cursor-pointer group-hover:opacity-70 hover:!opacity-100"
                           aria-label="連結到此分類">#</a>
                        最新手法
                    </span>
                </h2>
                <p class="m-0 mt-1 font-mono text-[0.7rem] tracking-[0.15em] text-gray-500 uppercase">
                    LATEST · 剛剛收錄的職場拆穿
                </p>
            </header>
            <div class="grid gap-5 pt-3 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
                <CaseCard v-for="c in latestCases" :key="c.id" :case-item="c" />
            </div>
        </section>
        </Transition>

        <section
            v-for="part in displayParts"
            :id="`part-${part.key.toLowerCase()}`"
            :key="part.key"
            class="mt-9 scroll-mt-20"
        >
            <header class="mb-4">
                <h2
                    class="group m-0 flex items-stretch border-b-2 cursor-pointer select-none"
                    :style="{borderColor: part.accent}"
                    role="button"
                    :aria-expanded="!isCollapsed(part.key)"
                    @click="togglePart(part.key)"
                >
                    <!-- 分頁 tab：色塊 -->
                    <span class="flex items-center gap-1.5 px-3 py-1.5 text-paper-100 font-mono text-[0.7rem] tracking-[0.18em] uppercase"
                          :style="{background: part.accent}">
                        <span>{{ part.abbrev }}</span>
                        <span class="opacity-60">·</span>
                        <span class="text-base">{{ part.emoji }}</span>
                    </span>
                    <!-- 標題 + 計數 -->
                    <span class="flex-1 flex items-center gap-2 px-3 py-1.5 font-serif text-lg sm:text-xl font-black text-gray-900">
                        <a
                            :href="`#part-${part.key.toLowerCase()}`"
                            class="opacity-0 transition-opacity no-underline cursor-pointer group-hover:opacity-70 hover:!opacity-100"
                            :style="{color: part.accent}"
                            aria-label="連結到此分類"
                            @click.stop
                        >#</a>
                        <span>{{ part.label }}</span>
                        <span class="ml-auto flex items-center gap-2 font-mono text-xs text-gray-500 tracking-[0.1em]">
                            <span>{{ String(part.cases.length).padStart(2, '0') }} 筆</span>
                            <span class="inline-block w-4 text-center transition-transform duration-300" :class="{'rotate-[-90deg]': isCollapsed(part.key)}">▾</span>
                        </span>
                    </span>
                </h2>
                <p class="m-0 mt-1 text-sm text-gray-600">{{ part.blurb }}</p>
            </header>
            <div
                class="grid transition-[grid-template-rows] duration-300 ease-out"
                :class="isCollapsed(part.key) ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'"
            >
                <div
                    class="overflow-hidden transition-opacity duration-200"
                    :class="isCollapsed(part.key) ? 'opacity-0' : 'opacity-100'"
                >
                    <div class="grid gap-5 pt-3 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
                        <CaseCard v-for="c in part.cases" :key="c.id" :case-item="c" />
                    </div>
                </div>
            </div>
        </section>

        <section v-if="epilogue" class="mt-12">
            <div class="font-mono text-[0.65rem] tracking-[0.2em] text-gray-500 uppercase mb-2">§ END OF HANDBOOK · 卷末</div>
            <RouterLink
                :to="{name: 'CASE_DETAIL', params: {caseId: epilogue.id}}"
                class="group relative block overflow-hidden border-2 border-primary-800 bg-primary-800 text-paper-100 shadow-[0_4px_22px_rgba(20,30,25,0.18)] transition-all hover:-translate-y-0.5"
            >
                <!-- 上方文件編號條 -->
                <div class="flex items-center justify-between gap-2 border-b border-primary-700 bg-primary-900 px-4 py-1.5 font-mono text-[0.65rem] tracking-[0.18em]">
                    <span class="truncate opacity-80">HRM-2026-FIN · END OF HANDBOOK</span>
                    <span class="hidden sm:inline opacity-60">REV.2026.05</span>
                </div>
                <div class="relative flex items-center gap-4 px-6 py-5">
                    <span class="text-3xl leading-none">{{ epilogue.emoji }}</span>
                    <div class="flex-1 min-w-0">
                        <h3 class="m-0 mb-1 font-serif text-base sm:text-lg font-bold text-gold-200 tracking-wide">
                            {{ epilogue.title }}
                        </h3>
                        <p class="m-0 text-sm leading-relaxed opacity-85">{{ epilogue.hook }}</p>
                    </div>
                    <span class="font-mono text-xs tracking-[0.18em] text-gold-300 uppercase group-hover:translate-x-1 transition-transform">
                        Open →
                    </span>
                </div>
            </RouterLink>
        </section>
    </div>
</template>

<script>
import {ref, computed, watch, onMounted} from 'vue';
import {useCaseStore} from 'stores/case/case';
import {useFiltersStore} from 'stores/ui/filters';
import {partList, partMap} from 'maps/common/Part';
import CaseCard from 'components/common/CaseCard.vue';
import StampBadge from 'components/common/StampBadge.vue';

export default {
    name: 'HomeIndex',
    components: {CaseCard, StampBadge},
    setup() {
        const caseStore = useCaseStore();
        const filtersStore = useFiltersStore();

        const epilogue = computed(() => caseStore.list.find((c) => c.id === 99));
        const regularCases = computed(() => caseStore.list.filter((c) => c.id !== 99));
        const regularCount = computed(() => regularCases.value.length);

        // 關鍵字比對：number / title / hook / question / answer 全文找
        const matchesSearch = (c) => {
            const q = filtersStore.searchQuery.trim().toLowerCase();
            if (!q) return true;
            const haystack = [c.number, c.title, c.hook, c.question, c.answer]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return haystack.includes(q);
        };

        // 主網格顯示所有通過搜尋的非結語案件
        const safeCases = computed(() => regularCases.value.filter(matchesSearch));

        // 最新（依 id 降序取前 6 件），僅在預設瀏覽模式顯示
        const latestCases = computed(() => regularCases.value
            .slice()
            .sort((a, b) => b.id - a.id)
            .slice(0, 6));
        const showLatest = computed(() => !filtersStore.searchQuery.trim() && filtersStore.activePartKey === '');

        // 導讀精選 5 篇：覆蓋 4 個主要分類的代表作
        // 1 首年獎金化 / 56 加班事前申請 / 11 打壓相對論 / 45 1 單位陷阱 / 71 杯酒釋兵權
        const FEATURED_IDS = [1, 56, 11, 45, 71];
        const featured = computed(() => FEATURED_IDS
            .map((id) => caseStore.getById(id))
            .filter(Boolean));
        const featuredPart = (c) => partMap.get(c.partKey) || {};

        // 部別區塊的摺疊狀態
        // SSR-safe: 預設空物件、mount 後才從 localStorage 還原
        const COLLAPSED_KEY = 'bosshandbook.collapsedParts';
        const collapsedParts = ref({});
        onMounted(() => {
            try {
                const raw = localStorage.getItem(COLLAPSED_KEY);
                if (raw) collapsedParts.value = JSON.parse(raw);
            } catch {
                /* localStorage 被禁用就忽略 */
            }
        });
        watch(collapsedParts, (v) => {
            if (typeof localStorage === 'undefined') return;
            try {
                localStorage.setItem(COLLAPSED_KEY, JSON.stringify(v));
            } catch {
                /* localStorage 滿或被禁用就忽略 */
            }
        }, {deep: true});
        const isCollapsed = (key) => !!collapsedParts.value[key];
        const togglePart = (key) => {
            collapsedParts.value = {...collapsedParts.value, [key]: !collapsedParts.value[key]};
        };

        const displayParts = computed(() => {
            const grouped = safeCases.value.reduce((acc, c) => {
                (acc[c.partKey] = acc[c.partKey] || []).push(c);
                return acc;
            }, {});
            return partList
                .filter((p) => filtersStore.activePartKey === '' || filtersStore.activePartKey === p.key)
                .map((p) => ({...p, cases: grouped[p.key] || []}))
                .filter((p) => p.cases.length > 0);
        });

        // 搜尋結果計數（顯示在輸入框底下）
        const searchMatchCount = computed(() => regularCases.value.filter(matchesSearch).length);

        return {
            caseStore,
            filtersStore,
            partList,
            displayParts,
            regularCount,
            searchMatchCount,
            latestCases,
            showLatest,
            featured,
            featuredPart,
            isCollapsed,
            togglePart,
            epilogue,
        };
    },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 200ms ease, transform 200ms ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(4px);
}
</style>
