import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";

export function carouselMain() {
  const images = [
    {
      src: "./img/carousel/1.jpg",
      text: "Lorem iiosam esse totam unde quas omnis quibusdam magni iste adipisci qui fac aliquid eligendi optio repellendus sit!",
    },
    {
      src: "./img/carousel/2.jpg",
      text: "Lorem iiosam esse totam unde quas omnis quibusdam magni iste adipisci qui fac aliquid eligendi optio repellendus sit!",
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[Autoplay({ delay: 4000 })]}
      orientation="horizontal"
      style={{ pointerEvents: "none" }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="flex justify-center relative">
            <div className="w-[900px]">
                <img
                  src={image.src}
                  alt={`Carousel Image ${index + 1}`}
                  className="rounded-md object-cover"
                />
            </div>
            <div className="absolute font-bold flex justify-center rounded bg-slate-400 max-w-screen-xl bottom-28">
              {image.text}
              <Button>Button</Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}