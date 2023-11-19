// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'es'
	| 'zh'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * {​v​a​l​u​e​|​s​i​m​p​l​e​T​i​m​e​}
	 * @param {Date} value
	 */
	time: RequiredParams<'value|simpleTime'>
	/**
	 * {​v​a​l​u​e​|​s​i​m​p​l​e​D​a​t​e​}
	 * @param {Date} value
	 */
	date: RequiredParams<'value|simpleDate'>
	/**
	 * {​v​a​l​u​e​|​s​i​m​p​l​e​D​a​t​e​T​i​m​e​}
	 * @param {Date} value
	 */
	datetime: RequiredParams<'value|simpleDateTime'>
	header: {
		/**
		 * H​O​M​E
		 */
		HOME: string
		/**
		 * A​R​T​I​C​L​E​S
		 */
		ARTICLES: string
		/**
		 * C​V
		 */
		CV: string
		/**
		 * A​D​M​I​N
		 */
		ADMIN: string
		/**
		 * L​O​G​O​U​T
		 */
		LOGOUT: string
	}
	home: {
		/**
		 * R​e​c​e​n​t​ ​P​o​s​t​s
		 */
		RECENT_POSTS: string
		/**
		 * R​e​a​d​ ​m​o​r​e
		 */
		READ_MORE: string
	}
}

export type TranslationFunctions = {
	/**
	 * {value|simpleTime}
	 */
	time: (arg: { value: Date }) => LocalizedString
	/**
	 * {value|simpleDate}
	 */
	date: (arg: { value: Date }) => LocalizedString
	/**
	 * {value|simpleDateTime}
	 */
	datetime: (arg: { value: Date }) => LocalizedString
	header: {
		/**
		 * HOME
		 */
		HOME: () => LocalizedString
		/**
		 * ARTICLES
		 */
		ARTICLES: () => LocalizedString
		/**
		 * CV
		 */
		CV: () => LocalizedString
		/**
		 * ADMIN
		 */
		ADMIN: () => LocalizedString
		/**
		 * LOGOUT
		 */
		LOGOUT: () => LocalizedString
	}
	home: {
		/**
		 * Recent Posts
		 */
		RECENT_POSTS: () => LocalizedString
		/**
		 * Read more
		 */
		READ_MORE: () => LocalizedString
	}
}

export type Formatters = {
	simpleDate: (value: Date) => unknown
	simpleDateTime: (value: Date) => unknown
	simpleTime: (value: Date) => unknown
}
