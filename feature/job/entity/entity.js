class JobCore {
  constructor(id, name, nik, address, phone, file, createdAt) {
    this.id = id;
    this.name = name;
    this.nik = nik;
    this.address = address;
    this.phone = phone;
    this.file = file;
    this.createdAt = createdAt;
  }
}

module.exports = JobCore;
