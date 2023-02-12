const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    console.log(JSON.parse(contacts));
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const [contactById] = JSON.parse(contacts).filter(
      (contact) => Number(contact.id) === Number(contactId)
    );
    console.log(contactById);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const index = parsedContacts.findIndex(
      (contact) => Number(contact.id) === Number(contactId)
    );
    parsedContacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
    const newContacts = await fs.readFile(contactsPath, "utf-8");
    console.log(JSON.parse(newContacts));
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const newContact = [
      {
        id: uuidv4(),
        name,
        email,
        phone,
      },
    ];

    await fs.writeFile(
      contactsPath,
      JSON.stringify([...JSON.parse(contacts), ...newContact])
    );

    const newContacts = await fs.readFile(contactsPath, "utf-8");
    console.log(JSON.parse(newContacts));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
