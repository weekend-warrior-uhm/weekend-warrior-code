'use server';

import { Activity } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Adds a new activity to the database.
 * @param activity, an object with the following properties:
 * name, description, location, date, time, author.
 */
// eslint-disable-next-line max-len
export async function addActivity(activity: { name: string; description: string; location: string; date: string; time: string; author: string }) {
  await prisma.activity.create({
    data: {
      name: activity.name,
      description: activity.description,
      location: activity.location,
      date: activity.date,
      time: activity.time,
      author: activity.author,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing activity in the database.
 * @param activity, an object with the following properties:
 * id, name, description, location, date, time, author.
 */
export async function editActivity(activity: Activity) {
  await prisma.activity.update({
    where: { id: activity.id },
    data: {
      name: activity.name,
      description: activity.description,
      location: activity.location,
      date: activity.date,
      time: activity.time,
      author: activity.author,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing activity from the database.
 * @param id, the id of the activity to delete.
 */
export async function deleteActivity(id: number) {
  await prisma.activity.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties:
 * email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
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
 * @param credentials, an object with the following properties:
 * email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
