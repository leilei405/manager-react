interface Person {
  name: string
  age: number
  location: string
}
type K1 = keyof Person // 'name' | 'age' | 'location'
const k: K1 = 'name'

// console.log(k)

const info = {
  name: '张三',
  age: 18,
  location: '北京'
}

type User = typeof info
