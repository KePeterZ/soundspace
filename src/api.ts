import express from "express"
const api = express.Router()
import { positions } from "./"

// Use JSON parser
api.use(express.json())

// Get every object on the soundspace.
api.get("/all", async(req, res) => {
  res.json(positions)
})

let inBoundingBox = (pos: {x: number, y: number, z: number}, pos2: {x: number, y: number, z: number}, distance=5) => {
  let x = pos.x
  let y = pos.y
  let z = pos.z
  for(let i=x-distance; i<x+distance; i++) {
    for(let ii=z-distance; ii<z+distance; ii++) {
      if(pos2.x === i && pos2.z === ii) {
        return true
      }
    }
  }
  return false
}

api.get("/change", (req, res) => {
  positions.id.name = "WORKS!"
})

// Get every soundspace object in a radius (lazy at math, so in a rectangle)
api.post("/radiusBeta", async(req, res) => {
  let pos: {x: number, y: number, z: number} = req.body.pos
  let pos2: {x: number, y: number, z: number} = req.body.pos2
  res.json(inBoundingBox(pos, pos2))
})

api.get("/radius/:playerID", async(req, res) => {
  let playerID: string = req.params.playerID
  let near: any = []
  Object.entries(positions).forEach(e => {
    if(inBoundingBox(positions[playerID].pos, e[1].pos)) {
      near.push(e[1])
    }
  })
  res.json(near)
})

api.post("/moved", async(req, res) => {
  let newPos = req.body.newpos
  let playerID = req.body.playerID
  positions[playerID].pos = newPos
  res.json(true)
})

export default api;