export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* About Section */}
        <div className="flex-1 max-w-sm">
          <h3 className="text-lg font-semibold mb-3 text-white">AWS Cloud Club KIET</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Join 100+ other tech enthusiasts and make the best connections in KIET GROUP OF INSTITUTIONS.
          </p>
        </div>

        {/* Contact Section */}
        <div className="flex-1 max-w-sm">
          <h4 className="text-md font-semibold mb-3 text-white">CONTACT</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="tel:+919557915111"
                className="hover:text-[#FF9900] transition"
              >
                +91 9557915111
              </a>
            </li>
            <li>
              <a
                href="mailto:awscloudclubkiet@gmail.com"
                className="hover:text-[#FF9900] transition"
              >
                awscloudclubkiet@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Credits */}
      <div className="border-t border-gray-700 py-5 text-center text-sm text-gray-400">
        Developed with <span className="text-red-500">❤️</span> by{" "}
        <a
          href="https://www.linkedin.com/in/rachit-agarwal-a52924282/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF9900] hover:underline"
        >
          Rachit Agarwal
        </a>{" "}
        and{" "}
        <a
          href="https://www.linkedin.com/in/raunak-kushwaha-1b22372a8/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FF9900] hover:underline"
        >
          Raunak Kushwaha
        </a>
      </div>
    </footer>
  );
}
