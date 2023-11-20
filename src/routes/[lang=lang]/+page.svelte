<script lang="ts">
    import type { PageData } from './$types';
    import { PUB_SITE_DESC } from '$env/static/public';
    import { PRV_BLOG_OWNER } from '$env/static/private';
    import LL from '$lib/i18n/i18n-svelte';

    export let data: PageData;
    const {profile, recentPosts} = data;
</script>

<style lang="scss">

</style>

<svelte:head>
	<title>{ $LL.header.HOME() }</title>
	<meta name="description" content="{ PUB_SITE_DESC }"/>
	<meta name="author" content="{ PRV_BLOG_OWNER }" />
</svelte:head>

<div class="card p-4">{@html profile.profile_bio}</div>
<div class='recent-posts'>
    <h2 class="my-3"> { $LL.home.RECENT_POSTS() }</h2>
    <div class="row">
        {#each recentPosts as ar}
        <div class="col-md-4 col-sm-12 my-1">
            <div class="card">
                <div class="image-container"><img src="{ar.article_img}.sm.webp" class="card-img-top post-image" alt="..."></div>
                <div class="card-body">
                    {#each ar.article_tags as tag, idx} <span class="badge mx-1 mb-2">{tag}</span> {/each}
					<h5 class="card-title">{ar.article_title}</h5>
					<h6 class="card-subtitle text-muted">{ar.article_sub_title}</h6>
					<p class="mt-2 fst-italic fw-light post-preview">{ar.article_preview}</p>
					<div class="d-flex flex-row justify-content-end">
						<a href="/articles/{ar.article_title}" class="stretched-link" >{ $LL.home.READ_MORE() }</a>
					</div>
                </div>
                <div class="card-footer text-muted d-flex justify-content-between">
                    <div>
                        {#each ar.article_langs as lang}
                        <span class="badge rounded-pill bg-dark me-1">{lang}</span>
                        {/each}
                    </div>
                    <div><p><small><em>{$LL.datetime({value: ar.articale_time})}</em></small></p></div>
                </div>
            </div>
        </div>
        {/each}
    </div>
</div>
