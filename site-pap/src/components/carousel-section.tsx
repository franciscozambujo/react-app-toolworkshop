import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function carouselMain() {
  const images = [
    "./img/carousel/1.jpg",
    "./img/carousel/1.jpg",
    "./img/carousel/1.jpg",
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[Autoplay({ delay: 4000 })]}
      orientation="horizontal"
      style={{ pointerEvents: 'none' }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <img
              src={image}
              alt={`Carousel Image ${index + 1}`}
              className="rounded-lg"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
