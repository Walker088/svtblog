import type { BaseTranslation } from '../i18n-types'

const es = {
	time: '{value:Date|simpleTime}',
    date: '{value:Date|simpleDate}',
	datetime: '{value:Date|simpleDateTime}',

	header: {
		HOME: "HOGAR",
		ARTICLES: "ARTÍCULOS",
		CV: "CV",
		ADMIN: "ADMIN",
		LOGOUT: "CERRAR SESIÓN",
	},
	home: {
		RECENT_POSTS: "Publicaciones recientes",
		READ_MORE: "Leer más",
	},
} satisfies BaseTranslation

export default es
