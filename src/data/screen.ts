// 座位状态的枚举
export enum SeatStatus {
  Free = 'Free',
  Selected = 'Selected',
  Reserved = 'Reserved',
  Purchased = 'Purchased'
}

// 定义每个座位的类型
export interface Seat {
  seat: string // 座位编号，如 'a1'
  status: SeatStatus // 座位状态
}

// 定义房间的类型
export interface Room {
  roomNumber: string // 房间号
  seats: Seat[][] // 座位的二维数组
  checked: boolean
}

// 创建一个房间的座位结构 (a-k 每排 4 个座位)
function createRoom(): Seat[][] {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
  const seats: Seat[][] = []

  rows.forEach((row) => {
    const rowSeats: Seat[] = []
    for (let i = 1; i <= 4; i++) {
      rowSeats.push({
        seat: `${row}${i}`,
        status: SeatStatus.Free // 默认状态为空闲
      })
    }
    seats.push(rowSeats)
  })

  return seats
}

// 初始化 7 个房间
function createTheater(): Room[] {
  const rooms: Room[] = []
  for (let i = 0; i < 7; i++) {
    rooms.push({
      roomNumber: String(i + 1).padStart(2, '0'),
      seats: createRoom(),
      checked: false
    })
  }
  return rooms
}

// 随机设置座位状态
function randomizeSeats(room: Room): void {
  room.seats.forEach((row) => {
    row.forEach((seat) => {
      // 随机设置座位状态
      const randomStatus = Math.random()
      if (randomStatus < 0.2) {
        seat.status = SeatStatus.Reserved
      }
    })
  })
}

export { createTheater, randomizeSeats }
