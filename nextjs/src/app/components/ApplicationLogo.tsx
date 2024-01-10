import Image from "next/image";

export default function ApplicationLogo({ width = 100 }) {
  return (
    <Image
      src="/logo.png"
      alt="Trading Logo"
      className="dark:invert"
      width={width}
      height={24}
      priority
    />
  );
}
