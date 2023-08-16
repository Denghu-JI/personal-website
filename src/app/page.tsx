"use client"
import SparkleBtn from "@/welcome/cover.jsx"
import Alink from "@/welcome/alink.jsx"

import "./buttomIcons.css"

export default function Home() {
  return (
    <main>
      <Alink />
      <SparkleBtn />
      <div style={{height : "50vh"}}></div>
    </main>
  )
}