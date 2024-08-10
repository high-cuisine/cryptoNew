import {FC, useEffect, useRef} from "react";

import {Game} from "../../BlindColor/game/Game.js";

import {useKeepAliveEffect} from "react-keep-alive";

import styles from "./styles.module.css";

interface NewGamePageProps {}

const NewGamePage: FC<NewGamePageProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const gameRef = useRef<Game>();

    const onCanvasResize = () => {
        if (!canvasRef.current || !gameRef.current) return;

        gameRef.current.resizeCanvas(window.innerWidth, window.innerHeight, true);
    }

    useEffect(() => {
        if (!canvasRef.current) return;

        gameRef.current = new Game({
            canvas: canvasRef.current,
            sizes: {
                width: window.innerWidth,
                height: window.innerHeight,
                applyCSSSizes: true,
            },
            debug: true,
        });

        gameRef.current.initialize();

        onCanvasResize();
        window.addEventListener('resize', onCanvasResize);

        return () => {
            window.removeEventListener('resize', onCanvasResize);

            // gameRef.current.shutdown();

            gameRef.current = null;
        }
    }, []);

    useKeepAliveEffect(() => {
        window.scrollTo(0, -1);

        function onTouchMove(event) {
            event.preventDefault();
            window.scrollTo(0, -1);
        }

        document.addEventListener("touchmove", onTouchMove, {
            passive: false
        });

        return () => {
            document.removeEventListener("touchmove", onTouchMove);
        }
    })

    return (
        <div className={styles.page}>
            <canvas ref={canvasRef} className={styles.gameScreen}/>
        </div>
    );
}

export {
    NewGamePage,
}
