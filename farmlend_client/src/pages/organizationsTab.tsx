import React, { useState, useEffect } from 'react';
import { Organization } from '@/types/organization';
import styles from '../styles/Organizations.module.css'

type OrganizationsTabProps = {};

const OrganizationsTab: React.FC<OrganizationsTabProps> = (props: OrganizationsTabProps) => {

  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const fetchOrganizations = async () => {
    const response = await fetch('/api/organizations');
    if (response.ok) {
      const organizations = await response.json();
      setOrganizations(organizations);
    }
  };

  const createOrganization = async (data: Organization) => {
    const response = await fetch('/api/organizations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const organization = await response.json();
      setOrganizations([...organizations, organization]);
    }
  };

  const updateOrganization = async (id: number, data: Organization) => {
    const response = await fetch(`/api/organizations?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const organization = await response.json();
      const updatedOrganizations = organizations.map((o) => (o.id === organization.id ? organization : o));
      setOrganizations(updatedOrganizations);
    }
  };

  const deleteOrganization = async (id: number) => {
    const response = await fetch(`/api/organizations?id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const deletedOrganization = await response.json();
      const updatedOrganizations = organizations.filter((o) => o.id !== deletedOrganization.id);
      setOrganizations(updatedOrganizations);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [organizations]);

  const handleCreate = async () => {
    const name = prompt('Enter name:');
    const type = prompt('Enter type:');
    if (name && type) {
      const newOrganization = { name, type } as Organization;
      await createOrganization(newOrganization);
    }
  };

  const handleEdit = async (organization: Organization) => {
    const name = prompt('Enter name:', organization.name);
    const type = prompt('Enter type:', organization.type);
    if (name && type) {
      const updatedOrganization = { ...organization, name, type };
      await updateOrganization(updatedOrganization.id, updatedOrganization);
    }
  };

  return (
    <div>
      <h2>Organizations</h2>
      <table>
        <thead>
          <tr className={styles.minWidth}>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization) => (
            <tr className={styles.minWidth} key={organization.id}>
              <td>{organization.id}</td>
              <td>{organization.name}</td>
              <td>{organization.type}</td>
              <td>
                <button onClick={() => handleEdit(organization)}>Edit</button>
                <button onClick={() => deleteOrganization(organization.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreate}>New Organization</button>
      </div>
  );
};

export default OrganizationsTab;

