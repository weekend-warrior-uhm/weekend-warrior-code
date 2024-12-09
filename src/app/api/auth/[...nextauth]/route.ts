import NextAuth from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// NextAuth Handler
const authHandler = NextAuth(authOptions);

// Utility function to get activity by ID
async function getActivityById(id: number) {
  return prisma.activity.findUnique({
    where: { id },
  });
}

// Main API Route Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { email } = req.body;

  if (req.url?.includes('/api/activity')) {
    switch (req.method) {
      case 'GET':
        try {
          const activity = await getActivityById(Number(id));
          return res.status(200).json(activity);
        } catch (error) {
          return res.status(500).json({ error: 'Failed to fetch activity' });
        }

      case 'POST':
        if (req.url.includes('register')) {
          try {
            const activity = await prisma.activity.update({
              where: { id: Number(id) },
              data: { registered: { push: email } },
            });
            return res.status(200).json(activity);
          } catch (error) {
            return res.status(500).json({ error: 'Failed to register for activity' });
          }
        } else if (req.url.includes('unregister')) {
          try {
            const activity = await prisma.activity.findUnique({
              where: { id: Number(id) },
            });

            if (activity && activity.registered) {
              const updatedRegistered = activity.registered.filter((user: string) => user !== email);
              const updatedActivity = await prisma.activity.update({
                where: { id: Number(id) },
                data: { registered: updatedRegistered },
              });
              return res.status(200).json(updatedActivity);
            }
            return res.status(404).json({ error: 'Activity not found or no users registered' });
          } catch (error) {
            return res.status(500).json({ error: 'Failed to unregister from activity' });
          }
        } else {
          return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
        }

      default:
        return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
    }
  } else {
    // Delegate to NextAuth handler for authentication-related routes
    return authHandler(req, res);
  }
}
