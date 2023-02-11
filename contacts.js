const fs = require("fs").promises;
const { error } = require("console");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.log(JSON.parse(data));
  } catch (error) {
    console.error(error);
  }
}

// listContacts();

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contactById = JSON.parse(data).filter(
      (item) => Number(item.id) === contactId
    );
    console.log(contactById);
  } catch (error) {
    console.error(error);
  }
}

// getContactById(5);

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);
    const index = parsedData.findIndex((item) => Number(item.id) === contactId);
    parsedData.splice(index, 1);
    const newList = JSON.stringify([...parsedData]);

    await fs.writeFile(contactsPath, newList);
    const newData = await fs.readFile(contactsPath, "utf-8");
    console.log(JSON.parse(newData));
  } catch (error) {
    console.error(error);
  }
}

// removeContact(11);

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parsedData = JSON.parse(data);
    const lastIndex = parsedData.length;
    const newContact = [
      {
        id: `${lastIndex + 1}`,
        name,
        email,
        phone,
      },
    ];
    const newList = JSON.stringify([...parsedData, ...newContact]);
    await fs.writeFile(contactsPath, newList);
    const newData = await fs.readFile(contactsPath, "utf-8");
    console.log(JSON.parse(newData));
  } catch (error) {
    console.error(error);
  }
}

// addContact("Alla Yukhymenko", "magnolia@rambler.com", "(038) 678-6789");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
