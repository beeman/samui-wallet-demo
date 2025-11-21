import { demo } from './demo/index.ts'

await demo({
  height: 1080,
  saveVideo: true,
  sleepOnEnd: 3000,
  url: 'http://localhost:5173',
  width: 720,
})
