
import type { Locales } from '$lib/i18n/i18n-types';
import type { LayoutServerLoad } from './$types';

type MainLayoutInfo = {
    locale: Locales,
};

export const load: LayoutServerLoad<MainLayoutInfo> = async ({ locals: { locale } }) => {
    return {
        //userId: locals?.User?.userId,
        locale: locale,
        userId: "walker088",
        cvPath: "/pdf/cv-2022Sep04.pdf",
    };
}
