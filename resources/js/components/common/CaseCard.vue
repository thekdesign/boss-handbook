<template>
    <RouterLink
        :to="{name: 'CASE_DETAIL', params: {caseId: caseItem.id}}"
        class="group relative block overflow-visible bg-white border border-paper-300 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(20,30,25,0.12)] shadow-[0_2px_8px_rgba(20,30,25,0.05)]"
        :style="{'--accent': accent}"
    >
        <!-- File folder tab：上方凸出色帶 -->
        <span
            class="absolute -top-[2px] left-4 px-2.5 py-1 text-paper-100 font-mono text-[0.6rem] tracking-[0.18em] uppercase shadow-[0_-1px_3px_rgba(20,30,25,0.08)]"
            :style="{background: 'var(--accent)'}"
        >
            {{ docNumber }}
        </span>

        <!-- 機密小章戳：右上角 -->
        <span
            class="absolute right-3 top-3 rotate-[-6deg]"
        >
            <StampBadge label="機密" size="sm" :opacity="0.55" />
        </span>

        <!-- 卡片內容 -->
        <div class="px-5 pt-7 pb-5">
            <div class="flex items-center gap-2 mt-1">
                <span class="text-base leading-none">{{ caseItem.emoji }}</span>
                <span class="font-mono text-[0.65rem] tracking-[0.15em] text-gray-500 uppercase">
                    {{ partAbbrev }} · {{ caseItem.number }}
                </span>
                <span
                    v-if="caseItem.kind === 'overview'"
                    class="ml-auto inline-flex items-center border border-gold-500 bg-gold-100 px-1.5 py-px font-mono text-[0.58rem] tracking-[0.18em] uppercase text-gold-700"
                    title="對照表 / 系列收束篇"
                >
                    § Overview
                </span>
            </div>

            <h3 class="mt-2 mb-2 font-serif text-base sm:text-[1.05rem] font-bold leading-snug text-gray-900">
                {{ caseItem.title }}
            </h3>

            <p class="m-0 text-[0.85rem] leading-relaxed text-gray-600">
                {{ caseItem.hook }}
            </p>

            <!-- 底部 dashed divider + 動作 -->
            <div class="mt-4 pt-3 border-t border-dashed border-paper-300 flex items-center justify-between">
                <span class="font-mono text-[0.65rem] tracking-[0.18em] text-gray-400 uppercase">
                    {{ partLabel }}
                </span>
                <span class="font-mono text-[0.7rem] font-bold tracking-wider" :style="{color: 'var(--accent)'}">
                    展閱 →
                </span>
            </div>
        </div>
    </RouterLink>
</template>

<script>
import {partMap} from 'maps/common/Part';
import StampBadge from 'components/common/StampBadge.vue';

export default {
    name: 'CaseCard',
    components: {StampBadge},
    props: {
        caseItem: {type: Object, required: true},
    },
    computed: {
        partInfo() {
            return partMap.get(this.caseItem.partKey) || {};
        },
        partLabel() {
            return this.partInfo.label || '';
        },
        partAbbrev() {
            return this.partInfo.abbrev || '???';
        },
        accent() {
            return this.partInfo.accent || '#354B3F';
        },
        docNumber() {
            return `HRM-2026-${this.partAbbrev}-${this.caseItem.number}`;
        },
    },
};
</script>
