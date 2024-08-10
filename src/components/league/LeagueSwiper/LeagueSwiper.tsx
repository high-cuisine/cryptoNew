import {FC} from "react";

import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import './slider.css';
import styles from "./styles.module.css";

import Jupiter from "../../../assets/images/Jupiter.png";
import Mars from "../../../assets/images/Mars.png";
import Neptune from "../../../assets/images/Neptune.png";
import Saturn from "../../../assets/images/Saturn.png";
import Uranus from "../../../assets/images/Uranus.png";

interface LeagueSwiperProps {
}

export const LeagueSwiper: FC<LeagueSwiperProps> = () => {
    return (
        <div className={styles.container}>
            <div className={styles.carouselWrapper}>
                <CarouselProvider className={styles.carouselCont}
                    naturalSlideWidth={100}
                    naturalSlideHeight={50}
                    totalSlides={5}>
                    <Slider>
                        <Slide className={styles.caruselItem} index={0}>
                            <img src={Jupiter} alt="JupiterImage"/>
                            <div className={styles.circle}></div>
                        </Slide>
                        <Slide className={styles.caruselItem} index={1}>
                            <img src={Mars} alt="MarsImage"/>
                            <div className={styles.circle}></div>
                        </Slide>
                        <Slide className={styles.caruselItem} index={2}>
                            <img src={Neptune} alt="NeptuneImage"/>
                            <div className={styles.circle}></div>
                        </Slide>
                        <Slide className={styles.caruselItem} index={3}>
                            <img src={Saturn} alt="SaturnImage"/>
                            <div className={styles.circle}></div>
                        </Slide>
                        <Slide className={styles.caruselItem} index={4}>
                            <img src={Uranus} alt="UranusImage"/>
                            <div className={styles.circle}></div>
                        </Slide>
                    </Slider>
                    <ButtonBack className={styles.back}><></></ButtonBack>
                    <ButtonNext className={styles.next}><></></ButtonNext>
                </CarouselProvider>
            </div>
        </div>
    );
}

