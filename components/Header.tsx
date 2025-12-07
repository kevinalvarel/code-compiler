import CardNav from "@/components/ui/CardNav";

export function Header() {
  const items = [
    {
      label: "Bahasa",
      bgColor: "#0a1628",
      textColor: "#fff",
      links: [
        { label: "Python", ariaLabel: "Python Compiler", href: "" },
        { label: "JavaScript", ariaLabel: "JavaScript Compiler", href: "" },
        { label: "C++", ariaLabel: "C++ Compiler", href: "" },
        { label: "Java", ariaLabel: "Java Compiler", href: "" },
      ],
    },
    {
      label: "Tools",
      bgColor: "#0c1a2e",
      textColor: "#fff",
      links: [
        { label: "Code Editor", ariaLabel: "Online Code Editor", href: "" },
        { label: "Snippet Share", ariaLabel: "Share Code Snippets", href: "" },
        { label: "API Docs", ariaLabel: "API Documentation", href: "" },
      ],
    },
    {
      label: "Community",
      bgColor: "#0e1e34",
      textColor: "#fff",
      links: [
        { label: "Forum", ariaLabel: "Community Forum", href: "" },
        { label: "Examples", ariaLabel: "Code Examples", href: "" },
        { label: "Support", ariaLabel: "Get Support", href: "" },
      ],
    },
  ];

  return (
    <CardNav
      items={items}
      baseColor="#060606"
      menuColor="#ffffff"
      buttonBgColor="#ffffff"
      buttonTextColor="#000000"
      ease="power4.out"
      className="fixed z-50 w-full backdrop-blur-md bg-black/30"
    />
  );
}
