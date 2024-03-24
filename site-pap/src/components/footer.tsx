export function footer() {
  return (
    <footer className="bg-green-500 text-black p-4">
      <div className="container mx-auto text-center">
        <p>
          Copyright © {new Date().getFullYear()} Francisco Zambujo. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
