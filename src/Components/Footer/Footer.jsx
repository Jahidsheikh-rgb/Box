import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-10">

        {/* ================= BRANDING ================= */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-indigo-500"
            >
              <path d="M22.672 15.226l-2.432.811... (truncated for brevity)"/>
            </svg>
            <span className="text-2xl font-bold text-white">ACME Industries</span>
          </div>
          <p className="text-gray-400">
            Providing reliable tech solutions since 1992
          </p>
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

        {/* ================= NAVIGATION ================= */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* ================= SOCIAL ICONS ================= */}
        <div className="flex gap-4">
  {/* Twitter */}
  <a
    href="#"
    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      className="fill-current"
    >
      <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775
        1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184
        -.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917
        0 .39.045.765.127 1.124-4.087-.205-7.713-2.164-10.141-5.144
        -.424.728-.666 1.57-.666 2.475 0 1.708.87 3.215 2.188 4.099
        -.807-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827
        -.413.112-.849.171-1.296.171-.317 0-.626-.03-.927-.086
        .627 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04
        2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646
        .961-.695 1.796-1.562 2.457-2.549z" />
    </svg>
  </a>

  {/* YouTube */}
  <a
    href="#"
    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      className="fill-current"
    >
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0
        -3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816
        3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816
        -.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
    </svg>
  </a>

  {/* Facebook */}
  <a
    href="#"
    className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      className="fill-current"
    >
      <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351
        c0 .732.592 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128
        v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24
        l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622
        h-3.12v9.293h6.116c.732 0 1.324-.592 1.324-1.325v-21.35
        c0-.733-.592-1.325-1.324-1.325z"/>
    </svg>
  </a>
</div>

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
        Built with Bow nai company by jahid
      </div>
    </footer>
  );
};

export default Footer;
