<template>
    <div v-if="caseItem">
        <button
            type="button"
            class="inline-flex items-center gap-2 mb-5 font-mono text-[0.72rem] tracking-[0.15em] text-gray-600 uppercase hover:text-primary-700 transition-colors"
            @click="goBack"
        >
            ← BACK · 返回索引
        </button>

        <!-- 文件封面 header -->
        <header class="relative mb-7 overflow-hidden border-2 border-primary-700 bg-white shadow-[0_4px_18px_rgba(20,30,25,0.08)]">
            <!-- 文件編號條 -->
            <div class="flex items-center justify-between gap-2 border-b border-paper-300 bg-primary-800 px-4 py-1.5 font-mono text-[0.65rem] tracking-[0.15em] text-paper-100">
                <span class="truncate">{{ docNumber }}</span>
                <span class="hidden sm:flex items-center gap-2 shrink-0">
                    <span>REV.2026.05</span>
                    <span class="opacity-50">|</span>
                    <span>CONFIDENTIAL</span>
                </span>
            </div>

            <!-- 章戳：一般 case 印「機密」、卷末印「卷末」 -->
            <div class="absolute right-4 top-12 sm:right-7 sm:top-14 z-10">
                <StampBadge :label="stampLabel" size="lg" :opacity="0.65" />
            </div>

            <!-- metadata table -->
            <dl class="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto_1fr] gap-x-3 gap-y-1.5 border-b border-dashed border-paper-300 bg-paper-100 px-5 py-3 text-[0.72rem]">
                <dt class="font-mono uppercase tracking-[0.12em] text-gray-500">{{ isEpilogue ? '位置' : '分類' }}</dt>
                <dd class="font-medium text-gray-800">{{ partInfo.emoji }} {{ isEpilogue ? '卷末總結' : partInfo.label }}</dd>

                <dt class="font-mono uppercase tracking-[0.12em] text-gray-500">{{ isEpilogue ? '對象' : '機密等級' }}</dt>
                <dd class="font-medium text-seal-700">{{ isEpilogue ? '全體讀者' : '限管理階層' }}</dd>

                <dt class="font-mono uppercase tracking-[0.12em] text-gray-500">編製</dt>
                <dd class="font-mono text-gray-700">法務顧問室</dd>

                <dt class="font-mono uppercase tracking-[0.12em] text-gray-500">修訂日期</dt>
                <dd class="font-mono text-gray-700">2026.05.23</dd>
            </dl>

            <!-- 標題區塊 -->
            <div class="relative px-5 sm:px-7 py-6">
                <div class="font-mono text-[0.65rem] tracking-[0.2em] text-gray-500 mb-1.5 uppercase">
                    <span v-if="isEpilogue">END OF HANDBOOK / {{ partAbbrev }}</span>
                    <span v-else>DOC · {{ caseItem.number }} / {{ partAbbrev }}</span>
                </div>
                <h1 class="m-0 mb-3 font-serif text-2xl sm:text-[1.7rem] font-black leading-snug text-primary-800">
                    <span class="mr-2">{{ caseItem.emoji }}</span>{{ caseItem.title }}
                </h1>
                <p class="m-0 text-[0.95rem] italic leading-relaxed text-gray-700 max-w-3xl">
                    {{ caseItem.hook }}
                </p>
            </div>
        </header>

        <!-- 內文 -->
        <section class="flex flex-col gap-5">
            <!-- 情境 -->
            <div class="border border-paper-300 bg-paper-100 shadow-[0_2px_8px_rgba(20,30,25,0.04)]">
                <div class="flex items-center gap-2 border-b border-dashed border-paper-300 px-5 py-2">
                    <span class="font-mono text-[0.65rem] tracking-[0.2em] text-gray-500 uppercase">§ 01</span>
                    <span class="font-serif font-bold text-sm text-gray-700">情境</span>
                </div>
                <div class="px-5 sm:px-7 py-5 text-base leading-loose text-gray-800">
                    {{ caseItem.question }}
                </div>
            </div>

            <!-- 法務建議 -->
            <div class="border border-primary-700 bg-white shadow-[0_2px_10px_rgba(20,30,25,0.06)]">
                <div class="flex items-center gap-2 border-b border-dashed border-paper-300 bg-primary-800 px-5 py-2 text-paper-100">
                    <span class="font-mono text-[0.65rem] tracking-[0.2em] uppercase opacity-80">§ 02</span>
                    <span class="font-serif font-bold text-sm">法務建議</span>
                    <span class="ml-auto font-mono text-[0.6rem] tracking-[0.18em] uppercase opacity-65">FOR INTERNAL USE</span>
                </div>
                <div class="px-5 sm:px-7 py-5">
                    <MarkdownView :source="caseItem.answer" />
                </div>
            </div>

            <!-- 偽署名 footer -->
            <div class="border-t-2 border-dashed border-paper-300 pt-4 pb-1 px-1 flex items-end justify-between gap-4">
                <div class="font-mono text-[0.7rem] tracking-[0.12em] text-gray-500 uppercase">
                    — END OF DOCUMENT
                </div>
                <div class="text-right">
                    <div class="font-serif text-sm text-gray-700">法務顧問室</div>
                    <div class="font-mono text-[0.65rem] tracking-[0.12em] text-gray-500 uppercase">Legal Advisory · Internal Reference Only</div>
                </div>
            </div>
        </section>

        <!-- 上下篇 -->
        <nav class="mt-9 grid gap-3 grid-cols-1 sm:grid-cols-2">
            <RouterLink
                v-if="prevCase"
                :to="{name: 'CASE_DETAIL', params: {caseId: prevCase.id}}"
                class="flex flex-col gap-1 border border-paper-300 bg-white px-5 py-4 text-sm text-gray-700 transition-all hover:border-primary-700 hover:-translate-y-0.5"
            >
                <span class="font-mono text-[0.65rem] tracking-[0.2em] text-gray-500 uppercase">← Prev</span>
                <span class="font-serif font-bold text-primary-800">{{ prevCase.number }} · {{ prevCase.title }}</span>
            </RouterLink>
            <RouterLink
                v-if="nextCase"
                :to="{name: 'CASE_DETAIL', params: {caseId: nextCase.id}}"
                class="flex flex-col gap-1 border border-paper-300 bg-white px-5 py-4 text-sm text-gray-700 transition-all hover:border-primary-700 hover:-translate-y-0.5 sm:text-right"
                :class="{'sm:col-start-2': !prevCase}"
            >
                <span class="font-mono text-[0.65rem] tracking-[0.2em] text-gray-500 uppercase">Next →</span>
                <span class="font-serif font-bold text-primary-800">{{ nextCase.number }} · {{ nextCase.title }}</span>
            </RouterLink>
        </nav>
    </div>

    <div v-else class="text-center py-12 px-4 text-gray-600">
        <p class="font-mono text-[0.7rem] tracking-[0.2em] text-seal-600 uppercase mb-2">FILE NOT FOUND</p>
        <p class="mb-6">這篇手法不在卷宗裡，可能網址錯了。</p>
        <button
            type="button"
            class="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.15em] text-gray-600 uppercase hover:text-primary-700"
            @click="goBack"
        >
            ← BACK · 返回索引
        </button>
    </div>
</template>

<script>
import {computed, watch, onBeforeUnmount} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useCaseStore} from 'stores/case/case';
import {partMap} from 'maps/common/Part';
import MarkdownView from 'components/common/MarkdownView.vue';
import StampBadge from 'components/common/StampBadge.vue';

const SITE_TITLE = '🗂️ 慣老闆常用手法手冊';
const DEFAULT_DESCRIPTION = '慣老闆常用手法手冊：揭穿職場那些「合法但缺德」的管理術。從凍薪話術到責任制濫用、PUA 到畫餅升遷，認真拆解你每天被坑的劇本。';

const setMeta = (name, content) => {
    const tag = document.querySelector(`meta[name="${name}"]`);
    if (tag) tag.setAttribute('content', content);
};

export default {
    name: 'CaseDetail',
    components: {MarkdownView, StampBadge},
    setup() {
        const route = useRoute();
        const router = useRouter();
        const caseStore = useCaseStore();

        const goBack = () => {
            if (window.history.state?.back) {
                router.back();
            } else {
                router.push({name: 'HOME_INDEX'});
            }
        };

        const caseId = computed(() => Number(route.params.caseId));
        const caseItem = computed(() => caseStore.getById(caseId.value));

        const partInfo = computed(() => partMap.get(caseItem.value?.partKey) || {});
        const accent = computed(() => partInfo.value.accent || '#354B3F');
        const partAbbrev = computed(() => partInfo.value.abbrev || '???');
        const isEpilogue = computed(() => caseItem.value?.id === 99);
        const docNumber = computed(() => {
            if (!caseItem.value) return 'HRM-2026';
            // 卷末不掛尾數，直接 HRM-2026-FIN
            if (isEpilogue.value) return `HRM-2026-${partAbbrev.value}`;
            return `HRM-2026-${partAbbrev.value}-${caseItem.value.number}`;
        });
        const stampLabel = computed(() => (isEpilogue.value ? '卷末' : '機密'));

        const sequentialList = computed(() => caseStore.list.filter((c) => c.id !== 99));
        const currentIndex = computed(() => sequentialList.value.findIndex((c) => c.id === caseId.value));
        const prevCase = computed(() => (currentIndex.value > 0 ? sequentialList.value[currentIndex.value - 1] : null));
        const nextCase = computed(() => (currentIndex.value >= 0 && currentIndex.value < sequentialList.value.length - 1
            ? sequentialList.value[currentIndex.value + 1]
            : null));

        watch(caseItem, (c) => {
            if (!c) return;
            document.title = `${c.number} · ${c.title}｜慣老闆常用手法手冊`;
            setMeta('description', `${c.title}｜${c.hook || c.question}`);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }, {immediate: true});

        onBeforeUnmount(() => {
            document.title = SITE_TITLE;
            setMeta('description', DEFAULT_DESCRIPTION);
        });

        return {
            caseItem,
            partInfo,
            partAbbrev,
            docNumber,
            stampLabel,
            isEpilogue,
            accent,
            prevCase,
            nextCase,
            goBack,
        };
    },
};
</script>
