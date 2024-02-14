import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"


export function carouselMain() {
  const images = [
    "IMAGEM FRENTE BLUR",
    "IMAGEM ANGULO 2 BLUR",
    "IMAGEM ANGULO 3 BLUR",
  ];

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay:4000,
        })
      ]}
      orientation="horizontal"
      className="w-full"
    >
      <CarouselContent className="-mt-1 h-[700px] flex items-center">
        {images.map((index) => (
          <CarouselItem >
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <h1>{`${index + 1}`}</h1>
                  {/*meter imagem com BLUR e texto por cima da imagem ao centro baixo*/}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}