const azure = require("azure-storage");

const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const STORAGE_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY;

const create_blob_service = () => {
  return azure.createBlobService(STORAGE_ACCOUNT_NAME, STORAGE_ACCESS_KEY);
};

module.exports = create_blob_service;
