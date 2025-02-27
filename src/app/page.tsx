'use client'

import React, { useEffect, useRef, useState } from "react";
import ClearIconButton from "./components/Buttons/ClearIconButton/ClearIconButton";
import styles from "./page.module.css";

import { useRouter } from "next/navigation";
import SpinningLoader from "./components/LoadingAnimations/SpinningLoader/SpinningLoader";
import { useLocation } from "./hooks/useLocation";
import usePreloadBackground from "./hooks/usePreloadBackground";
import { HomepageLayoutFactory } from "./layouts/homepage/HomepageLayoutFactory";
import VerticalExpendedButton from "./components/Buttons/VerticalExpendedButton/VerticalExpendedButton";

export default function Page() {
    const router = useRouter();
    const [brightness, setBrightness] = useState<number>(0.6);
    const nowBrightness = useRef(brightness);

    const bgs = ["/imgs/backgrounds/bg1.png", "/imgs/backgrounds/bg2.png", "/imgs/backgrounds/bg3.jpg"];
    const [bg, setBg] = useState(0);
    const [changing, setchanging] = useState(false);
    const [location, locationLoading] = useLocation();
    const [loading, setLoading] = useState(true);
    const [zenMode, setZenMode] = useState(false);
    const timerLayoutRef = useRef<HTMLDivElement | null>(null);
    usePreloadBackground(bgs);

    useEffect(() => {
        // auto change background per 60s
        const bgTimer = setInterval(() => {
            setchanging(true);
        }, 60*1000);
        setLoading(false);

        return () => clearInterval(bgTimer);
    }, []);

    // change background
    useEffect(() => {
        if (changing) {
            nowBrightness.current = brightness;
            setBrightness(1);
            const changingTimer = setTimeout(() => {
                setBg(prevBg => (prevBg+1) % bgs.length);
                setBrightness(nowBrightness.current);
                setchanging(false);
            }, 1000);
            return () => clearInterval(changingTimer);
        }
    }, [changing]);

    if (loading || locationLoading) return <SpinningLoader />;

    const basicButtonsProps = {
        width: 50,
        height: 50,
        className: styles.linkBtn,
        stroke: "white"
    }

    const weatherButtonProps = {
        ...basicButtonsProps,
        src: "/imgs/icons/cloud.svg",
        onClick: () => router.push("/weather")
    };

    const changeImageButtonProps = {
        ...basicButtonsProps,
        src: "/imgs/icons/arrow-right-left.svg",
        onClick: () => {if(!changing) setchanging(true)}
    };

    const zenButtonProps = {
        ...basicButtonsProps,
        src: "/imgs/icons/hourglass.svg",
        onClick: () => {
            setZenMode(true);
            console.log("Click")
            const fadeIn = setTimeout(() => {
                if (timerLayoutRef.current) {
                    timerLayoutRef.current.classList.remove(styles.hiddenLayout);
                }
                else {
                    console.log("X");
                }
            }, 10);
            return () => clearTimeout(fadeIn);
        }
    };

    const zenCanselButtonProps = {
        ...basicButtonsProps,
        src: "/imgs/icons/arrow-left.svg",
        onClick: () => {
            if (timerLayoutRef.current) {
                timerLayoutRef.current.classList.add(styles.hiddenLayout);
            }
            const fadeOut = setTimeout(() => {
                setZenMode(false);
            }, 1000);
            return () => clearTimeout(fadeOut);
        }
    };
    
    const weatherButton = <ClearIconButton {...weatherButtonProps} />;
    const changeImageButton = <ClearIconButton {...changeImageButtonProps} />;
    const zenButton = <ClearIconButton {...zenButtonProps} />;
    const zenCanselButton = <ClearIconButton {...zenCanselButtonProps} />;

    const toolsButton = <VerticalExpendedButton
        icons={[
            weatherButtonProps.src,
            changeImageButtonProps.src,
            zenButtonProps.src
        ]}
        onClick={[
            weatherButtonProps.onClick,
            changeImageButtonProps.onClick,
            zenButtonProps.onClick
        ]}
    />

    return <HomepageLayoutFactory
        bgs={bgs}
        bgId={bg}
        brightness={brightness}
        zenMode={zenMode}
        changing={changing}
        location={location}
        timerLayoutRef={timerLayoutRef}
        nowBrightness={nowBrightness}
        setBrightness={setBrightness}
        weatherButton={weatherButton}
        changeImageButton={changeImageButton}
        zenButton={zenButton}
        zenCanselButton={zenCanselButton}
        toolsButton={toolsButton}
        zenLayoutStyle={styles.hiddenLayout}
    />
}