import React from "react";
import Link from "next/link";
import Image from "next/image";
import LanguageSelect from "../common/LanguageSelect";
import { footerLinks4, socialLinks } from "@/data/footer";

export default function Footer5() {
  return (
    <footer id="uc-footer" className="uc-footer panel overflow-hidden uc-dark">
      <div className="footer-outer pb-4 lg:pb-6 dark:bg-gray-800 dark:text-white m-2 rounded-2 lg:rounded-3">
        <div className="uc-footer-content pt-6 lg:pt-8">
          <div className="container xl:max-w-xl">
            <div className="uc-footer-inner vstack gap-6 lg:gap-8 text-center">
              {/* Logo Section */}
              <div className="panel vstack items-center gap-3">
                <Link href={`/`} className="d-flex items-center gap-2">
                  <Image
                    className="text-primary"
                    alt="Mythydra"
                    src="/assets/images/common/icon.svg"
                    width="40"
                    height="40"
                  />
                  <span className="text-xl font-bold text-white">Mythydra</span>
                </Link>
                <p className="text-gray-300 max-w-md mx-auto">
                  Best all in one tool, providing the best experience and support for you.
                </p>
              </div>

              {/* Navigation Links */}
              <div className="panel">
                <ul className="nav-x justify-center gap-6 lg:gap-8 flex-wrap text-gray-300">
                  <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link href="#terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                  <li><Link href="https://discord.gg/3PJBYpJeWP" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="https://discord.gg/3PJBYpJeWP" className="hover:text-white transition-colors">Support</Link></li>
                </ul>
              </div>

              {/* Social Links */}
              <div className="panel">
                <ul className="nav-x justify-center gap-4 text-gray-300">
                  {socialLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="hover:text-white transition-colors">
                        <i className={`icon icon-2 ${link.iconClass}`} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Copyright */}
              <div className="panel pt-4 border-top border-gray-700">
                <p className="opacity-60 text-sm">
                  © 2025 Mythydra. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
