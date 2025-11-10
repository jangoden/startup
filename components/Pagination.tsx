import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const PaginationLink = ({
  href,
  children,
  isActive,
  isDisabled,
  className,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
}) => {
  const baseClasses =
    'flex items-center justify-center px-4 h-10 text-sm font-medium transition-colors duration-200';
  const activeClasses = 'z-10 bg-green-600 border-green-600 text-white';
  const defaultClasses = 'leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700';
  const disabledClasses = 'pointer-events-none text-gray-400 bg-gray-50';

  if (isDisabled) {
    return <span className={cn(baseClasses, defaultClasses, disabledClasses, className)}>{children}</span>;
  }

  return (
    <Link
      href={href}
      className={cn(baseClasses, isActive ? activeClasses : defaultClasses, className)}
    >
      {children}
    </Link>
  );
};

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    const ellipsis = '...';

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push(ellipsis);
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        start = 2;
        end = 4;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(ellipsis);
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Pagination">
      <ul className="inline-flex items-center -space-x-px text-sm">
        {pageNumbers.map((page, index) => (
          <li key={index}>
            {typeof page === 'number' ? (
              <PaginationLink
                href={`${basePath}?page=${page}`}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            ) : (
              <span className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300">
                {page}
              </span>
            )}
          </li>
        ))}
        <li>
          <PaginationLink
            href={`${basePath}?page=${currentPage + 1}`}
            isDisabled={currentPage >= totalPages}
            className="rounded-r-lg"
          >
            Next
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
}
