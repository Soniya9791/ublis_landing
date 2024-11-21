import React, { useEffect } from "react";
import Glide from "@glidejs/glide";

export default function Slider() {
  useEffect(() => {
    const slider = new Glide(".glide-01", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,
      animationDuration: 700,
      gap: 0,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  const sliderheadtag =
    "h-[auto] w-[75%] lg:w-[75%] flex flex-col justify-around items-center";
  const quoteicon = "text-[50px]";
  const heading = "text-[20px] font-normal text-center";
  const para = "text-[18px] text-normal text-center p-4";
  const nametag = "text-[22px] font-bold mt-2";

  return (
    <>
      {/*<!-- Component: Slider with controls inside --> */}
      <div className="relative w-[100%] lg:w-[90%] glide-01">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            <li clas className="flex justify-center">
              <div className={sliderheadtag}>
                <div className={quoteicon}>
                  <i className="bi bi-quote"></i>
                </div>
                <h1 className={heading}>
                  <b>“Ublis Yoga: Last-Minute Prenatal Yoga Success Story!</b>
                </h1>
                {/* <div className={para}>Just a month before delivery, my wife started prenatal yoga at Ublis Yoga. We were nervous about such a late start, but Ublis made all the difference. Their instructors were fantastic – knowledgeable, supportive, and great at adapting classes for different trimesters. My wife felt comfortable asking questions and progressing at her own pace, despite joining closer to delivery. The focus on breathing techniques and improving strength and flexibility proved invaluable. Not only did it contribute to a smoother birth, but the classes also helped manage her stress and anxiety in the lead-up.</div> */}
                <div className={para}>
                  A special thanks to Deepika, who went above and beyond with
                  phone guidance just before delivery. We highly recommend Ublis
                  Yoga for expectant moms, even if time is limited!
                  #PrenatalYogaWins #ThankYouUblis"
                </div>
                <h1 className={nametag}>~ Praveen Kumar</h1>
              </div>
            </li>

            <li className="flex justify-center">
              <div className={sliderheadtag}>
                <div className={quoteicon}>
                  <i className="bi bi-quote"></i>
                </div>
                <div className={para}>
                  I would like to thank Deepika madam for wonderful healthy yoga
                  classes for my daughter. Well experienced and professionally
                  qualified teacher and deep knowledge in yoga. Ambiance is
                  excellent. She learnt lot of advanced poses and won lot of
                  prizes in all competitions and increased her confidence level
                  and once again thanks to madam
                </div>
                <h1 className={nametag}>~ Kamala Ram</h1>
              </div>
            </li>

            <li clas className="flex justify-center">
              <div className={sliderheadtag}>
                <div className={quoteicon}>
                  <i className="bi bi-quote"></i>
                </div>
                <div className={para}>
                  Our entire family is attending the yoga sessions offered by
                  Ublis. Deepika mam is a well experienced and reliable teacher
                  / therapist. We will get to know the importance of every asana
                  when taught. Also we'll get specific one to one instructions
                  based on our health issues. Much recommended place for your
                  yoga thirst.
                </div>
                <h1 className={nametag}>~ Shobana G</h1>
              </div>
            </li>
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 flex items-center justify-between w-full h-0 px-4 top-1/2 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <title>prev slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <title>next slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
