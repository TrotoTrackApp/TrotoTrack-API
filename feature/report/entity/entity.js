class ReportCore {
  constructor(
    id,
    location,
    referenceLocation,
    latitude,
    longitude,
    image,
    description,
    userId
  ) {
    this.id = id;
    this.location = location;
    this.referenceLocation = referenceLocation;
    this.latitude = latitude;
    this.longitude = longitude;
    this.image = image;
    this.description = description;
    this.userId = userId;
  }
}

module.exports = ReportCore;
