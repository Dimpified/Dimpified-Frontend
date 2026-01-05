import { Fragment } from "react";
import { Link } from "react-router-dom";
import FooterLogo from "../../pages/LandingPages/images/dimp-blue.png";

import { footerAgentDefaultLink } from "../../data/affliateData/footerAgentDefaultLink";
import { Heading, Text, TextSpan } from "../Text";

const Footer = () => {
  return (
    <Fragment>
      <footer className="bg-gray-200 text-black pt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and description */}
            <div className="mb-8 text-center sm:text-left">
              <img
                src={FooterLogo}
                alt="Footer Logo"
                className="mx-auto sm:mx-0"
                width="100"
                height="50"
              />
              <Text className="mt-4 text-sm">
                Dimpified is an Ecosystem management platform that allows you to
                create, manage, and monetize your ecosystem.
              </Text>
            </div>

            {/* Company Links */}
            <div className="mb-8">
              <Heading
                level="3"
                className="mb-3"
                size=""
                color="black"
                weight="font-bold"
                font="font-body"
                lineHeight="leading-1"
              >
                Company
              </Heading>

              <ul className="space-y-2">
                {footerAgentDefaultLink.slice(0, 3).map((item) => (
                  <li key={item.id}>
                    <Link to={item.link} className="text-black hover:underline">
                      {item.linkName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="mb-8">
              <Heading
                level="3"
                className="mb-3"
                size=""
                color="black"
                weight="font-bold"
                font="font-body"
                lineHeight="leading-1"
              >
                Support
              </Heading>

              <ul className="space-y-2">
                {footerAgentDefaultLink.slice(3).map((item) => (
                  <li key={item.id}>
                    <Link to={item.link} className="text-black hover:underline">
                      {item.linkName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="mb-8">
              <Heading
                level="3"
                className="mb-3"
                size=""
                color="black"
                weight="font-bold"
                font="font-body"
                lineHeight="leading-1"
              >
                Get in touch
              </Heading>

              <Text>Ogun Tech Hub, Abeokuta</Text>
              <Text className="mb-1">
                Email: <Link to="#">info@dimpified.com</Link>
              </Text>
              <Text>
                Phone:{" "}
                <TextSpan className="font-semibold">+234 808 009 4426</TextSpan>
              </Text>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="border-t mt-6 py-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <TextSpan>©2024 Dimp. All Rights Reserved</TextSpan>
            </div>
            <div className="mt-4 md:mt-0">
              <nav className="flex justify-center md:justify-end space-x-4">
                <Link className="text-black hover:underline" to="#">
                  Privacy Policy
                </Link>
                <Link className="text-black hover:underline" to="#">
                  Cookie Notice
                </Link>
                <Link
                  className="text-black hover:underline hidden lg:inline-block"
                  to="#"
                >
                  Do Not Sell My Personal Information
                </Link>
                <Link className="text-black hover:underline" to="#">
                  Terms of Use
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
