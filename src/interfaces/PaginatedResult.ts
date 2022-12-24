export default interface PaginatedResult<T> {
  data: T[];
  totalPages: number;
  totalDocs: number;
  page: number;
  limit: number;
}