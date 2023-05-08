const argv = require("yargs").argv;

const contactsService = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getAll":
      const allContacts = await contactsService.getAllContacts();
      return console.table(allContacts);

    case "getById":
      const oneContact = await contactsService.getContactById(id);
      return console.table(oneContact);

    case "add":
      const newContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      return console.table(newContact);

    case "remove":
      const deletedContact = await contactsService.removeContact(id);
      return console.table(deletedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
