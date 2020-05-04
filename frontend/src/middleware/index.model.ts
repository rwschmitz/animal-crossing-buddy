export interface GetAllDocumentsFromCollectionParams {
  dbName: string;
  collectionName: string;
}

export interface GetDocumentsByQueryFromCollectionParams {
  dbName: string;
  collectionName: string;
  queryField: string;
  queryValue: string;
}

export interface AddOneDocumentToCollectionParams {
  dbName: string;
  collectionName: string;
  queryField: string;
  queryValue: string;
}

export interface UpdateDocumentParams {
  dbName: string;
  collectionName: string;
  queryField: string;
  queryValue: string;
}

export interface FindDocumentAndUpdateDocumentParams {
  dbName: string;
  collectionName: string;
  queryField: string;
  queryValue: string;
  island: {
    villagerName: string;
    islandName: string;
    islandNativeFruit: string;
  };
}
