export function ContactSection() {
  return (
    <div>
      <div className="flex justify-center font-medium mt-10 text-4xl">
          Contactos
        </div>
        <div className="flex justify-around mt-10">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.9439891988923!2d-7.917341323667377!3d38.55810426665199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19e58f6ea3aedd%3A0xb762603e2c5f386!2sOficina%20Repara%C3%A7%C3%A3o%20Autom%C3%B3vel%20Fernando%20Costa%20Fialho!5e0!3m2!1spt-PT!2spt!4v1710706867041!5m2!1spt-PT!2spt"
              width="1000"
              height="425"
              loading="lazy"
              title="contact-map"
            />
          </div>
          <div className="font-bold rounded text-lg place-content-center">
            <p>Contacto: 266 707 212</p>
            <a href="mailto:fernandofialho@gmail.com">
              Email: Fernando Costa Fialho
            </a>
        </div>
      </div>
    </div>
  );
}
