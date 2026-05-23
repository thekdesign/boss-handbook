import Enum from 'enum';

// 七大主題 + 卷末（EPILOGUE 不出現在分類列表，僅供 epilogue case 使用）
export const Part = new Enum([
    'SALARY',         // 薪資獎金陷阱
    'WORKTIME',       // 工時與責任制
    'MANIPULATION',   // 情緒勒索與 PUA
    'PROMISES',       // 升遷與畫餅
    'LOOPHOLE',       // 合約與法規規避
    'RETENTION',      // 離職留人與報復
    'POLITICS',       // 分化與職場政治
    'EPILOGUE',       // 卷末（不顯示於分類列表）
], {ignoreCase: false});
