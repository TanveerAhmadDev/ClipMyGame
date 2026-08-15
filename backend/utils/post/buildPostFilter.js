const buildPostFilter = ({
  sport,
  contentType,
  skill,
  level,
  countryCode,
  stateCode,
  city,
}) => {
  const filter = {};

  if (sport) {
    filter.sport = sport;
  }

  if (contentType) {
    filter.contentType = contentType;
  }

  if (skill) {
    filter.skills = skill;
  }

  if (level) {
    filter.level = level;
  }

  if (countryCode) {
    filter["location.countryCode"] = countryCode;
  }

  if (stateCode) {
    filter["location.stateCode"] = stateCode;
  }

  if (city) {
    filter["location.city"] = city;
  }

  return filter;
};

export default buildPostFilter;
