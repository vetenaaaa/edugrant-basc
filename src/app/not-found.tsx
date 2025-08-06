"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Combined component for 404 page
export default function NotFoundPage() {
  return (
    <div className="w-full h-screen bg-black overflow-x-hidden flex justify-center items-center relative">
      <MessageDisplay />
      <CharactersAnimation />
      <CircleAnimation />
    </div>
  );
}

// 1. Message Display Component
function MessageDisplay() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="absolute flex flex-col justify-center items-center w-[90%] h-[90%] z-[100]">
      <div
        className={`flex flex-col items-center transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="text-[35px] font-semibold text-black m-[1%]">
          Page Not Found
        </div>
        <div className="text-[80px] font-bold text-black m-[1%]">404</div>
        <div className="text-[15px] w-1/2 min-w-[40%] text-center text-black m-[1%]">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </div>
        <div className="flex gap-6 mt-8">
          <button
            onClick={handleGoBack}
            className="text-black border-2 border-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out px-6 py-2 h-auto text-base font-medium flex items-center gap-2 hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="bg-black text-white hover:bg-gray-900 transition-all duration-300 ease-in-out px-6 py-2 h-auto text-base font-medium flex items-center gap-2 hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

// 2. Characters Animation Component
type StickFigure = {
  top?: string;
  bottom?: string;
  src: string;
  transform?: string;
  speedX: number;
  speedRotation?: number;
};

function CharactersAnimation() {
  const charactersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Define stick figures with their properties
    const stickFigures: StickFigure[] = [
      {
        top: "0%",
        src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg",
        transform: "rotateZ(-90deg)",
        speedX: 1500,
      },
      {
        top: "10%",
        src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick1.svg",
        speedX: 3000,
        speedRotation: 2000,
      },
      {
        top: "20%",
        src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick2.svg",
        speedX: 5000,
        speedRotation: 1000,
      },
      {
        top: "25%",
        src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg",
        speedX: 2500,
        speedRotation: 1500,
      },
      {
        top: "35%",
        src: "https://raw.githubusercontent.com/RicardoYare/imagenes/9ef29f5bbe075b1d1230a996d87bca313b9b6a63/sticks/stick0.svg",
        speedX: 2000,
        speedRotation: 300,
      },
     
    ];

    // Clear existing content
    if (charactersRef.current) {
      charactersRef.current.innerHTML = "";
    }

    // Create and animate each stick figure
    stickFigures.forEach((figure, index) => {
      const stick = document.createElement("img");
      stick.classList.add("characters");
      stick.style.position = "absolute";
      stick.style.width = "18%";
      stick.style.height = "18%";

      // Set position
      if (figure.top) stick.style.top = figure.top;
      if (figure.bottom) stick.style.bottom = figure.bottom;

      // Set image source
      stick.src = figure.src;

      // Set initial transform if specified
      if (figure.transform) stick.style.transform = figure.transform;

      // Append to the container
      charactersRef.current?.appendChild(stick);

      // Skip animation for the last figure (index 5)
      if (index === 5) return;

      // Horizontal movement animation
      stick.animate([{ left: "100%" }, { left: "-20%" }], {
        duration: figure.speedX,
        easing: "linear",
        fill: "forwards",
      });

      // Skip rotation for the first figure (index 0)
      if (index === 0) return;

      // Rotation animation
      if (figure.speedRotation) {
        stick.animate(
          [{ transform: "rotate(0deg)" }, { transform: "rotate(-360deg)" }],
          {
            duration: figure.speedRotation,
            iterations: Infinity,
            easing: "linear",
          }
        );
      }
    });

    // Cleanup function
    return () => {
      if (charactersRef.current) {
        charactersRef.current.innerHTML = "";
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (charactersRef.current) {
        charactersRef.current.innerHTML = "";

        // Re-create animations after resize
        charactersRef.current.dispatchEvent(new Event("contentchanged"));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div ref={charactersRef} className="absolute w-[99%] h-[95%]" />;
}

// 3. Circle Animation Component
interface Circulo {
  x: number;
  y: number;
  size: number;
}

function CircleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestIdRef = useRef<number | undefined>(undefined);
  const timerRef = useRef(0);
  const circulosRef = useRef<Circulo[]>([]);

  // Initialize circles array
  const initArr = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    circulosRef.current = [];

    for (let index = 0; index < 300; index++) {
      const randomX =
        Math.floor(
          Math.random() * (canvas.width * 3 - canvas.width * 1.2 + 1)
        ) +
        canvas.width * 1.2;

      const randomY =
        Math.floor(
          Math.random() * (canvas.height - (canvas.height * -0.2 + 1))
        ) +
        canvas.height * -0.2;

      const size = canvas.width / 1000;

      circulosRef.current.push({ x: randomX, y: randomY, size });
    }
  };

  // Drawing function
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    timerRef.current++;
    context.setTransform(1, 0, 0, 1, 0, 0);

    const distanceX = canvas.width / 80;
    const growthRate = canvas.width / 1000;

    context.fillStyle = "white";
    context.clearRect(0, 0, canvas.width, canvas.height);

    circulosRef.current.forEach((circulo) => {
      context.beginPath();

      if (timerRef.current < 65) {
        circulo.x = circulo.x - distanceX;
        circulo.size = circulo.size + growthRate;
      }

      if (timerRef.current > 65 && timerRef.current < 500) {
        circulo.x = circulo.x - distanceX * 0.02;
        circulo.size = circulo.size + growthRate * 0.2;
      }

      context.arc(circulo.x, circulo.y, circulo.size, 0, 360);
      context.fill();
    });

    if (timerRef.current > 500) {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      return;
    }

    requestIdRef.current = requestAnimationFrame(draw);
  };

  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize and start animation
    timerRef.current = 0;
    initArr();
    draw();

    // Handle window resize
    const handleResize = () => {
      if (!canvas) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      timerRef.current = 0;
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }

      const context = canvas.getContext("2d");
      if (context) {
        context.reset();
      }

      initArr();
      draw();
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
