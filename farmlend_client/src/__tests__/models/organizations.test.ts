import { createOrganization, deleteOrganization, getOrganizationById, updateOrganization } from '@/services/organizations';
import { Organization } from '@/types/organization';

describe('Organizations', () => {
  let organization: Organization = {
    id: 1,
    name: 'Test Organization',
    type: 'Test Type',
  };

  it('should add an organization', async () => {
    const addedOrganization = await createOrganization(organization);
    organization = addedOrganization;
    expect(organization.id).not.toBeNull();
  });

  it('should get an organization', async () => {
    const fetchedOrganization = await getOrganizationById(organization.id);
    expect(fetchedOrganization).toEqual(organization);
  });

  it('should update an organization', async () => {
    organization.name = 'Updated Name';
    const updatedOrganization = await updateOrganization(organization.id, organization);
    organization = updatedOrganization;
    expect(organization.name).toBe('Updated Name');
  });

  it('should delete an organization', async () => {
    const deletedOrganization = await deleteOrganization(organization.id);
    expect(deletedOrganization).toEqual(organization);
  });
});
