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
    <footer className="bg-green-200 p-4">
      <div className="">
        <div className="">
          <div className="text-center md:text-left">
            <img src={imgHeader} className="w-full md:w-1/4" />
            <p className="">©2024 Fernando Costa Fialho, All Rights Reserved.</p>
          </div>
          <hr className="border-black"/>
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