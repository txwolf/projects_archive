import Link from "next/link";
import Container from "./container";
import { GithubIcon } from "./icons/github";
import { Logo } from "./icons/logo";
import { SlackIcon } from "./icons/slack";
import { TwitterIcon } from "./icons/twitter";

const footerLinks = [
  {
    title: "Product",
    links: [
      { title: "Features", href: "#" },
      { title: "Integrations", href: "#" },
      { title: "Pricing", href: "#" },
      { title: "Changelog", href: "#" },
      { title: "Docs", href: "#" },
      { title: "Linear Method", href: "#" },
      { title: "Download", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About us", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Brand", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { title: "Community", href: "#" },
      { title: "Contact", href: "#" },
      { title: "DPA", href: "#" },
      { title: "Terms of service", href: "#" },
    ],
  },
  {
    title: "Developers",
    links: [
      { title: "API", href: "#" },
      { title: "Status", href: "#" },
      { title: "GitHub", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-transparent-white py-[5.6rem] mt-12 text-sm">
      <Container className="flex flex-col justify-between lg:flex-row">

        <div>
          <div className="flex flex-row justify-between h-full lg:flex-col">
            <div className="flex items-center text-grey">
              <Logo className="w-4 h-4 mr-4" /> Linear - Designed worldwide
            </div>
            <div className="flex mt-auto space-x-4 text-grey">
              <TwitterIcon />
              <GithubIcon />
              <SlackIcon />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          {footerLinks.map((column) => (
            <div className="lg:min-w-[18rem] min-w-[50%] mt-10 lg:mt-0">
              <h3 className="mb-3 font-medium">{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.title} className='mb-3 last:mb-0'>
                    <Link className="block transition-colors text-grey hover:text-white" href={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </Container>
    </footer>
  );
};

export default Footer;