import mongoose from "mongoose";
export class CommonMDBRepository {
  constructor(collectionName, docSchema) {
    this.baseModel = mongoose.model(collectionName, docSchema);
  }

  async getAll() {
    const allDocs = await this.baseModel.find({});
    return allDocs;
  }

  async getOneById(id) {
    const oneDoc = await this.baseModel.findById(id);
    return oneDoc;
  }

  async existsByCriteria(criteria) {
    const found = await this.baseModel.exists(criteria);
    return found;
  }

  async getOneByCriteria(criteria) {
    const found = await this.baseModel.findOne(criteria);
    return found;
  }

  async create(doc) {
    const newDoc = await this.baseModel.create(doc);
    return newDoc;
  }

  async update(id, doc) {
    await this.baseModel.findByIdAndUpdate(id, doc);
    const docUpdated = await this.baseModel.findById(id);
    return docUpdated;
  }

  async delete(id) {
    const deletedDoc = await this.baseModel.findByIdAndDelete(id);
    return deletedDoc;
  }
}
