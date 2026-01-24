export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Space Flow",
  description:
    "Тут вы можете найти информацию о арендующихся объектах на ваш вкус и цвет. Приятного пользования!",
  navItems: [
    {
      label: "Главная",
      href: "/",
    },
    {
      label: "Каталог",
      href: "/items",
    },
    {
      label: "Карта",
      href: "/map",
    },
    {
      label: "Регистрация",
      href: "/sign-up",
    },
    {
      label: "Авторизация",
      href: "/sign-in",
    },
    {
      label: "сh-p",
      href: "/change-password",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
