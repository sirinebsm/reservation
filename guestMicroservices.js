const express = require('express');
const app = express();

// Données de test pour les invités
const guests = [
  { id: '1', firstName: 'Joe', lastName: 'cezar', email: 'joecezar@example.com', phoneNumber: '123456789' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'janesmith@example.com', phoneNumber: '987654321' },
  // Ajoutez d'autres invités ici...
];

// Récupérer la liste des invités
app.get('/guests', (req, res) => {
  res.json(guests);
});

// Récupérer les détails d'un invité spécifique
app.get('/guests/:id', (req, res) => {
  const guestId = req.params.id;
  const guest = guests.find(guest => guest.id === guestId);

  if (!guest) {
    res.status(404).json({ error: 'Invité non trouvé' });
  } else {
    res.json(guest);
  }
});

// Ajouter un nouvel invité
app.post('/guests', (req, res) => {
  const newGuest = req.body;
  guests.push(newGuest);
  res.status(201).json(newGuest);
});

// Mettre à jour les détails d'un invité spécifique
app.put('/guests/:id', (req, res) => {
  const guestId = req.params.id;
  const updatedGuest = req.body;
  const guestIndex = guests.findIndex(guest => guest.id === guestId);

  if (guestIndex === -1) {
    res.status(404).json({ error: 'Invité non trouvé' });
  } else {
    guests[guestIndex] = { ...guests[guestIndex], ...updatedGuest };
    res.json(guests[guestIndex]);
  }
});

// Supprimer un invité spécifique
app.delete('/guests/:id', (req, res) => {
  const guestId = req.params.id;
  const guestIndex = guests.findIndex(guest => guest.id === guestId);

  if (guestIndex === -1) {
    res.status(404).json({ error: 'Invité non trouvé' });
  } else {
    const deletedGuest = guests.splice(guestIndex, 1);
    res.json(deletedGuest[0]);
  }
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Microservice de gestion des invités d\'hôtel démarré sur le port 3000');
});