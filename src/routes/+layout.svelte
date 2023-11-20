<script lang="ts">
	import type { LayoutData } from './$types';
    import { page } from '$app/stores';
	import LL, { setLocale } from '$lib/i18n/i18n-svelte';
    import { PUB_GA_ID } from '$env/static/public';
	import "$lib/styles/app.scss";

    export let data: LayoutData;
	const {locale, cvPath, userId} = data;
	setLocale(locale);
</script>

<svelte:head>
    {#if !$page.data.user}
    <meta name="ga-id" content="{PUB_GA_ID}"/>
    <script async src="https://www.googletagmanager.com/gtag/js?id={PUB_GA_ID}"></script>
    <script>
        const GA_ID = document.querySelector('meta[name="ga-id"]').content;

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA_ID);
    </script>
    {/if}
</svelte:head>

<style lang="scss">

</style>

<header>
	<nav class="">
	<div class="">
		<ul class="">
			<li class="" class:active={$page.url.pathname === "/"}>
				<a data-sveltekit-prefetch href="/">{$LL.header.HOME()}</a>
			</li>
			<li class="" class:active={$page.url.pathname === "/articles"}>
				<a data-sveltekit-prefetch href="/articles">{$LL.header.ARTICLES()}</a>
			</li>
			{#if cvPath}
			<li class="" class:active={$page.url.pathname === cvPath}>
				<a href="{cvPath}" target="_blank" rel="noopener noreferrer">{$LL.header.CV()}</a>
			</li>
			{/if}
			{#if userId}
			<li class="" class:active={$page.url.pathname === "/auth/admin"}>
				<a data-sveltekit-prefetch href="/protected/admin">{$LL.header.ADMIN()}</a>
			</li>
			<li class="" class:active={$page.url.pathname === "/api/auth/logout"}>
				<a data-sveltekit-prefetch href="/api/auth/logout">{$LL.header.LOGOUT()}</a>
			</li>
			{/if}
		</ul>
	</div>
	
	</nav>
</header>

<main class="container">
	<slot></slot>
</main>
