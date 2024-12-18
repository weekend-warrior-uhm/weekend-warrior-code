'use server';

import { Activity, PrismaClient, Report } from '@prisma/client';
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
 * Creates a new activity in the database.
 * @param data - The activity data to create.
 */
export async function createActivity(data: Omit<Activity, 'id'>) {
  await prisma.activity.create({
    data: {
      name: data.name,
      description: data.description,
      location: data.location,
      date: data.date,
      time: data.time,
      author: data.author,
      author_email: data.author_email,
      duration: data.duration,
      registered: [data.author_email], // Automatically register the activity creator
      message: data.message,
    },
  });
  redirect('/activities');
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
      message: data.message,
    },
  });
  redirect('/activities');
}

export async function registerUpdateMain(act_id: number, newarr: string[]) {
  await prisma.activity.update({
    where: { id: act_id },
    data: {
      registered: newarr,
    },
  });
  redirect('/activities');
}

export async function registerUpdateMy(act_id: number, newarr: string[]) {
  await prisma.activity.update({
    where: { id: act_id },
    data: {
      registered: newarr,
    },
  });
  redirect('/my-activities');
}

/**
 * Deletes an existing activity from the database.
 * @param id - The ID of the activity to delete.
 */
export async function deleteActivity(id: number) {
  await prisma.activity.delete({
    where: { id },
  });
  redirect('/activities');
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

/**
 * Updates user information in the database.
 * @param credentials - The user credentials for updating the account.
 */
export async function updateUser(credentials: Omit<Credentials, 'password'>) {
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      username: credentials.username,
      fullName: credentials.fullName,
      phone: credentials.phone,
      gender: credentials.gender,
      interests: credentials.interests,
    },
  });
}

/**
 * Creates a new report in the database.
 * @param data - The report data to create.
 */
export async function createReport(data: Omit<Report, 'id'>) {
  await prisma.report.create({
    data: {
      activityId: data.activityId,
      activityName: data.activityName,
      activityAuthor: data.activityAuthor,
      reportText: data.reportText,
    },
  });
}

export async function submitReport(data: Omit<Report, 'id'>) {
  await prisma.report.create({
    data: {
      activityId: data.activityId,
      activityName: data.activityName,
      activityAuthor: data.activityAuthor,
      reportText: data.reportText,
    },
  });
}
