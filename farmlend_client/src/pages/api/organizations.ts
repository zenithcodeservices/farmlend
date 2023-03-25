// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createOrganization, deleteOrganization, getOrganizationById, updateOrganization } from '@/services/organizations';
import { Organization } from '@/types/organization';
import type { NextApiRequest, NextApiResponse } from 'next'


type OrganizationResponse = {
  status: string;
  message: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Organization | Organization[] | OrganizationResponse>
) {
  switch (req.method) {
    case 'GET':
      try {
        const id = Number(req.query.id);
        const Organization = await getOrganizationById(id);
        if (Organization) {
          res.status(200).json(Organization);
        } else {
          res.status(404).json({
            message: `Organization with ID ${req.query.id} not found`,
            status: 'error'
          });
        }
      } catch (error) {
        res.status(500).json({
          message: (error as Error).message,
          status: 'error'
        });
      }
      break;
    case 'POST':
      try {
        const data = req.body;
        const Organization = await createOrganization(data);
        res.status(201).json(Organization);
      } catch (error) {
        res.status(500).json({
          message: (error as Error).message,
          status: 'error'
        });
      }
      break;
    case 'PUT':
      try {
        const id = Number(req.query.id);
        const data = req.body;
        const Organization = await updateOrganization(id, data);
        res.status(200).json(Organization);
      } catch (error) {
        res.status(500).json({
          message: (error as Error).message,
          status: 'error'
        });
      }
      break;
    case 'DELETE':
      try {
        const id = Number(req.query.id);
        const response = await deleteOrganization(id);
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({
          message: (error as Error).message,
          status: 'error'
        });
      }
      break;
    default:
      res.status(405).json({
        message: 'Method not allowed',
        status: 'error'
      });
      break;
    }
}
