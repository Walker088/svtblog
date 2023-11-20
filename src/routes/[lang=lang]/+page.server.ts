import type { Locales } from '$lib/i18n/i18n-types';
import type { PageServerLoad } from './$types';

import { PRV_BLOG_OWNER } from '$env/static/private';
import { pg } from "$lib/dao/postgres";
import { markdownCvt } from "$lib/markdown/markdown";
import { parse } from 'node-html-parser';

const PUBLISHED_STAT = "PT";

interface ProfileInfo {
    profile_bio: string,
    profile_img: string,
};

interface Article {
    article_id: string,
    article_title: string,
    article_sub_title: string,
    article_serie: string,
    article_preview?: string,
    article_content?: string,
    article_img: string,
    article_tags: string[],
    article_langs: string[],
    articale_time: Date,
};

interface HomePageInfo {
    profile: ProfileInfo,
    recentPosts: Article[],
};

const GetHomePageInfo = async (locale: Locales) => {
    const [ profile ] = await pg<ProfileInfo[]>`
        SELECT 
            profile_bio, 
            profile_img  
        FROM 
            users 
        WHERE user_id = ${ PRV_BLOG_OWNER }
    `;
    profile.profile_bio = markdownCvt.render(profile.profile_bio);

    const articales = await pg<Article[]>`
    SELECT
    	a.article_id,
    	a.article_title,
    	a.article_sub_title,
    	ac.article_content,
    	a.article_serie,
    	a.article_img,
    	ARRAY(SELECT tag_name FROM tags WHERE tag_id = a.article_id) article_tags,
    	ARRAY(SELECT article_lang FROM article_contents WHERE article_id = a.article_id) article_langs,
    	COALESCE(a.updated_at, a.created_at) articale_time
    FROM
    	articles a
    JOIN article_contents ac USING (article_id)
    WHERE
    	a.article_status = ${ PUBLISHED_STAT }
    	AND ac.article_lang = ${ locale }
    ORDER BY
    	articale_time DESC
    LIMIT 3
    `;
    const recentPosts = articales.map(p => {
        if (!p.article_content) {
            return p;
        }
        const rendered = markdownCvt.render(p.article_content);
        const parsed = parse(rendered);
        const article_preview = parsed.querySelector('p')
            ? (parsed.querySelector('p')?.structuredText || "")
            : "";
        const { ['article_content']: article_content, ...rest } = p;
        return {...rest, article_preview};
    });
    return {
        profile, recentPosts
    }
};

export const load: PageServerLoad<HomePageInfo> = async ({ locals: { locale } }) => {
    return await GetHomePageInfo(locale);
};
