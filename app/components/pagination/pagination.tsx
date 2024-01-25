'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '../ui/pagination';

export default function PaginationComponent({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="p-10">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? createPageURL(currentPage - 1) : ''}
            />
          </PaginationItem>
          {currentPage > 2 && (
            <>
              <PaginationItem>
                <PaginationLink href={createPageURL(1)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}
          {currentPage === 1 ? (
            <>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={createPageURL(2)}>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={createPageURL(3)}>3</PaginationLink>
              </PaginationItem>
            </>
          ) : (
            <>
              {currentPage === totalPages && (
                <PaginationItem>
                  <PaginationLink href={createPageURL(currentPage - 2)}>
                    {currentPage - 2}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={createPageURL(currentPage - 1)}>
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={'#'} isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              {currentPage + 1 <= totalPages && (
                <PaginationItem>
                  <PaginationLink href={createPageURL(currentPage + 1)}>
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
            </>
          )}
          {totalPages > currentPage + 1 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={createPageURL(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <PaginationItem>
            <PaginationNext
              href={
                currentPage < totalPages ? createPageURL(currentPage + 1) : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
