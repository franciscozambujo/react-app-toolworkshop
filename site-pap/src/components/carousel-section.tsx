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
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <img
              src={image}
              alt={`Carousel Image ${index + 1}`}
              className="rounded-lg blur-sm"
            />
            <div className="absolute font-bold flex justify-center h-full">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
              alias velit ut sit et. Soluta rem, animi fuga neque eaque corporis
              officia ncd <s>
                </s>atus eveniet atque laborum illum aspernatur excepturi
              incidunt.
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}