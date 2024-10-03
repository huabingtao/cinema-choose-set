<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';
import { createTheater, randomizeSeats, SeatStatus, type Room } from '../data/screen'





const theater: Ref<Room[]> = ref([]);
if (!localStorage.getItem('theater')) {
    // 创建放映厅并设置座位状态
    const originTheater: Room[] = createTheater();


    // 随机设置其他房间的座位状态
    originTheater.forEach((room) => {
        randomizeSeats(room);
    });

    // 设置 1 号房间 e2 和 e3 座位已购买
    originTheater[0].seats[4][1].status = SeatStatus.Purchased; // e2
    originTheater[0].seats[4][2].status = SeatStatus.Purchased; // e3
    originTheater[0].checked = true;
    localStorage.setItem('theater', JSON.stringify(originTheater))
    theater.value = originTheater
} else {
    theater.value = JSON.parse(localStorage.getItem('theater') as string)
}

const activeCarriageNum = computed(() => {
    const room = theater.value.find((item) => {
        return item.checked
    })
    if (!room) return null;
    return room.roomNumber;
})

const activeSeats = computed(() => {
    const room = theater.value.find((item) => {
        return item.checked
    })
    if (!room) return [];
    return room.seats.flatMap((row) => row.filter((seat) => seat.status === SeatStatus.Selected).map(item => item.seat));
})

</script>

<template>
    <main>
        <div class="text-3xl font-bold underline">
            <router-link to="/screening-room">去选座</router-link>
        </div>
        <div v-if="!activeCarriageNum || !activeSeats.length">
            您当前未选择座位
        </div>
        <div v-else class="text-xl">
            您当前选中的是第 <span class="text-[#ec7369]">{{ activeCarriageNum }}</span> 放映厅<span class="text-[#ec7369]">{{
                activeSeats.join(' ') }}</span>号座位
        </div>
    </main>
</template>
