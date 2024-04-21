<template>
    <header>
        <NuxtLink to="/" class="logo">
            <img src="@/assets/images/logo.png" alt="Sokol Lípa logo" height="90" width="90" />
        </NuxtLink>

        <div class="nav-wrapper">
            <Transition name="fade">
                <nav v-if="!isMobile || navOpened" @click="toggleNav">
                    <ul>
                        <li 
                            v-for="item in items" 
                            :key="item.name" 
                            :class="{ active: item.link === path }"
                        >
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

    ul {
        background-color: var(--color-bg-second);
        position: absolute;
        left: 0;
        right: 0;
        padding: 20px 0;
        height: auto;
        z-index: var(--z-header);

        @media (min-width: 1024px) {
            position: relative;
            left: auto;
            right: auto;
            height: 100%;
            padding: 0;
            display: flex;
        }

        li {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 24px 0 24px 10px;
            height: 40px;
            font-size: 20px;
            line-height: 28px;
            
            &:active {
                background-color: var(--color-green-600);
            }

            &:hover {
                background-color: var(--color-green-600-half);
            }

            @media (min-width: 1024px) {
                padding: 0 10px;
                height: auto;
                font-size: 24px;
                line-height: 32px;
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
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-green-600-half);

    @media (min-width: 1024px) {
        position: relative;
        top: auto;
        left: auto;
        width: auto;
        background-color: transparent;
    }
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
