import NextAuth from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

// NextAuth Handler
const handler = NextAuth(authOptions);

// Utility function to get activity by ID
async function getActivityById(id: number) {
  return prisma.activity.findUnique({
    where: { id },
  });
}

// API Handler for Activity Operations
async function activityHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { email } = req.body;

  switch (req.method) {
    case 'GET':
      try {
        const activity = await getActivityById(Number(id));
        res.status(200).json(activity);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
      }
      break;

    case 'POST':
      if (req.url?.includes('register')) {
        try {
          const activity = await prisma.activity.update({
            where: { id: Number(id) },
            data: { registered: { push: email } },
          });
          res.status(200).json(activity);
        } catch (error) {
          res.status(500).json({ error: 'Failed to register for activity' });
        }
      } else if (req.url?.includes('unregister')) {
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
            res.status(200).json(updatedActivity);
          } else {
            res.status(404).json({ error: 'Activity not found or no users registered' });
          }
        } catch (error) {
          res.status(500).json({ error: 'Failed to unregister from activity' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Export Handlers
export { handler as GET, handler as POST, activityHandler };
