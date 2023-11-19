// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

type Locales = import('$lib/i18n/i18n-types').Locales
type TranslationFunctions = import('$lib/i18n/i18n-types').TranslationFun

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locales
			LL: TranslationFunctions
			User: {
				userId: string,
				userMail: string,
			}
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
