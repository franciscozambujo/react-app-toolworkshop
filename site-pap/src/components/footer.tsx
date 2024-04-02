interface FooterProps {
  links: {
    label: string;
    href: string;
  }[];
}
import imgHeader from "@/public/images/header.png"
export function Footer(props: FooterProps) {
  const { links } = props;
  return (
    <footer className="bg-green-200 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 text-center md:text-left">
            <img src={imgHeader} className="size-3/4" />
            <p className="">©2024 Fernando Costa Fialho, All Rights Reserved.</p>
          </div>
          <div className="w-full md:w-3/4">
            <div className="flex flex-wrap">
              {links.map((link, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/4 text-center md:text-left mb-4 md:mb-0"
                >
                  <a
                    href={link.href}
                    className="inline-block hover:text-green-600"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}