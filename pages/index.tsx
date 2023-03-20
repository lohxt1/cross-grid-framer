import { NextPage } from "next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/tailwind";

const data = Array.from({ length: 10 }).map((_, idx) => ({
  src: `/portraits/p${idx + 1}.png`,
}));

const Home: NextPage = () => {
  const [counter, setCounter] = useState(0);

  const loadImages = () => {
    data.forEach((d) => {
      if (d?.src) {
        var _image = new Image();
        _image.onload = function () {
          setCounter((_) => _ + 1);
        };
        _image.src = d?.src;
      }
    });
  };

  useEffect(() => {
    loadImages();
  }, []);

  const isLoaded = counter == 10;

  const circumference = 30 * 2 * Math.PI;
  const percent = counter * 10;

  return (
    <div
      className={cn(
        "flex h-[100dvh] w-screen flex-wrap items-center justify-center align-middle",
      )}
    >
      <div className={cn("flex h-[63dvh] w-[84dvh] flex-wrap")}>
        {isLoaded ? (
          <>
            <div
              className={cn(
                "relative m-[0.5dvh] h-[20dvh] w-[20dvh] text-5xl font-black",
              )}
            >
              {/* <div className={cn("absolute top-[0dvh] left-0 mx-auto")}>↘</div> */}
            </div>
            {data.map((_, idx) => (
              <>
                <motion.div
                  className={cn(
                    "relative m-[0.5dvh] h-[20dvh] w-[20dvh] cursor-pointer",
                  )}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                  whileHover="hover"
                  variants={{
                    initial: {},
                    visible: {},
                    exit: {},
                    hover: {},
                  }}
                >
                  {/* grid image */}
                  <motion.img
                    key={`p${idx + 1}`}
                    src={_?.src}
                    className={cn(
                      "absolute top-0 left-0 h-[20dvh] w-[20dvh] object-cover grayscale",
                    )}
                    variants={{
                      initial: { opacity: 0, y: `0.25em` },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: 0,
                          duration: 1,
                          ease: [0.2, 0.65, 0.3, 0.9],
                        },
                      },
                      exit: { opacity: 0, y: `-0.25em` },
                      hover: {},
                    }}
                  />
                  {/* selected image highlight */}
                  <motion.div
                    className={cn(
                      "absolute top-0 left-0 h-[20dvh] w-[20dvh] border-2 border-dashed border-gray-900 object-cover grayscale",
                    )}
                    variants={{
                      initial: { opacity: 0, zIndex: 0 },
                      visible: {},
                      hover: { opacity: 1, zIndex: 4 },
                    }}
                  ></motion.div>
                  {/* selected image */}
                  <motion.img
                    key={`p${idx + 1}`}
                    src={_?.src}
                    className={cn(
                      "pointer-events-none fixed top-0 left-0 h-[100dvh] w-[100dvw] object-contain",
                    )}
                    variants={{
                      initial: { opacity: 0, zIndex: 0 },
                      visible: {},
                      hover: { opacity: 1, zIndex: 3 },
                    }}
                  />
                  {/* backdrop blur */}
                  <motion.div
                    key={`p${idx + 1}`}
                    className={cn(
                      "pointer-events-none fixed top-0 left-0 h-[100dvh] w-[100dvw] backdrop-blur-lg",
                    )}
                    variants={{
                      initial: { opacity: 0, zIndex: 0 },
                      visible: {},
                      hover: { opacity: 1, zIndex: 2 },
                    }}
                  />
                  {/* top border line */}
                  <div
                    className={cn(
                      "absolute left-[-5dvh] top-0 h-[1px] w-[30dvh] bg-black dark:bg-white",
                    )}
                  ></div>
                  {/* bottom border line */}
                  <div
                    className={cn(
                      "absolute left-[-5dvh] bottom-0 h-[1px] w-[30dvh] bg-black dark:bg-white",
                    )}
                  ></div>
                  {/* left border line */}
                  <div
                    className={cn(
                      "absolute top-[-5dvh] left-0 h-[30dvh] w-[1px] bg-black dark:bg-white",
                    )}
                  ></div>
                  {/* right border line */}
                  <div
                    className={cn(
                      "absolute top-[-5dvh] right-0 h-[30dvh] w-[1px] bg-black dark:bg-white",
                    )}
                  ></div>
                </motion.div>
              </>
            ))}
            <div
              className={cn(
                "relative m-[0.5dvh] h-[20dvh] w-[20dvh] text-5xl font-black",
              )}
            >
              {/* <div className={cn("absolute bottom-[0dvh] right-0 mx-auto")}>
                ↖
              </div> */}
            </div>
          </>
        ) : (
          <div
            x-data="scrollProgress"
            className="inline-flex h-full w-full items-center justify-center overflow-hidden rounded-full"
          >
            <svg className="h-[64px] w-[64px] -rotate-90">
              <circle
                className="text-white dark:text-black"
                strokeWidth="1"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="32"
                cy="32"
              />
              <circle
                className="text-black dark:text-white"
                strokeWidth="1"
                strokeDasharray={circumference}
                strokeDashoffset={
                  circumference - (percent / 100) * circumference
                }
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="30"
                cx="32"
                cy="32"
              />
            </svg>
            <span className="absolute text-sm text-black dark:text-white">{`${percent}%`}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
