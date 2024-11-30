'use server';

import { Activity } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Edits an existing activity in the database.
 * @param activity, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editActivity(data: Activity) {
  // console.log(`editActivity data: ${JSON.stringify(activity, null, 2)}`);
  await prisma.activity.update({
    where: { id: data.id },
    data: {
      name: data.name,
      description: data.description,
      location: data.location,
      date: data.date,
      time: data.time,
      author: data.author,
      author_email: data.author_email,
      duration: data.duration,
      registered: data.registered,
    },
  });
  // After updating, redirect to the activites page
  redirect('/activities');
}

export async function registerUpdate(act_id: number, newarr: string[]) {
  await prisma.activity.update({
    where: { id: act_id },
    data: {
      registered: newarr,
    },
  });

  redirect('/activities');
}

/**
 * Deletes an existing activity from the database.
 * @param id, the id of the activity to delete.
 */
export async function deleteActivity(id: number) {
  // console.log(`deleteActivity id: ${id}`);
  await prisma.activity.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

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
