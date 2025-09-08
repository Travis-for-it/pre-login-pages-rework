<template>
  <div class="inline-block relative">
    <div class="border border-gray-300 overflow-hidden bg-white shadow-sm">
        <span>{{ currentLocale.languageWord.toUpperCase() }}</span>
      <button
        @click="toggleDropdown"
        @keydown.down.prevent="focusNextItem"
        @keydown.up.prevent="focusPreviousItem"
        @keydown.esc="closeDropdown"
        class="w-full flex justify-between items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        :aria-expanded="showDropdown"
        aria-haspopup="true"
        :aria-controls="'locale-dropdown'"
        data-testid="language-switcher-button"
      >
        {{ currentLocale.language.toUpperCase() }}
        <svg
          class="ml-2 h-5 w-5"
          :class="{'transform rotate-180' : showDropdown}"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <div
        v-if="showDropdown"
        id="locale-dropdown"
        class="w-full border border-gray-200 absolute bg-white divide-y divide-gray-200 z-10"
        role="menu"
      >
      <div v-for="([localeKey, localeData], index) in localeEntries" 
          :key="localeKey">
          <a v-if="!localeData.disabled"
            :href="getLocaleLink(localeKey)"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:outline-none"
            role="menuitem"
            tabindex="0"
            ref="menuItems"
            @keydown.down.prevent="focusNextItem"
            @keydown.up.prevent="focusPreviousItem"
            @keydown.esc="closeDropdown"
          >
            {{ localeData.language.toUpperCase() }}
          </a>
          <span v-else>{{ localeData.language.toUpperCase() }}</span>
      </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import { defaultLocale } from '../../utils/defaultLocale';
import { type AvailableLocales, type LocaleKey } from '../../utils/availableLocales';

interface Props {
  availableLocales: AvailableLocales;
  currentLocale: LocaleKey;
  disabledLocales?: string[];
}

const props = defineProps<Props>()
const localeKeys = Object.keys(props.availableLocales)
const localeEntries = computed(() => Object.entries(props.availableLocales))
const showDropdown = ref(false)
const currentLocale = props.availableLocales[props.currentLocale]
const menuItems = ref<(HTMLElement | null)[]>([])

const toggleDropdown = async () => {
  showDropdown.value = !showDropdown.value
  await nextTick()
  if (showDropdown.value && menuItems.value.length > 0) {
    menuItems.value[0]?.focus()
  }
}

const closeDropdown = () => {
  showDropdown.value = false
}

const focusNextItem = () => {
  const currentIndex = menuItems.value.findIndex(el => el === document.activeElement)
  const nextIndex = (currentIndex + 1) % menuItems.value.length
  menuItems.value[nextIndex]?.focus()
}

const focusPreviousItem = () => {
  const currentIndex = menuItems.value.findIndex(el => el === document.activeElement)
  const prevIndex = (currentIndex - 1 + menuItems.value.length) % menuItems.value.length
  menuItems.value[prevIndex]?.focus()
}

const getLocaleLink = (newLocale: string) => {
  const url = new URL(window.location.href)
  const pathParts = url.pathname.split('/').filter(Boolean)
  const search = url.search

  if (localeKeys.includes(pathParts[0])) {
    pathParts.shift()
  }

  const newPath =
    newLocale === defaultLocale
      ? '/' + pathParts.join('/')
      : `/${newLocale}/${pathParts.join('/')}`

  return newPath + search
}

// onMounted(() => {
//   currentLocale.value = getCurrentLocale()
// })
</script>
