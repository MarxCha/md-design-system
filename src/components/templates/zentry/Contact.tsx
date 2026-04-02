"use client";

import Image from "next/image";

import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

interface ImageClipBoxProps {
  src: string;
  clipClass: string;
  alt: string;
}

const ImageClipBox = ({ src, clipClass, alt }: ImageClipBoxProps) => (
  <div className={clipClass}>
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-zn-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/templates/zentry/img/contact-1.webp"
            alt="Zentry contact scene 1"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/templates/zentry/img/contact-2.webp"
            alt="Zentry contact scene 2"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/templates/zentry/img/swordman-partial.webp"
            alt="Swordman partial"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/templates/zentry/img/swordman.webp"
            alt="Swordman"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Zentry
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            containerClass="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
