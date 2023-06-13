import { Document, PaginateModel, PaginateOptions, PaginateResult } from 'mongoose';

export interface PaginationResult<T extends Document> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export const paginateModel = async <T extends Document>(
  model: PaginateModel<T>,
  query: any,
  options: PaginateOptions
): Promise<PaginationResult<T>> => {
  const result: PaginateResult<T> = await model.paginate(query, options);

  return {
    docs: result.docs,
    totalDocs: result.totalDocs,
    limit: result.limit,
    totalPages: result.totalPages,
    page: result.page,
    pagingCounter: result.pagingCounter,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
  };
};
