import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";

import { BsMotherboard, BsCpu, BsPower, BsMemory, BsDeviceHdd } from 'react-icons/bs';
import { CiMonitor } from 'react-icons/ci';

import menuImg from "@/assets/navbar/menu.png"
import avatar from "@/assets/navbar/avatar.png"

import Link from "next/link"
import Image from "next/image"


// profile menu component
const profileMenuItems = [
  { label: "My Profile", icon: UserCircleIcon, href: "/profile" },
  { label: "Sign Out", icon: PowerIcon },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { data: session } = useSession();
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Image
            src={session?.user?.image || avatar}
            width={55}
            height={55}
            alt="User Avatar"
            className="border border-blue-500 p-0.5 h-[55px] w-[55px] rounded-full"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon: Icon, href }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;

          if (!session && isLastItem) {
            return (
              <MenuItem
                key={label}
                onClick={closeMenu}
                className="rounded hover:bg-green-500/10 focus:bg-green-500/10 active:bg-green-500/10"
              >
                <Link href="/api/auth/signin" className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-green-500" strokeWidth={2} />
                  <Typography as="span" variant="small" className="font-normal" color="green">
                    Sign In
                  </Typography>
                </Link>
              </MenuItem>
            );
          }

          if (session && isLastItem) {
            return (
              <MenuItem
                key={label}
                onClick={() => signOut()}
                className="rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-red-500" strokeWidth={2} />
                  <Typography as="span" variant="small" className="font-normal" color="red">
                    {label}
                  </Typography>
                </div>
              </MenuItem>
            );
          }

          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`rounded ${isLastItem ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""}`}
            >
              <Link href={href} className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${isLastItem ? "text-red-500" : ""}`} strokeWidth={2} />
                <Typography as="span" variant="small" className="font-normal" color={isLastItem ? "red" : "inherit"}>
                  {label}
                </Typography>
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list menu
const navListMenuItems = [
  {
    title: "CPU/Processor",
    icon: <BsCpu />,
    href: '/products/CPU'
  },
  {
    title: "Motherboard",
    icon: <BsMotherboard />,
    href: '/products/Motherboard'
  },
  {
    title: "Power Supply Unit",
    icon: <BsPower />,
    href: '/products/PowerSupplyUnit'
  },
  {
    title: "RAM",
    icon: <BsMemory />,
    href: '/products/RAM'
  },
  {
    title: "Storage",
    icon: <BsDeviceHdd />,
    href: '/products/Storage'
  },
  {
    title: "Monitor",
    icon: <CiMonitor />,
    href: '/products/Monitor'
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ title, icon, href }) => (
    <Link href={href} key={title}>
      <MenuItem>
        <Typography color="blue-gray" className="mb-1 flex items-center gap-2 font-semibold text-sm">
          {icon} {title}
        </Typography>
      </MenuItem>
    </Link>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Categories{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <Image src={menuImg} alt="image" className="h-full w-full" />
          </Card>
          <ul className="col-span-4 w-full flex-col gap-1 hidden lg:flex">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Categories{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden !text-sm">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Products",
    icon: CubeTransparentIcon,
    href: '/products'
  },
  {
    label: "PC Builder",
    icon: CodeBracketSquareIcon,
    href: '/builder'
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon, href }, key) => (
        <Link
          key={label}
          href={`/${href}`}
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full text-blue-gray-800">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            {label}
          </MenuItem>
        </Link>
      ))}
    </ul>
  );
}

const PcNavbar = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <Navbar className="mx-auto p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Link href="/" passHref>
          <Typography
            className="mr-4 ml-2 cursor-pointer py-1.5 font-bold text-blue-600"
          >
            PC BUILDER
          </Typography>
        </Link>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-hidden">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}


export default PcNavbar;