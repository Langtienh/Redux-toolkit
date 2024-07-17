import Link from "next/link";

const pages = [
  { label: "home", link: "/" },
  { label: "builder", link: "/builder" },
  { label: "slice", link: "/slice" },
  { label: "thunk", link: "/thunk" },
];

export default function Nav() {
  return (
    <div className="h-16 bg-slate-600">
      <div className="h-full w-full max-w-[1200px] mx-auto flex justify-between items-center">
        {pages.map((item) => (
          <Link
            className="flex-1 text-center text-white font-bold uppercase group"
            key={item.label}
            href={item.link}
          >
            <span className="group-hover:border-b-2 ease-linear">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
