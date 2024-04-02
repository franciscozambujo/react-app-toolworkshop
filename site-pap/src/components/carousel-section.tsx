import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";

export function carouselMain() {
  const img1 = new URL("@/public/images/carousel/1.jpg", import.meta.url).href;
  const img2 = new URL("@/public/images/carousel/2.jpg", import.meta.url).href;

  const images = [
    {
      src: img1,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam asperiores repellat aliquam facilis laborum quia expedita, eligendi totam facere suscipit delectus incidunt ducimus non voluptatem harum corrupti repudiandae! Provident dolorem vitae nostrum. Quo ipsa veniam qui laboriosam doloremque modi deleniti autem possimus impedit enim sapiente, dolorem alias iure deserunt aut."
    },
    {
      src: img2,
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam asperiores repellat aliquam facilis laborum quia expedita, eligendi totam facere suscipit delectus incidunt ducimus non voluptatem harum corrupti repudiandae! Provident dolorem vitae nostrum. Quo ipsa veniam qui laboriosam doloremque modi deleniti autem possimus impedit enim sapiente, dolorem alias iure deserunt aut."
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[Autoplay({ delay: 6000 })]}
      orientation="horizontal"
      style={{ pointerEvents: "none" }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="flex justify-center relative">
              <div className="w-[900px]">
                <img
                  src={image.src}
                  alt={`Carousel Image ${index + 1}`}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="absolute font-bold flex justify-center rounded bg-slate-400 max-w-lg bottom-28">
                {image.text}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
