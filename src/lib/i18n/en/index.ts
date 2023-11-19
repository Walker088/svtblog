import type { BaseTranslation } from '../i18n-types'

const en = {
	time: '{value:Date|simpleTime}',
    date: '{value:Date|simpleDate}',
	datetime: '{value:Date|simpleDateTime}',

	header: {
		HOME: "HOME",
		ARTICLES: "ARTICLES",
		CV: "CV",
		ADMIN: "ADMIN",
		LOGOUT: "LOGOUT",
	},
	home: {
		RECENT_POSTS: "Recent Posts",
		READ_MORE: "Read more",
	},
} satisfies BaseTranslation

export default en
