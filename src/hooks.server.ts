import type { Locales } from '$lib/i18n/i18n-types.js';
import { detectLocale, i18n, isLocale } from '$lib/i18n/i18n-util';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

import { redirect, type Handle, type RequestEvent } from '@sveltejs/kit'
import { base } from '$app/paths'

import jwt from 'jsonwebtoken';
import { PRV_JWT_ACCESS_SECRET } from '$env/static/private';

const L = i18n()
const DEFAULT_LOCALE = "en";
const REGEX_START_WITH_BASE = new RegExp(`^${base}`);
const getPathnameWithoutBase = (url: URL) => url.pathname.replace(REGEX_START_WITH_BASE, '');

const getPreferredLocale = ({ request }: RequestEvent) => {
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);
	return detectLocale(acceptLanguageDetector) || DEFAULT_LOCALE;
}

export const handle: Handle = async ({ event, resolve }) => {
    const [, lang] = getPathnameWithoutBase(event.url).split('/');
    if (!lang) {
        const locale = getPreferredLocale(event);
        throw redirect(307, `${base}/${locale}`)
    }
    const locale = isLocale(lang) ? (lang as Locales) : getPreferredLocale(event);
    const LL = L[locale];

    // bind locale and translation functions to current request
	event.locals.locale = locale;
    event.locals.LL = LL

    const authCookie = event.cookies.get('AuthorizationToken');

    if (authCookie) {
        const token = authCookie.split(' ')[1];
        try {
            const jwtUser = jwt.verify(token, PRV_JWT_ACCESS_SECRET);
            console.log(jwtUser);
        } catch (error) {
            
        }
    }

    // replace html lang attribute with correct language
    return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', locale) });
};
