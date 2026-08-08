// Calculate the current Pacific Time price based on the system clock
const getCurrentPrice = (dayPrice, nightPrice) => {
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const hours = pacificTime.getHours();
  // Night time: 2:00 AM to 6:00 AM
  const isNightTime = hours >= 2 && hours < 6;
  return isNightTime ? nightPrice : dayPrice;
};

// ✅ NEW SHARED IMAGE URL (Replaced Amazon link)
export const defaultFunImage = 'https://iili.io/C4Kpobe.png';

export const funData = [
  // ==================== COGNAC ====================
  { id: 1, name: "D'ussé", type: "Cognac", size: "Trubble", price: getCurrentPrice(6.75, 10.25) },
  { id: 2, name: "D'ussé", type: "Cognac", size: "Double Trubble", price: getCurrentPrice(12.75, 19.25) },
  { id: 3, name: "Hennessy Black", type: "Cognac", size: "Trubble", price: getCurrentPrice(7.75, 11.75) },
  { id: 4, name: "Hennessy Black", type: "Cognac", size: "Double Trubble", price: getCurrentPrice(14.50, 21.75) },
  { id: 5, name: "Hennessy VSOP (Privilege)", type: "Cognac", size: "Trubble", price: getCurrentPrice(9.00, 13.50) },
  { id: 6, name: "Hennessy VSOP (Privilege)", type: "Cognac", size: "Double Trubble", price: getCurrentPrice(17.00, 25.50) },
  { id: 7, name: "Rémy Martin", type: "Cognac", size: "Trubble", price: getCurrentPrice(7.75, 11.75) },
  { id: 8, name: "Rémy Martin", type: "Cognac", size: "Double Trubble", price: getCurrentPrice(14.50, 21.75) },

  // ==================== GIN ====================
  { id: 9, name: "Bombay Sapphire", type: "Gin", size: "Trubble", price: getCurrentPrice(3.75, 5.75) },
  { id: 10, name: "Bombay Sapphire", type: "Gin", size: "Double Trubble", price: getCurrentPrice(7.25, 10.75) },

  // ==================== TEQUILA (CLEAR) ====================
  { id: 11, name: "Casamigos Blanco", type: "Tequila (Clear)", size: "Trubble", price: getCurrentPrice(4.50, 6.50) },
  { id: 12, name: "Casamigos Blanco", type: "Tequila (Clear)", size: "Double Trubble", price: getCurrentPrice(8.50, 12.75) },
  { id: 13, name: "Patron Sherry Añejo", type: "Tequila (Clear)", size: "Trubble", price: getCurrentPrice(6.25, 11.25) },
  { id: 14, name: "Patron Sherry Añejo", type: "Tequila (Clear)", size: "Double Trubble", price: getCurrentPrice(12.25, 21.00) },
  { id: 15, name: "Tito's", type: "Tequila (Clear)", size: "Trubble", price: getCurrentPrice(5.00, 7.75) },
  { id: 16, name: "Tito's", type: "Tequila (Clear)", size: "Double Trubble", price: getCurrentPrice(9.75, 15.50) },

  // ==================== TEQUILA (DARK) ====================
  { id: 17, name: "Casamigos Reposado", type: "Tequila (Dark)", size: "Trubble", price: getCurrentPrice(4.75, 6.75) },
  { id: 18, name: "Casamigos Reposado", type: "Tequila (Dark)", size: "Double Trubble", price: getCurrentPrice(9.25, 13.25) },
  { id: 19, name: "Don Julio Reposado", type: "Tequila (Dark)", size: "Trubble", price: getCurrentPrice(6.75, 11.00) },
  { id: 20, name: "Don Julio Reposado", type: "Tequila (Dark)", size: "Double Trubble", price: getCurrentPrice(12.75, 21.00) },

  // ==================== VODKA ====================
  { id: 21, name: "Grey Goose", type: "Vodka", size: "Trubble", price: getCurrentPrice(6.00, 8.25) },
  { id: 22, name: "Grey Goose", type: "Vodka", size: "Double Trubble", price: getCurrentPrice(11.00, 16.50) },

  // ==================== WHISKEY ====================
  { id: 23, name: "Jack Daniel's", type: "Whiskey", size: "Trubble", price: getCurrentPrice(5.75, 7.25) },
  { id: 24, name: "Jack Daniel's", type: "Whiskey", size: "Double Trubble", price: getCurrentPrice(10.75, 15.75) },
  { id: 25, name: "Jack Daniel's Honey", type: "Whiskey", size: "Trubble", price: getCurrentPrice(5.25, 6.25) },
  { id: 26, name: "Jack Daniel's Honey", type: "Whiskey", size: "Double Trubble", price: getCurrentPrice(10.25, 12.25) },
];