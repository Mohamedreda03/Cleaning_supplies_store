import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  const session = await auth();
  const links = [
    { href: "/", label: "الرئيسية" },
    { href: "/products", label: "المنتجات" },
  ];

  return (
    <div className="bg-blue-400">
      <footer>
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
          <div className={cn("grid grid-cols-1 gap-8 lg:grid-cols-3")}>
            <div>
              <div className="text-teal-600 h-16 w-52 relative">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  // fill
                  height={64}
                  width={180}
                  className="object-cover"
                />
              </div>

              <p className="mt-4 max-w-xs text-white">
                هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما
                سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع
                الفقرات في الصفحة التي يقرأها.
              </p>

              <ul className="mt-8 flex gap-6">
                <li>
                  <Link href="#" rel="noreferrer" target="_blank">
                    <span className="sr-only">Instagram</span>

                    <Image
                      src="/icons/instagram.svg"
                      width={30}
                      height={30}
                      alt="Instagram"
                      className="transition hover:opacity-75"
                    />
                  </Link>
                </li>

                <li>
                  <Link href="#" rel="noreferrer" target="_blank">
                    <span className="sr-only">Snapchat</span>

                    <Image
                      src="/icons/snapchat.svg"
                      width={30}
                      height={30}
                      alt="Snapchat"
                      className="transition hover:opacity-75"
                    />
                  </Link>
                </li>

                <li>
                  <Link href="#" rel="noreferrer" target="_blank">
                    <span className="sr-only">Tiktok</span>

                    <Image
                      src="/icons/tiktok.svg"
                      width={30}
                      height={30}
                      alt="Tiktok"
                      className="transition hover:opacity-75"
                    />
                  </Link>
                </li>

                <li>
                  <Link href="#" rel="noreferrer" target="_blank">
                    <span className="sr-only">linktree</span>

                    <Image
                      src="/icons/linktree.svg"
                      width={30}
                      height={30}
                      alt="linktree"
                      className="transition hover:opacity-75"
                    />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
              <div>
                <p className="font-medium text-white">الروابط</p>

                <ul className="mt-6 space-y-4 text-sm">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition text-white hover:text-blue-100 text-lg"
                      >
                        {" "}
                        {link.label}{" "}
                      </Link>
                    </li>
                  ))}
                  {!session?.user && (
                    <li>
                      <Link
                        href="/sign-in"
                        className="transition text-white hover:text-blue-100 text-lg"
                      >
                        تسجيل الدخول
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()}. Billa Sweet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
