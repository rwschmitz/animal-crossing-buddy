export interface GetAllDocumentsFromCollectionParams {
  collectionName: string;
  dbName: string;
}

export interface GetDocumentsByQueryFromCollectionParams {
  collectionName: string;
  dbName: string;
  queryField: string;
  queryValue: string;
}

export interface AddOneDocumentToCollectionParams {
  collectionName: string;
  dbName: string;
  queryField: string;
  queryValue: string;
}

export interface UpdateDocumentParams {
  collectionName: string;
  dbName: string;
  queryField: string;
  queryValue: string;
}

export interface FindDocumentAndUpdateDocumentParams {
  collectionName: string;
  dbName: string;
  operator: string;
  queryField: string;
  queryValue: string;
  updateField: string;
  updateValue: unknown;
}
