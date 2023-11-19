import type { BaseTranslation } from '../i18n-types'

const zh = {
	time: '{value:Date|simpleTime}',
    date: '{value:Date|simpleDate}',
	datetime: '{value:Date|simpleDateTime}',

	header: {
		HOME: "首頁",
		ARTICLES: "文章",
		CV: "履歷",
		ADMIN: "管理",
		LOGOUT: "登出",
	},
	home: {
		RECENT_POSTS: "近期文章",
		READ_MORE: "閱讀更多",
	},
} satisfies BaseTranslation

export default zh
