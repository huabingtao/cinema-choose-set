<script setup lang="ts">
import type { Room, Seat } from '@/data/screen';
import { SeatStatus } from '@/data/screen';
import { computed } from 'vue';


const props = defineProps<{
  CarriageNum: string
  theater: Room[]
}>()

const emit = defineEmits(['update:theater']);

const currentSeats = computed(() => {
  return props.theater.find(item => item.checked)!.seats
})
const roomNums = computed(() => {
  return props.theater.map(item => item.roomNumber)
})

const getSeatClass = (status: string) => {
  switch (status) {
    case SeatStatus.Selected:
      return 'bg-white text-[#6a3e4b]';
    case SeatStatus.Purchased:
      return 'bg-[#e57472] text-white';
    case SeatStatus.Reserved:
      return 'text-[#aaa6b6] !border-purchasedColor';
    default:
      return '';
  }
}

const handleClickSeat = (seat: Seat) => {
  if (seat.status === SeatStatus.Reserved || seat.status === SeatStatus.Purchased) return
  if (seat.status === SeatStatus.Selected) {
    seat.status = SeatStatus.Free
  } else {
    seat.status = SeatStatus.Selected
  }
  emit('update:theater', props.theater)
}

const handleToogleRoom = (room: string) => {
  if (room === props.CarriageNum) return
  props.theater.forEach(room => {
    room.seats.forEach(row => {
      row.forEach(seat => {
        if (seat.status === SeatStatus.Selected) {
          seat.status = SeatStatus.Free
        }
      })
    })
  })
  props.theater.forEach(item => {
    if (item.roomNumber === room) {
      item.checked = true
    } else {
      item.checked = false
    }
  })
  emit('update:theater', props.theater)
}
</script>

<template>
  <div class="mt-[15px] w-full flex justify-between">
    <div class="set w-[75%] border-white rounded-md border-2 p-2">
      <div class="text-center">{{ CarriageNum }}</div>
      <div v-for="(row, key) in currentSeats" :key="key"
        class="set-row flex flex-center justify-between align-center mt-2">
        <!-- 分成两组，分别渲染 -->
        <div class="slide flex justify-between">
          <!-- 渲染前两个座位 -->
          <div v-for="(seat, seatIndex) in row.slice(0, 2)" :key="seatIndex"
            :class="['seat', getSeatClass(seat.status)]" @click="handleClickSeat(seat)">
            {{ seat.seat }}
          </div>
        </div>
        <div class="slide flex justify-between">
          <!-- 渲染后两个座位 -->
          <div v-for="(seat, seatIndex) in row.slice(2, 4)" :key="seatIndex"
            :class="['seat', getSeatClass(seat.status)]" @click="handleClickSeat(seat)">
            {{ seat.seat }}
          </div>
        </div>
      </div>
    </div>
    <div class="room-num">
      <div @click="handleToogleRoom(item)" v-for="item in roomNums" :key="item" class="w-[34px] h-[70px] bg-[#191523] rounded text-white text-lg 
        text-bold flex items-center justify-center mt-2" :class="{ 'bg-[#ec7369]': item === props.CarriageNum }">
        {{ item }}</div>
    </div>
  </div>
</template>

<style scoped>
.set {
  .set-row {
    margin-left: -10px;
    margin-right: -10px;

    .slide {
      >div {
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        margin: 0 10px;
        border: 1px solid #6a3e4b;
        border-radius: 4px;
      }
    }

  }
}

.room-num {
  margin-top: -10px;
}
</style>
