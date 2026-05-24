import {defineStore} from 'pinia';
import * as caseApi from 'apis/case/case';

/**
 * 模板佔位符替換
 * {{CASE_COUNT}} → 非 epilogue 案件總數
 * （給 epilogue.js 等需要顯示「總共 N 篇」的地方用，避免每次新增 case 就要手動改數字）
 */
const interpolatePlaceholders = (caseList) => {
    const regularCount = caseList.filter((c) => c.id !== 99).length;
    const substitute = (s) => (typeof s === 'string'
        ? s.replace(/\{\{CASE_COUNT\}\}/g, String(regularCount))
        : s);
    return caseList.map((c) => ({
        ...c,
        title: substitute(c.title),
        hook: substitute(c.hook),
        question: substitute(c.question),
        answer: substitute(c.answer),
    }));
};

export const useCaseStore = defineStore('case', {
    state: () => ({
        list: [],
    }),
    getters: {
        getById: (state) => (id) => state.list.find((c) => c.id === Number(id)),
        listByPart: (state) => state.list.reduce((acc, c) => {
            (acc[c.partKey] = acc[c.partKey] || []).push(c);
            return acc;
        }, {}),
    },
    actions: {
        async requestGetCaseList() {
            const raw = await caseApi.getCaseList();
            this.list = interpolatePlaceholders(raw);
        },
    },
});
