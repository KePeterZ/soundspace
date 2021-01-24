import express from "express"
import api from "./api"
import fs from "fs"
const app = express()

interface positions {
  [key: string]: {
    name: string,
    streamLocation: string,
    priority: number,
    pos: {
      x: number,
      y: number,
      z: number
    },
    heading: {
      x: number,
      y: number,
      z: number
    }
  }
}

export var positions: positions
positions = JSON.parse(fs.readFileSync("test/pos.json")+"")

app.use("/test", express.static("./test"))
app.use("/", express.static("./client"))

app.use("/api", api)
app.listen(3000, () => {
  console.log("LOOOOL")
})