export default function Footer() {
  return (
    <footer className="text-[12px] flex flex-col gap-[25px] justify-center items-center p-[20px]">
      <nav>
        <ul className="flex gap-[20px]">
          <li>
            <a href="/">Log In</a>
          </li>
          <li>
            <a href="/">About Us</a>
          </li>
          <li>
            <a href="/">Publishers</a>
          </li>
          <li>
            <a href="/">Sitemap</a>
          </li>
        </ul>
      </nav>
      <div>
        <p className="mb-[8px] mt-0">Powered by</p>
        <img
          src="/src/assets/api-logo.svg"
          alt="api logo"
          width={84}
          height={25}
        />
      </div>
      <p>© 2023 Besider. Inspired by Insider</p>
    </footer>
  );
}
