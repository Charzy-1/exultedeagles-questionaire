export interface ResponseType {
  _id: string; // Assuming `_id` is a string from your database
  [key: string]: string | number | boolean | null | undefined; // Define allowed types for additional properties
}
