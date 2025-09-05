export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* About */}
        <div className="flex-1 max-w-sm">
          <h3 className="text-lg font-semibold mb-3">AWS Cloud Club KIET</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Join 100+ other tech enthusiasts and make best connections in KIET GROUP OF INSTITUTIONS
          </p>
        </div>

        {/* Contact */}
        <div className="flex-1 max-w-sm">
          <h4 className="text-md font-semibold mb-3">CONTACT</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:+918057226016" className="hover:text-blue-600 transition">
                +91 9557915111
              </a>
            </li>
            <li>
              <a href="mailto:nscckiet@gmail.com" className="hover:text-blue-600 transition">
                awscloudclub@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-5 text-center text-sm text-gray-500">
        Developed with <span className="text-red-500">❤️</span> by{" "}
        <a
          href="https://www.linkedin.com/in/rachit-agarwal-a52924282/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Rachit Agarwal
        </a>{" "}
        and{" "}
        <a
          href="https://www.linkedin.com/in/raunak-kushwaha-1b22372a8/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Raunak Kushwaha
        </a>
      </div>
    </footer>
  )
}
