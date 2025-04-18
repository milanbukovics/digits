'use server';

import { Contact } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

export async function addContact(contact: {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
}) {
  await prisma.contact.create({
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      image: contact.image, // Ensure this is a valid URL or path to an image
      address: contact.address,
      description: contact.description, // Optional, can be empty
      owner: contact.owner, // The email of the user who owns this contact
    },
  });
  redirect('/list'); // After adding, redirect to the list page
}

export async function editContact(contact: Contact) {
  await prisma.contact.update({
    where: { id: contact.id },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      image: contact.image, // Ensure this is a valid URL or path to an image
      address: contact.address,
      description: contact.description, // Optional, can be empty
      owner: contact.owner, // The email of the user who owns this contact
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

export async function addNote(note: {
  note: string;
  contactId: number; // The ID of the contact this note is associated with
  owner: string;
}) {
  await prisma.note.create({
    data: {
      note: note.note,
      contactId: note.contactId, // Associate with the contact
      owner: note.owner,
      createdAt: new Date(), // The email of the user who owns this note
    },
  });
  redirect('/list'); // After adding, redirect to the list page
}
