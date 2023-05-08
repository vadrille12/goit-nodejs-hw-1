const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const getContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();

  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
};

const addContact = async (data) => {
  const contacts = await getContacts();

  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const deleteContact = async (contactId) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;

  const [deletedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return deletedContact;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
};
