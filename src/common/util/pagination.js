const pagination = (page, limit) => {
  let offset = 0;
  let newPage = page;
  if (newPage <= 0) {
    newPage = 1;
  } else {
    offset = (newPage - 1) * limit;
  }
  return { offset, limit };
};

module.exports = { pagination };
