class ReportCore {
  constructor(
    id,
    location,
    referenceLocation,
    latitude,
    longitude,
    image,
    description
  ) {
    this.id = id;
    this.location = location;
    this.referenceLocation = referenceLocation;
    this.latitude = latitude;
    this.longitude = longitude;
    this.image = image;
    this.description = description;
  }
}

module.exports = ReportCore;
