import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function carouselMain() {
  const images = [
    {
      src: "./img/carousel/1.jpg",
      text: "1",
    },
    {
      src: "./img/carousel/2.jpg",
      text: "2",
    },
    {
      src: "./img/carousel/1.jpg",
      text: "3",
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
          <CarouselItem key={index} className="flex justify-center">
            <img
              src={image.src}
              alt={`Carousel Image ${index + 1}`}
              className="rounded-lg blur-sm"
            />
            <div className="absolute font-bold flex justify-center w-full">
              {image.text}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}