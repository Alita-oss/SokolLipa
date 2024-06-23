<template>
    <header>
        <NuxtLink to="/" class="logo">
            <img src="@/assets/images/logo.png" alt="Sokol Lípa logo" height="90" width="90" />
        </NuxtLink>

        <div class="nav-wrapper">
            <Transition name="fade">
                <nav v-if="!isMobile || navOpened" @click="toggleNav">
                    <ul class="nav-ul">
                        <li v-for="item in items" :key="item.name" :class="{ active: item.link === path }" class="nav-li">
                            <NuxtLink :to="item.link">{{ item.name }}</NuxtLink>
                        </li>
                    </ul>
                </nav>
            </Transition>
        </div>

        <div v-if="isMobile" class="hamburger-menu nav-wrapper" @click="toggleNav">
            <div>
                <menuIcon />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import menuIcon from '@/components/icons/menu.vue';

const route = useRoute();
const { isMobile } = useDevice();
const path = computed(() => {
    return route.path;
});

const items = [
    { link: '/', name: 'Home' },
    { link: '/seasons', name: 'Sezóny' },
    { link: '/teams', name: 'Týmy' },
    { link: '/gallery', name: 'Fotogalerie' },
    { link: '/publicita', name: 'Publicita' },
];

const navOpened = ref(false);
const toggleNav = () => {
    navOpened.value = !navOpened.value;
};
const theme = ref({
   ul: {
    position: isMobile ? 'absolute' : 'relative',
    left: isMobile ? 0 : 'auto',
    right: isMobile ? 0 : 'auto',
    height: isMobile ? 'auto' : '100%',
    padding: isMobile ? '20px 0' : 0,
    display: isMobile ? 'unset' : 'flex',
   },
   li: {
    padding: isMobile ? '24px 0 24px 10px' : '0 10px',
    height: isMobile ? '40px' : 'auto',
    fontSize: isMobile ? '20px' : '24px',
    lineHeight: isMobile ? '28px' : '32px',
   },
   nav: isMobile ?
        {
            position: 'fixed',
            top: '80px',
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(22, 163, 74, 0.5)',
        } : {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            width: 'auto',
            backgroundColor: 'transparent',
        } 
});
</script>

<style lang="scss" scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-bg-second);
    color: #fff;
    z-index: var(--z-header-bg);
    height: 80px;

    .nav-ul {
        background-color: var(--color-bg-second);
        position: v-bind('theme.ul.position');
        left: v-bind('theme.ul.left');
        right: v-bind('theme.ul.right');
        padding: v-bind('theme.ul.padding');
        height: v-bind('theme.ul.height');
        z-index: var(--z-header);
        display: v-bind('theme.ul.display');

        .nav-li {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: v-bind('theme.li.padding');
            height: v-bind('theme.li.height');
            font-size: v-bind('theme.li.fontSize');
            line-height: v-bind('theme.li.lineHeight');

            &:active {
                background-color: var(--color-green-600);
            }

            &:hover {
                background-color: var(--color-green-600-half);
            }

            &.active {
                background-color: var(--color-green-600);

                &:hover {
                    background-color: var(--color-green-600);
                }
            }
        }
    }
}

.logo {
    margin: 30px 0 0 20px;
}

.nav-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    max-height: 80px;
    margin: 0 20px;
}

nav {
    position: v-bind('theme.nav.position');
    top: v-bind('theme.nav.top');
    left: v-bind('theme.nav.left');
    width: v-bind('theme.nav.width');
    height: 100%;
    background-color: v-bind('theme.nav.backgroundColor');
}

.hamburger-menu {
    vertical-align: middle;
    fill: #fff;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
