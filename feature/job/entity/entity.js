class JobCore {
  constructor(id, name, nik, address, phone, file, idUser, createdAt) {
    this.id = id;
    this.name = name;
    this.nik = nik;
    this.address = address;
    this.phone = phone;
    this.file = file;
    this.idUser = idUser;
    this.createdAt = createdAt;
  }
}

module.exports = JobCore;
