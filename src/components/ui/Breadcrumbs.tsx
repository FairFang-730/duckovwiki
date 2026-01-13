import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center text-xs font-mono text-neutral-500 space-x-2 uppercase tracking-wider">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <React.Fragment key={item.label}>
                        {index > 0 && <span className="text-neutral-700">/</span>}
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="hover:text-yellow-500 transition-colors duration-200 whitespace-nowrap"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={`
                                    ${isLast ? "text-yellow-500/70" : ""}
                                    block max-w-[150px] md:max-w-[300px] lg:max-w-[400px] truncate
                                `}
                                title={item.label}
                            >
                                {item.label}
                            </span>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}
