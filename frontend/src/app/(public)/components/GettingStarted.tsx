"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

function StepCard({
  stepNumber,
  title,
  description,
  imageSrc,
  imageAlt,
}: StepCardProps) {
  return (
    <div className="w-full flex-shrink-0 transform transition-all duration-700 ease-in-out mobile-sm:px-2 tablet-lg:px-0">
      <div className="group relative overflow-hidden rounded-3xl bg-white">
        <div className="absolute left-4 top-4 z-10 flex h-10 w-10 mobile-lg:h-12 mobile-lg:w-12 items-center justify-center rounded-full bg-green-600 font-bold text-lg mobile-lg:text-xl text-white shadow-md ring-4 ring-white">
          {stepNumber}
        </div>

        <div className="relative h-48 mobile-lg:h-56 tablet-lg:h-64 w-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 400px"
            priority={stepNumber === 1}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        <div className="flex flex-col justify-between p-4 mobile-lg:p-6 tablet-lg:p-8 pt-4 mobile-lg:pt-6">
          <div>
            <h3 className="mb-2 text-lg mobile-lg:text-xl tablet-lg:text-2xl font-bold text-[#464646]">
              {title}
            </h3>
            <p className="text-sm mobile-lg:text-base tablet-lg:text-lg leading-relaxed text-gray-600">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThreeStepSection() {
  const steps = [
    {
      stepNumber: 1,
      title: "Create Your Account",
      description:
        "Sign up in minutes with our simple registration process. Get instant access to our platform.",
      imageSrc: "/images/test12.jpg",
      imageAlt: "Account setup interface",
    },
    {
      stepNumber: 2,
      title: "Explore Our Platform",
      description:
        "Dive into our intuitive interface and discover powerful features tailored to your needs.",
      imageSrc: "/images/test12.jpg",
      imageAlt: "Platform dashboard",
    },
    {
      stepNumber: 3,
      title: "Achieve Your Goals",
      description:
        "Transform your workflow with our tools and see measurable results quickly.",
      imageSrc: "/images/test12.jpg",
      imageAlt: "Success metrics",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [steps.length, isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + steps.length) % steps.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % steps.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const goToStep = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <section
      className="w-full bg-gradient-to-br from-green-50 via-gray-50 to-green-50 rounded-[38px] py-12 mobile-lg:py-16 tablet-lg:py-24 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 mobile-lg:px-6 laptop-lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 mobile-lg:px-5 mobile-lg:py-2 text-xs mobile-lg:text-sm font-semibold uppercase tracking-wider text-green-800">
            How it works
          </span>
          <h2 className="mt-3 mobile-lg:mt-4 text-2xl mobile-lg:text-3xl tablet-lg:text-4xl laptop-lg:text-5xl font-bold tracking-tight text-[#464646]">
            Get Started in Three Simple Steps
          </h2>
          <p className="mt-4 mobile-lg:mt-6 text-base mobile-lg:text-lg tablet-lg:text-xl text-gray-600">
            Our streamlined process makes it easy to get up and running quickly.
          </p>
        </div>

        <div className="relative mt-12 mobile-lg:mt-16 tablet-lg:mt-20">
          <div className="flex justify-center overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out w-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="w-full flex-shrink-0 px-2"
                >
                  <StepCard {...step} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 mobile-lg:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 mobile-lg:p-3 rounded-full shadow-lg hover:bg-white transition-all"
            aria-label="Previous step"
          >
            <ChevronLeft className="w-5 h-5 mobile-lg:w-6 mobile-lg:h-6 text-gray-800" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 mobile-lg:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 mobile-lg:p-3 rounded-full shadow-lg hover:bg-white transition-all"
            aria-label="Next step"
          >
            <ChevronRight className="w-5 h-5 mobile-lg:w-6 mobile-lg:h-6 text-gray-800" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-6 mobile-lg:mt-8 space-x-2 mobile-lg:space-x-3">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToStep(index)}
                className={`w-2.5 h-2.5 mobile-lg:w-3 mobile-lg:h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-green-600 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
