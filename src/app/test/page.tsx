'use client'

import VerticalExpendedButton from "../components/Buttons/VerticalExpendedButton/VerticalExpendedButton";

export default function TestPage() {
    
    return <VerticalExpendedButton 
        icons={[
            "/imgs/icons/cloud.svg",
            "/imgs/icons/hourglass.svg",
            "/imgs/icons/water.svg"
        ]}
        onClick={[
            () => {console.log("1")},
            () => {console.log("2")},
            () => {console.log("3")}
        ]}
    />
}