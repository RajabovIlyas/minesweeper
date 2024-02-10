

const Footer = () => {

  return (
    <div className="max-w-screen-xl mx-auto sticky top-[100vh] ">
      <footer className="p-5">
        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Minesweeper.
        </p>
        <p className="text-center text-xs text-slate-500 mt-1">
          Made by &nbsp;
          <a href="https://github.com/RajabovIlyas"
             className="hover:underline" target="_blank">
            Raj Ilyas
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Footer;
