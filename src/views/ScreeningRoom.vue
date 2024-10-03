<script setup lang="ts">
import ScreeningRoomInfo from '@/components/ScreeningRoomInfo.vue';
import ScreeningRoomLabel from '@/components/ScreeningRoomLabel.vue';
import ScreeningSet from '@/components/ScreeningSet.vue';
import type { Room } from '@/data/screen';
import router from '@/router';
import { computed, ref, type Ref } from 'vue';

const theater: Ref<Room[]> = ref(JSON.parse(localStorage.getItem('theater') as string));

const activeCarriageNum = computed(() => {
    const room = theater.value.find((item) => item.checked);
    // 如果没有找到房间，默认返回 "01"
    if (!room) return "01";

    // 将房间编号转为两位数的字符串
    return room.roomNumber
});

const msg = 'Choose your seat'

const cinemaName = "HANOI - LEBERA"

const handleSubmit = () => {
    localStorage.setItem('theater', JSON.stringify(theater.value));
    router.go(-1)
}

</script>

<template>
    <main>
        <div class="screening-room">
            <ScreeningRoomInfo :msg="msg" :CarriageNum="activeCarriageNum" :name="cinemaName"></ScreeningRoomInfo>
            <ScreeningRoomLabel></ScreeningRoomLabel>
            <ScreeningSet v-model:theater="theater" :CarriageNum="activeCarriageNum"></ScreeningSet>
            <div @click="handleSubmit"
                class="bg-[#eb736c] rounded text-white text-lg h-12 leading-[48px] text-center mt-4">
                Continue
            </div>
        </div>
    </main>
</template>
