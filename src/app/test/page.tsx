'use client'

import { useEffect, useState } from "react";
import CircleProgress from "../components/ProgressBars/CircleProgress";
import CircleCountdownTimer from "../components/Clocks/CircleCountdownTimer/CircleCountdownTimer";

export default function TestPage() {
    
    return <div>
        <CircleCountdownTimer
            totalTime={60}
            subtitle="Init"
            subtitleOnPause="Pause"
            subtitleOnFinish="Finish"
        />
    </div>
}