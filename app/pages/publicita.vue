<template>
  <div class="page publicita">
    <a
      href="https://www.cuscz.cz/o-nas/dotace-narodni-sportovni-agentury.html"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="~/assets/images/publicita_2026.webp" alt="Publicita 2026" />
    </a>
    <img src="~/assets/images/projekt_sokolovna_lipa.webp" alt="projekt Sokolovna Lípa" />
    <img src="~/assets/images/program_rozvoje_venkova.webp" alt="Program rozvoje venkova" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.publicita {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

img {
  width: 100%;
  object-fit: cover;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
