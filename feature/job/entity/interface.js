class JobRepositoryInterface {
    async createJob(data, file) {
      throw new Error("Method not implemented");
    }
  
    async getJobById(id) {
      throw new Error("Method not implemented");
    }
  
    async getAllJob() {
      throw new Error("Method not implemented");
    }
  
    async updateJobById(id, updatedData, file) {
      throw new Error("Method not implemented");
    }
  
    async deleteJobById(id) {
      throw new Error("Method not implemented");
    }
  
    async getJobByTitle(title) {
      throw new Error("Method not implemented");
    }

    async getJobByNik() {
      throw new Error("Method not implemented");
    }
  }
  
  class JobServicesInterface {
    async createJob(data, file) {
      throw new Error("Method not implemented");
    }
  
    async getJobById(id) {
      throw new Error("Method not implemented");
    }
  
    async getAllJob() {
      throw new Error("Method not implemented");
    }
  
    async updateJobById(id, updatedData, file) {
      throw new Error("Method not implemented");
    }
  
    async deleteJobById(id) {
      throw new Error("Method not implemented");
    }
  }
  
  module.exports = { JobRepositoryInterface, JobServicesInterface };
  