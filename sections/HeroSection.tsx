import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LinkButton from "../components/LinkButton";
import { CONTACT_EMAIL } from "utils/site";
import satNaing from "../public/satnaing-illustration.webp";
import laptop from "../public/laptop-illustration.webp";

type Point = { x: number; y: number; z: number; speed: number; phase: number };

const HeroSection: React.FC = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const q = gsap.utils.selector(sectionRef);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(q(".bg-text"), {
      scrollTrigger: { trigger: q(".bg-text"), scrub: true },
      y: 350,
    });
    gsap
      .timeline({ defaults: { stagger: 0.2, duration: 0.3 } })
      .fromTo(q(".text-animation"), { y: 100 }, { y: 0, delay: 1 });
    const image = gsap.timeline({ repeat: -1 });
    image
      .to(q(".image-animation"), 3, {
        y: "-=30",
        x: "+=20",
        rotation: "-=2",
        ease: "power1.easeInOut",
      })
      .to(q(".image-animation"), 2, {
        y: "+=30",
        x: "-=20",
        rotation: "-=2",
        ease: "power1.easeInOut",
      })
      .to(q(".image-animation"), 3, {
        y: "-=20",
        rotation: "+=2",
        ease: "power1.easeInOut",
      })
      .to(q(".image-animation"), 3, {
        y: "+=20",
        rotation: "+=2",
        ease: "power1.easeInOut",
      });
    const computer = gsap.timeline({ repeat: -1 });
    computer
      .to(q(".laptop"), 3, {
        y: "-=10",
        x: "+=10",
        rotation: "-=1",
        ease: "Power1.easeInOut",
      })
      .to(q(".laptop"), 2, {
        y: "+=10",
        x: "-=10",
        rotation: "-=1",
        ease: "power1.easeInOut",
      })
      .to(q(".laptop"), 3, {
        y: "-=10",
        rotation: "+=1",
        ease: "power1.easeInOut",
      })
      .to(q(".laptop"), 3, {
        y: "+=10",
        rotation: "+=1",
        ease: "power1.easeInOut",
      });
  }, [q]);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let mouse = { x: 0, y: 0 };
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from(
        { length: Math.min(95, Math.max(52, Math.floor(width / 13))) },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random(),
          speed: 0.15 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
        })
      );
    };
    const move = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const drawRibbons = (time: number) => {
      const motion = time * 0.00035;
      const originX = width * 0.58;
      const originY = height * 0.53;
      for (let ribbon = 0; ribbon < 4; ribbon += 1) {
        context.beginPath();
        for (let step = -20; step <= width + 20; step += 14) {
          const wave =
            Math.sin(step * 0.012 + motion + ribbon * 0.8) * (18 + ribbon * 7) +
            Math.sin(step * 0.026 - motion * 1.7) * 9;
          const y =
            originY +
            (step - originX) * (0.16 + ribbon * 0.018) +
            wave -
            ribbon * 24;
          if (step === -20) context.moveTo(step, y);
          else context.lineTo(step, y);
        }
        context.strokeStyle = `rgba(${
          ribbon % 2 ? "124,92,255" : "56,189,248"
        },${0.12 - ribbon * 0.015})`;
        context.lineWidth = ribbon === 1 ? 1.8 : 1;
        context.stroke();
      }
    };
    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const cx = width * 0.63 + (mouse.x - width / 2) * 0.035;
      const cy = height * 0.48 + (mouse.y - height / 2) * 0.035;
      const motion = time * 0.00025;
      drawRibbons(time);
      context.strokeStyle = "rgba(56,189,248,.18)";
      context.lineWidth = 1;
      for (let ring = 0; ring < 3; ring += 1) {
        context.beginPath();
        context.arc(
          cx,
          cy,
          38 + ring * 28 + Math.sin(motion * 4 + ring) * 5,
          0,
          Math.PI * 2
        );
        context.stroke();
      }
      points.forEach((point, index) => {
        point.y -= point.speed * 0.18;
        if (point.y < -20) point.y = height + 20;
        const x =
          point.x + Math.sin(motion + point.phase) * (10 + point.z * 28);
        const y =
          point.y + Math.cos(motion * 1.3 + point.phase) * (7 + point.z * 18);
        const distance = Math.hypot(x - cx, y - cy);
        context.fillStyle = `rgba(120,168,255,${Math.max(
          0.15,
          0.8 - distance / (width * 0.75)
        )})`;
        context.beginPath();
        context.arc(x, y, 0.7 + point.z * 1.7, 0, Math.PI * 2);
        context.fill();
        points.slice(index + 1).forEach((other) => {
          const ox =
            other.x + Math.sin(motion + other.phase) * (10 + other.z * 28);
          const oy =
            other.y + Math.cos(motion * 1.3 + other.phase) * (7 + other.z * 18);
          const gap = Math.hypot(x - ox, y - oy);
          if (gap < 105) {
            context.strokeStyle = `rgba(120,168,255,${(1 - gap / 105) * 0.11})`;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(ox, oy);
            context.stroke();
          }
        });
      });
      context.strokeStyle = "rgba(120,168,255,.17)";
      context.beginPath();
      context.arc(
        cx,
        cy,
        Math.min(width, height) * 0.3,
        motion,
        motion + Math.PI * 1.35
      );
      context.stroke();
      frame = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", move);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", move);
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      className="hero-interface relative isolate overflow-hidden bg-bglight text-bgdark dark:bg-[#07111f] dark:text-white"
    >
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex min-h-[min(850px,100vh)] max-w-7xl flex-col justify-center px-5 pb-10 pt-28 sm:px-10 lg:flex-row-reverse lg:items-center lg:gap-8 lg:px-16 lg:pb-14">
        <span
          aria-hidden="true"
          className="bg-text pointer-events-none absolute -top-36 z-0 rotate-12 select-none scale-150 text-center text-9xl font-bold tracking-wide text-white/5"
        >
          PASSIONATE PROGRAMMER FREELANCER SOFTWARE ENGINEER
        </span>
        <div className="image-animation z-10 mx-auto mt-0 select-none px-0 xs:mt-6 sm:mt-14 lg:mt-0 lg:basis-1/3 lg:p-0">
          <div className="relative mx-auto flex h-80 w-72 items-center md:w-80">
            <div className="pointer-events-none absolute mx-auto scale-90 xs:scale-95">
              <Image
                src={satNaing}
                width={1177}
                height={1374}
                priority
                id="character-illustration"
                aria-label="Christian Esquivel character illustration levitating with a Macbook"
                alt="Christian Esquivel character illustration"
              />
            </div>
            <div className="laptop pointer-events-none absolute left-0 top-14 scale-[.41] xs:top-16 xs:scale-[.45]">
              <Image
                src={laptop}
                width={559}
                height={386}
                aria-hidden="true"
                alt="Laptop illustration"
              />
            </div>
          </div>
        </div>
        <div className="relative z-10 lg:basis-2/3">
          <span className="font-medium text-marrsgreen dark:text-carrigreen lg:text-lg">
            Hello! My name is
          </span>
          <div className="overflow-hidden">
            <h1 className="text-animation my-1 text-4xl font-semibold md:my-2 md:text-5xl lg:text-7xl">
              Christian Esquivel
            </h1>
          </div>
          <div className="overflow-hidden">
            <span className="text-animation my-1 block text-2xl font-medium text-marrsgreen dark:text-carrigreen md:my-3 md:text-3xl lg:text-5xl">
              A Software Engineer,
            </span>
          </div>
          <div className="my-4 mt-2 md:mb-8">
            <p className="mb-2 text-xs">
              INTJ, curious by nature, focused on making things useful.
            </p>
            <p>
              I’m a software engineer, entrepreneur, and teacher who enjoys
              turning ambitious ideas into useful products. I specialize in
              building thoughtful frontend experiences and reliable full-stack
              systems with technologies like Angular, React, Vue, Node.js, Java
              and more.
            </p>
          </div>
          <LinkButton href={`mailto:${CONTACT_EMAIL}`}>Contact me!</LinkButton>
        </div>
        <a
          href="#whoami"
          className="group link-outline absolute bottom-14 left-1/2 hidden -translate-x-1/2 transform flex-col items-center animate-bounce md:flex lg:bottom-16"
        >
          <span className="group-hover:text-marrsgreen dark:group-hover:text-carrigreen">
            Scroll
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="dark:fill-bglight group-hover:fill-marrsgreen dark:group-hover:fill-carrigreen"
          >
            <path d="M11.975 22H12c3.859 0 7-3.14 7-7V9c0-3.841-3.127-6.974-6.981-7h-.06C8.119 2.022 5 5.157 5 9v6c0 3.86 3.129 7 6.975 7zM7 9a5.007 5.007 0 0 1 4.985-5C14.75 4.006 17 6.249 17 9v6c0 2.757-2.243 5-5 5h-.025C9.186 20 7 17.804 7 15V9zM11 6h2v6h-2z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="dark:fill-bglight group-hover:fill-marrsgreen dark:group-hover:fill-carrigreen"
          >
            <path d="m16.293 9.293-4.293 4.293-4.293-4.293-1.414 1.414L12 16.414l5.707-5.707z" />
          </svg>
        </a>
      </div>
    </section>
  );
};
export default HeroSection;
