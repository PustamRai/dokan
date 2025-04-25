import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-50 py-6 mt-10 max-w-[1400px] mx-auto">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p>&copy; {new Date().getFullYear()} Dokan. All rights reserved.</p>
        <p className="text-[10px]">
          Designed & Developed by:{" "}
          <a href="https://www.linkedin.com/in/pustamrai">
            {" "}
            <b className="underline hover:no-underline cursor-pointer">
              Pustam Rai
            </b>{" "}
          </a>
        </p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
