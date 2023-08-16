"use client"
import SparkleBtn from "@/welcome/cover.jsx"
import Alink from "@/welcome/alink.jsx"
import BallSimulator from "@/welcome/rabbits/rabbits.jsx"

import "./css/buttomIcons.css"
import "./css/rabbits.css"

// import "../welcome/button"

export default function Home() {
  return (
    <main>
      <BallSimulator />
      <Alink />
      <SparkleBtn />
      <div style={{height : "50vh"}}></div>
    </main>
  )
}