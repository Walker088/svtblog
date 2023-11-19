import type { LayoutLoad } from './$types';
import { loadLocaleAsync } from '$lib/i18n/i18n-util.async'
import { i18nObject } from '$lib/i18n/i18n-util.js'

export const load: LayoutLoad = async ({ data }) => {
	// load dictionary into memory
	await loadLocaleAsync(data.locale);

	// pass locale to the "rendering context"
	return data;
}
