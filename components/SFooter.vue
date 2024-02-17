<template>
    <footer>
        <NuxtLink to="/" class="logo">
            <img src="@/assets/images/logo.png" alt="Sokol Lípa logo" height="120" width="120" />
        </NuxtLink>
        <small>Marcus Wiseman | Zdeňka Kameníková &copy; {{ new Date().getFullYear() }}</small>
    </footer>  
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--color-bg-second);
    color: #fff;
    padding: 16px;
    z-index: var(--z-footer);
}
small {
    text-align: center;
}
.logo {
    display: flex;
    justify-content: center;
}
</style>
