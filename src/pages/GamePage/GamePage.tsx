import {FC, useEffect, useRef} from "react";

import {Game} from "../../game/game";

import styles from "./styles.module.css";
import {useKeepAliveEffect} from "react-keep-alive";

interface GameProps {}

const GamePage: FC<GameProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const gameRef = useRef<Game>();

    const onCanvasResize = () => {
        if (!canvasRef.current) return;

        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;

        canvasRef.current.getContext('2d').transform(1, 0, 0, 1, 0, 0);
    }

    useEffect(() => {
        if (!canvasRef.current) return;

        onCanvasResize();

        window.addEventListener('resize', onCanvasResize);

        gameRef.current = new Game(canvasRef.current);

        gameRef.current.start();

        return () => {
            window.removeEventListener('resize', onCanvasResize);

            gameRef.current.teardown();

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
    GamePage,
}
