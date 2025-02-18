'use client'

import { useEffect, useState } from "react"
import SpinningLoader from "../components/LoadingAnimations/SpinningLoader/SpinningLoader";
import PressToggleButton from "../components/Buttons/PressToggleButton/PressToggleButton";
import styles from "./page.module.css";
import SideExpendedButton from "../components/Buttons/SideExpendedButton/SideExpendedButton";

export default function ChartPage() {
    const [loading, setLoading] = useState(true);

    const [toggleTitle, setToggleTitle] = useState(false);
    const [toggleSubtitle, setToggleSubtitle] = useState(false);
    const [toggleXAxis, setToggleXAxis] = useState(false);
    const [toggleYAxis, setToggleYAxis] = useState(false);
    const [toggleGrid, setToggleGrid] = useState(false);
    const [toggleLegend, setToggleLegend] = useState(false);

    const toggleTitleBtn = (
        <PressToggleButton
            text="Title"
            isToggle={toggleTitle}
            setIsToggle={setToggleTitle}
        />
    );

    const toggleSubtitleBtn = (
        <PressToggleButton
            text="Subtitle"
            isToggle={toggleSubtitle}
            setIsToggle={setToggleSubtitle}
        />
    );

    const toggleXAxisBtn = (
        <PressToggleButton
            text="X Axis"
            isToggle={toggleXAxis}
            setIsToggle={setToggleXAxis}
        />
    );

    const toggleYAxisBtn = (
        <PressToggleButton
            text="Y Axis"
            isToggle={toggleYAxis}
            setIsToggle={setToggleYAxis}
        />
    );

    const toggleGridBtn = (
        <PressToggleButton
            text="Grid"
            isToggle={toggleGrid}
            setIsToggle={setToggleGrid}
        />
    );

    const toggleLegendBtn = (
        <PressToggleButton
            text="Legend"
            isToggle={toggleLegend}
            setIsToggle={setToggleLegend}
        />
    );

    useEffect(() => {
        // do something...
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log(
            toggleTitle,
            toggleSubtitle,
            toggleXAxis,
            toggleYAxis,
            toggleGrid,
            toggleLegend
        );
    }, [
        toggleTitle,
        toggleSubtitle,
        toggleXAxis,
        toggleYAxis,
        toggleGrid,
        toggleLegend
    ])

    if (loading) return <SpinningLoader />;
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {toggleTitleBtn}
                {toggleSubtitleBtn}
                {toggleXAxisBtn}
                {toggleYAxisBtn}
                {toggleGridBtn}
                {toggleLegendBtn}
            </div>
            <SideExpendedButton 
                text={["A", "B", "C"]}
                onClick={[
                    () => {console.log("A")},
                    () => {console.log("B")},
                    () => {console.log("C")}
                ]}
                icon="/imgs/icons/download.svg"
                iconColor="white"
            />
        </div>
    );
}