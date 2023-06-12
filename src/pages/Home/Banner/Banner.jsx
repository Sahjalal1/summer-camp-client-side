import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useEffect, useRef, useState } from 'react';

import img1 from "../../../assets/bannar/img-1.avif"
// import img2 from "../../../assets/bannar/img-2.jpg"
import img3 from "../../../assets/bannar/img-3.webp"
import img4 from "../../../assets/bannar/img-4.webp"


const Banner = () => {

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
    return (
        <div className='w-[80%] mx-auto'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwipe "
            >
                <SwiperSlide>
                    {/* style={{ backgroundImage: `url(${img1})` }} */}
                    <div className='flex flex-col-reverse lg:flex-row justify-center lg:items-center gap-10'>
                        <div className='w-[90%] mx-auto lg:w-[45%] py-3 px-2 border-2 my-2 shadow-2xl bg-black'>
                            <img src={img1} className=' lg:w-[600px] mx-auto lg:h-[400px]' alt="" />
                        </div>
                        <div className='w-[90%] mx-auto lg:w-[45%] text-error'>
                            <h1 className='text-2xl lg:text-4xl text-center'>Hi There </h1>
                            <p className='text-center text-xl'>Welcome to our Wevside</p>
                            <p className='text-center'>Here we teach different types of <span className='text-error font-serif'>music Instrument</span></p>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    {/* style={{ backgroundImage: `url(${img1})` }} */}
                    <div className='flex flex-col-reverse lg:flex-row justify-center lg:items-center gap-10 '>
                        <div className='w-[90%] mx-auto lg:w-[45%] py-3 px-2 border-2 my-2 shadow-2xl bg-black'>
                            <img src={img3} className=' lg:w-[600px] mx-auto lg:h-[400px]' alt="" />
                        </div>
                        <div className='w-[90%] mx-auto lg:w-[45%] text-error'>
                            <h1 className='text-2xl lg:text-4xl text-center'>Hi There </h1>
                            <p className='text-center text-xl'>Welcome to our Wevside</p>
                            <p className='text-center'>Here we teach different types of <span className='text-error font-serif'>music Instrument</span></p>
                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    {/* style={{ backgroundImage: `url(${img1})` }} */}
                    <div className='flex flex-col-reverse lg:flex-row justify-center lg:items-center gap-10 '>
                        <div className='w-[90%] mx-auto lg:w-[45%] py-3 px-2 border-2 my-2 shadow-2xl bg-black'>
                            <img src={img4} className=' lg:w-[600px] mx-auto lg:h-[400px]' alt="" />
                        </div>
                        <div className='w-[90%] mx-auto lg:w-[45%] text-error'>
                            <h1 className='text-2xl lg:text-4xl text-center'>Hi There </h1>
                            <p className='text-center text-xl'>Welcome to our Wevside</p>
                            <p className='text-center'>Here we teach different types of <span className='text-error font-serif'>music Instrument</span></p>
                        </div>
                    </div>

                </SwiperSlide>

                <div className="autoplay-progress w-6" slot="container-end">
                    <div ref={progressCircle} className="radial-progress w-20" style={{ "--value": "100", "--thickness": "2px" }}>
                        <span className='text-black' ref={progressContent}></span>
                    </div>
                </div>
            </Swiper>
        </div>
    );
};

export default Banner;