<template>
    <div class="bg-white max-w-full mx-auto border border-gray-200">
        <div class="shadow-box">
            <div class="relative border-b border-gray-200">
                <button type="button" class="w-full px-6 py-6 text-left" @click="toggleAccordion">
                <div class="flex items-center justify-between"> <span> {{ question }} </span> 
                    <svg :class="{'transform rotate-180' : isOpen}" class="w-5 h-5 text-gray-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 9l-7 7-7-7"></path></svg>
                </div>
                </button>
                <div ref="accordionContent" class="relative overflow-hidden transition-all max-h-0 duration-200" :style="isOpen ? 'max-height: ' + accordionContent.scrollHeight + 'px' : ''">
                    <div class="px-6 pb-6">
                        <p>{{ content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
    question: string;
    content: string;
}

const props = defineProps<Props>()

const isOpen = ref(false)
const accordionContent = ref()

const toggleAccordion = () => {
    isOpen.value = !isOpen.value
}
</script>