import Image from "@/components/shared/Image/Image";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const socialLinks = [
	{
		name: "Telegram",
		icon: <FaTelegramPlane />,
		link: "https://web.telegram.org/",
	},
	{
		name: "Instagram",
		icon: <FaInstagram />,
		link: "https://www.instagram.com/",
	},
	{ name: "TikTok", icon: <FaTiktok />, link: "https://www.tiktok.com/" },
	{
		name: "YouTube",
		icon: <FaYoutube />,
		link: "https://www.youtube.com/",
	},
];

const legal = [
	{
		name: "Privacy Policy",
		link: "https://web.telegram.org/",
	},
	{
		name: "Brands",
		link: "https://web.telegram.org/",
	},
	{
		name: "Terms",
		link: "https://web.telegram.org/",
	},
];
const Footer = () => {
	return (
		<footer className="bg-appLightBlack pt-10">
			<div className="w-[90%] mb-7 mx-auto">
				<div className="line "></div>
			</div>
			<div className="p-8 flex px-80 text-white">
				<div className="w-1/2 ">
					<div className="w-60">
						<Image url="/images/Logo.png" alt="Logo" />
					</div>
				</div>
				<div className="w-1/2 flex justify-between">
					<div>
						<h3 className="text-xl mb-2">Social Media</h3>
						<ul>
							{socialLinks.map((link, index) => (
								<li key={index}>
									<a
										className="flex items-center text-base gap-2 transition-all hover:text-orange "
										target="_blank"
										href={link.link}
									>
										{link.icon}
										<span>{link.name}</span>
									</a>
								</li>
							))}
						</ul>
					</div>
					<div>
						<div className="flex gap-2 items-center text-xl mb-2">
							<IoIosMail />
							<h3>Contact us</h3>
						</div>
						<ul>
							<li className="text-sm">
								<p>General:</p>
								<a className="underline ">example@gmail.com</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-xl mb-2">Legal</h3>
						<ul>
							{legal.map((link, index) => (
								<li key={index}>
									<a
										className="flex items-center text-base gap-2 transition-all hover:text-orange "
										target="_blank"
										href={link.link}
									>
										<span>{link.name}</span>
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
