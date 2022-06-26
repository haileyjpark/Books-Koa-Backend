const pagination = (page, limit) => {
  let offset = 0;
  if (page <= 0) {
    return { offset, limit };
  }
  offset = (page - 1) * limit;
  return { offset, limit };
};

module.exports = { pagination };
