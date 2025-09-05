// Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-3">AWS Cloud Club KIET</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Join 100+ other tech enthusiasts and make best connections in KIET GROUP OF INSTITUTIONS
          </p>
        </div>

        {/* About Links */}
        <div>
          <h4 className="text-md font-semibold mb-3">Events</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 transition"></a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Team</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Functioning</a></li>
          </ul>
        </div>

        {/* Projects */}
        <div>
          <h4 className="text-md font-semibold mb-3">PROJECTS</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600 transition">Web / Android</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">AI/ML</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">AR/VR</a></li>
          </ul>
        </div>


        {/* Contact */}
        <div>
          <h4 className="text-md font-semibold mb-3">CONTACT</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+918057226016" className="hover:text-blue-600 transition">+91 9557915111</a></li>
            <li><a href="mailto:nscckiet@gmail.com" className="hover:text-blue-600 transition">awscloudclub@gmail.com</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 py-5 text-center text-sm text-gray-500">
        Developed with <span className="text-red-500">❤️</span> by{" "}
        <a href="#" className="text-blue-600 hover:underline">Rachit Agarwal</a> and{" "}
        <a href="#" className="text-blue-600 hover:underline">Raunak Kushwaha</a>
      </div>
    </footer>
  )
}
