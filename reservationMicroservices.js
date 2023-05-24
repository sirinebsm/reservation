// Import des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const reservationController = require('./reservationController');

// Configuration de l'application Express
const app = express();
app.use(bodyParser.json());

// Endpoint pour vérifier la disponibilité d'une chambre
app.get('/availability', async (req, res) => {
  try {
    const { startDate, endDate, roomId } = req.query;
    const availability = await reservationController.checkAvailability(startDate, endDate, roomId);
    res.json({ available: availability });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la vérification de la disponibilité.' });
  }
});

// Endpoint pour créer une réservation
app.post('/reservations', async (req, res) => {
  try {
    const { startDate, endDate, roomId, guestId } = req.body;
    const reservationId = uuidv4();
    await reservationController.createReservation(reservationId, startDate, endDate, roomId, guestId);
    res.json({ reservationId });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de la réservation.' });
  }
});

// Endpoint pour annuler une réservation
app.delete('/reservations/:reservationId', async (req, res) => {
  try {
    const { reservationId } = req.params;
    await reservationController.cancelReservation(reservationId);
    res.json({ message: 'Réservation annulée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'annulation de la réservation.' });
  }
});

// Démarrage du serveur
app.listen(4003, () => {
  console.log('Le microservice de réservation est en écoute sur le port 3000...');
});
