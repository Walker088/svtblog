
import type { Locales } from '$lib/i18n/i18n-types';
import type { LayoutServerLoad } from './$types';

interface MainLayoutInfo {
    locale: Locales,
    cvPath: string,
    profileImg: string,
    userId: string;
    userMail: string;
};

export const load: LayoutServerLoad<MainLayoutInfo> = async ({ locals }) => {
    return {
        locale: locals.locale,
        cvPath: "/pdf/cv-2022Sep04.pdf",
        profileImg: "",
        ...locals.User
    };
};
