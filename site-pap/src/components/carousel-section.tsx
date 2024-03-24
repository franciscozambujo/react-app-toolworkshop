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
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id aliquid quo aliquam, doloribus ex quod expedita! Ad voluptatibus obcaecati aliquid impedit laboriosam esse totam unde quas omnis quibusdam magni iste adipisci qui facilis, magnam fugit aut illo laborum, incidunt libero. Fugit quibusdam hic mollitia veniam aliquid eligendi optio repellendus sit!",
    },
    {
      src: "./img/carousel/2.jpg",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Id aliquid quo aliquam, doloribus ex quod expedita! Ad voluptatibus obcaecati aliquid impedit laboriosam esse totam unde quas omnis quibusdam magni iste adipisci qui facilis, magnam fugit aut illo laborum, incidunt libero. Fugit quibusdam hic mollitia veniam aliquid eligendi optio repellendus sit!",
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[Autoplay({ delay: 500000 })]}
      orientation="horizontal"
      style={{ pointerEvents: "none" }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <img
              src={image.src}
              alt={`Carousel Image ${index + 1}`}
              className="rounded-lg"
            />
            <div className="absolute font-bold flex justify-center rounded bg-slate-400 max-w-screen-xl bottom-28">
              {image.text}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
