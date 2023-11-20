import type { PageLoad } from './$types'

export const load: PageLoad = async ({ parent, data }) => {
    // wait for `+layout.ts` to load dictionary and pass locale information
    const { locale } = await parent();

    return {
        ...data,
        "locale": locale,
    };
};
