'use server';

import { Activity, PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

interface Credentials {
  email: string;
  username: string;
  password: string;
  fullName: string;
  phone: string;
  gender: string;
  interests: string[];
}

/**
 * Edits an existing activity in the database.
 * @param data - The activity data to update.
 */
export async function editActivity(data: Activity) {
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
 * @param id - The ID of the activity to delete.
 */
export async function deleteActivity(id: number) {
  await prisma.activity.delete({
    where: { id },
  });
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials - The user credentials for creating a new account.
 */
export async function createUser(credentials: Credentials) {
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      username: credentials.username,
      password,
      fullName: credentials.fullName,
      phone: credentials.phone,
      gender: credentials.gender,
      interests: credentials.interests,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials - The user credentials for changing the password.
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
