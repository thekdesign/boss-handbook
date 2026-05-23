export default {
    content: ['./resources/**/*.{vue,html}'],

    theme: {
        extend: {
            colors: {
                // 慣老闆手冊：辦公室文件墨綠 + 冷灰告示底 + 警示橘紅貼紙 + 警戒黃封條
                primary: {
                    100: '#E6EDE9', 200: '#C2D0C8', 300: '#97AEA0', 400: '#6B8576',
                    500: '#4A6555', 600: '#354B3F', 700: '#2C3E36', 800: '#1E2C25',
                    900: '#121C17',
                },
                // 原本是米紙黃 → 改為辦公室冷灰告示底
                paper: {
                    100: '#F5F6F3', 200: '#EBEDE9', 300: '#D8DBD4', 400: '#B5BAB1',
                    500: '#8E938A', 600: '#6A6F66', 700: '#4D5249', 800: '#353932',
                    900: '#1F221C',
                },
                seal: {
                    100: '#FCE6DC', 200: '#F4BFA4', 300: '#EA9572', 400: '#DF7044',
                    500: '#D55A2E', 600: '#B14620', 700: '#8B3517', 800: '#5F230E',
                    900: '#3A1407',
                },
                gold: {
                    100: '#FDF5D4', 200: '#F8E58F', 300: '#F1D055', 400: '#E8B838',
                    500: '#C99A1B', 600: '#A07810', 700: '#765709', 800: '#4E3905',
                    900: '#2A1F02',
                },
                gray: {
                    100: '#F7F7F4', 200: '#E9E8E2', 300: '#CFCDC2', 400: '#9C998D',
                    500: '#6F6C61', 600: '#4F4D45', 700: '#34322C', 800: '#1F1E1A',
                    900: '#0F0F0D',
                },
            },
            fontFamily: {
                // 全站走 Noto Sans TC；font-serif 別名保留但也指向 sans（搭配 font-bold 區隔標題）
                sans: ['"Noto Sans TC"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
                serif: ['"Noto Sans TC"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', '"SF Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
            },
        },
    },

    corePlugins: {
        preflight: false,
    },
};
