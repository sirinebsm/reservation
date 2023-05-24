const express = require('express');
const app = express();

// Données de test pour les chambres
const rooms = [
  { id: '1', name: 'Chambre 1', description: 'Chambre simple', amenities: ['Wi-Fi', 'Télévision'] },
  { id: '2', name: 'Chambre 2', description: 'Chambre double', amenities: ['Wi-Fi', 'Climatisation', 'Mini-bar'] },
  // Ajoutez d'autres chambres ici...
];

// Récupérer la liste des chambres
app.get('/rooms', (req, res) => {
  res.json(rooms);
});

// Récupérer les détails d'une chambre spécifique
app.get('/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  const room = rooms.find(room => room.id === roomId);

  if (!room) {
    res.status(404).json({ error: 'Chambre non trouvée' });
  } else {
    res.json(room);
  }
});

// Ajouter une nouvelle chambre
app.post('/rooms', (req, res) => {
  const newRoom = req.body;
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

// Mettre à jour les détails d'une chambre spécifique
app.put('/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  const updatedRoom = req.body;
  const roomIndex = rooms.findIndex(room => room.id === roomId);

  if (roomIndex === -1) {
    res.status(404).json({ error: 'Chambre non trouvée' });
  } else {
    rooms[roomIndex] = { ...rooms[roomIndex], ...updatedRoom };
    res.json(rooms[roomIndex]);
  }
});

// Supprimer une chambre spécifique
app.delete('/rooms/:id', (req, res) => {
  const roomId = req.params.id;
  const roomIndex = rooms.findIndex(room => room.id === roomId);

  if (roomIndex === -1) {
    res.status(404).json({ error: 'Chambre non trouvée' });
  } else {
    const deletedRoom = rooms.splice(roomIndex, 1);
    res.json(deletedRoom[0]);
  }
});

// Démarrer le serveur
app.listen(4002, () => {
  console.log('Microservice de gestion des chambres d\'hôtel démarré sur le port 4002');
});