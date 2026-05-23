<template>
    <div class="text-center py-16 px-4">
        <div class="text-6xl mb-4">🗂️</div>
        <h1 class="font-serif text-2xl font-bold text-primary-800 m-0 mb-2">
            404 · 這篇手法還沒收錄
        </h1>
        <p class="text-gray-600 m-0 mb-6">
            這頁不在卷宗裡，請回到總覽看看其他職場拆穿。
        </p>
        <RouterLink
            :to="{name: 'HOME_INDEX'}"
            class="inline-block rounded-full bg-primary-700 px-5 py-2 text-sm text-paper-100 transition-colors hover:bg-primary-800"
        >
            ← 回到手法總覽
        </RouterLink>
    </div>
</template>

<script>
export default {
    name: 'NotFound',
};
</script>
