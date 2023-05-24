// Données de test pour les chambres
const rooms = [
    { id: '1', name: 'Chambre 1', description: 'Chambre simple', amenities: ['Wi-Fi', 'Télévision'] },
    { id: '2', name: 'Chambre 2', description: 'Chambre double', amenities: ['Wi-Fi', 'Climatisation', 'Mini-bar'] },
    // Ajoutez d'autres chambres ici...
  ];
  
  // Données de test pour les réservations
  let reservations = [
    { id: '1', roomId: '1', guestName: 'John Doe', checkInDate: '2023-05-01', checkOutDate: '2023-05-05' },
    { id: '2', roomId: '2', guestName: 'Jane Smith', checkInDate: '2023-06-10', checkOutDate: '2023-06-15' },
    // Ajoutez d'autres réservations ici...
  ];
  
  const resolvers = {
    Query: {
      rooms: () => rooms,
      room: (_, { id }) => rooms.find(room => room.id === id),
      reservations: () => reservations,
      reservation: (_, { id }) => reservations.find(reservation => reservation.id === id),
    },
    Mutation: {
      reserveRoom: (_, { roomId, guestName, checkInDate, checkOutDate }) => {
        const reservation = {
          id: String(reservations.length + 1),
          roomId,
          guestName,
          checkInDate,
          checkOutDate,
        };
        reservations.push(reservation);
        return reservation;
      },
      cancelReservation: (_, { id }) => {
        const index = reservations.findIndex(reservation => reservation.id === id);
        if (index !== -1) {
          reservations.splice(index, 1);
          return true;
        }
        return false;
      },
    },
  };
  
  module.exports = resolvers;
  