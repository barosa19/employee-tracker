const sortOptions = (options) => {
  const option = options.options;
  switch (option) {
    case "view all departments":
      console.log("function works1");
      break;
    case "view all roles":
      console.log("function works2");
      break;
    case "view all employees":
      console.log("function works3");
      break;
    case "add a department":
      console.log("function works4");
      break;
    case "add a role":
      console.log("function works5");
      break;
    case "add an employee":
      console.log("function works6");
      break;
    case "update an employee role":
      console.log("function works7");
      break;
  }
};

module.exports = sortOptions;
