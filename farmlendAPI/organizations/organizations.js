const express = require('express');
const router = express.Router();
const pool = require('../server');


// Create a new organization
router.post('/organizations', async (req, res) => {
    try {
      const { name, type } = req.body;
      const newOrganization = await pool.query(
        'INSERT INTO organizations (name, type) VALUES ($1, $2) RETURNING *',
        [name, type]
      );
      res.json(newOrganization.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Get all organizations
  router.get('/organizations', async (req, res) => {
    try {
      const allOrganizations = await pool.query('SELECT * FROM organizations');
      res.json(allOrganizations.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Get a single organization by id
  router.get('/organizations/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const organization = await pool.query(
        'SELECT * FROM organizations WHERE id = $1',
        [id]
      );
      res.json(organization.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Update an organization
  router.put('/organizations/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, type } = req.body;
      const updateOrganization = await pool.query(
        'UPDATE organizations SET name = $1, type = $2 WHERE id = $3 RETURNING *',
        [name, type, id]
      );
      res.json(updateOrganization.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
  
  // Delete an organization
  router.delete('/organizations/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleteOrganization = await pool.query(
        'DELETE FROM organizations WHERE id = $1',
        [id]
      );
      res.json('Organization was deleted!');
    } catch (err) {
      console.error(err.message);
    }
  });