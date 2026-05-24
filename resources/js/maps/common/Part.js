import {Part} from 'enums/common/Part';
import {EnumMap} from 'libs/EnumMap';

// 各部別的顯示資訊
export const partMap = new EnumMap(Part, {
    SALARY: {
        label: '薪資獎金陷阱',
        shortLabel: '薪資',
        abbrev: 'SAL',
        emoji: '💰',
        accent: '#D55A2E',
        blurb: '本薪 vs 獎金、名目包裝、避險條款——慣老闆收到的薪資結構操作攻略書。',
    },
    WORKTIME: {
        label: '工時與責任制',
        shortLabel: '工時',
        abbrev: 'WTM',
        emoji: '⏰',
        accent: '#B14620',
        blurb: '特休排定權奪回、強制催休、變形工時、全勤獎金重罰——把時間從你身上拿回去的法務操作。',
    },
    MANIPULATION: {
        label: '情緒勒索與 PUA',
        shortLabel: 'PUA',
        abbrev: 'MNP',
        emoji: '🎭',
        accent: '#8B3517',
        blurb: '「心理彈性激勵機制」「高情商團隊共識營造」「領導力格局教育」——PUA 不限於對員工，連中階主管都能被責任轉嫁；慣老闆的法務不叫它 PUA，但操作手法都在這裡。',
    },
    PROMISES: {
        label: '升遷與畫餅',
        shortLabel: '升遷',
        abbrev: 'PRM',
        emoji: '🥕',
        accent: '#C99A1B',
        blurb: '加薪精算拆分、代理人考核、經理人三大加鎖、「天選之人」話術——升遷怎麼變成最高 CP 值的成本控制工具。',
    },
    LOOPHOLE: {
        label: '合約與法規規避',
        shortLabel: '合約',
        abbrev: 'LPH',
        emoji: '📜',
        accent: '#6E5C30',
        blurb: '付款延展、懲罰性違約金、智財無償吞噬、單向任意終止——勞動合約只是入門，B2B 商務合約才是法務刀光劍影的真正戰場。',
    },
    RETENTION: {
        label: '離職留人與報復',
        shortLabel: '離職',
        abbrev: 'RTN',
        emoji: '🚪',
        accent: '#5F230E',
        blurb: '留任獎金合約、合意終止、離職反報復防火牆——「畢業與分手」最凶險的最後一關，慣老闆的全套退場戰略。',
    },
    POLITICS: {
        label: '分化與職場政治',
        shortLabel: '政治',
        abbrev: 'PLT',
        emoji: '👥',
        accent: '#354B3F',
        blurb: '組織扁平化架空、末位淘汰防團結、工會合法收編、用民主玩死民主——大智若愚是職場政治的最高境界。',
    },
    CRISIS: {
        label: '危機與名譽防禦',
        shortLabel: '危機',
        abbrev: 'CRS',
        emoji: '🧯',
        accent: '#9C1F1F',
        blurb: '官方聲明稿、勞檢出勤補簽、資安稽核抓內鬼、ESG 漂白——當公司被爆料、勞檢上門時的全套媒體 / 法務防禦劇本。',
    },
    EPILOGUE: {
        label: '卷末',
        abbrev: 'FIN',
        emoji: '🪞',
        accent: '#1E2C25',
        blurb: '',
        hidden: true, // 不出現在 sidebar / filter chips / section list
    },
});

// partList 只給「主分類」用（filter chips、section headers、sidebar 索引）
export const partList = partMap.entries()
    .filter(([, value]) => !value.hidden)
    .map(([enumValue, value]) => ({
        key: enumValue.key,
        ...value,
    }));
