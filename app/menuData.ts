// app/menuData.ts

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number; // Set to 0 until you add the actual prices
  category: string;
  image: string; // Replace "PLACEHOLDER_IMAGE_URL" with your Supabase/Cloudinary URL
  addOns: any[]; // Empty array for future hardcoded add-ons
}

export const FOOD_MENU_ITEMS: MenuItem[] = [
  // ==================== BREAKFAST ====================
  { id: 1, name: "KIDOGO", description: "The quickest meal of the day...", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 2, name: "EGGS: FRIED", description: "How far will you let the yolk run?", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 3, name: "EGGS: SCRAMBLED", description: "No need to scramble, unless it's eggs...", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 4, name: "EGGS: OMELETTE", description: "Start with eggs, end with eggstasy.", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 5, name: "FRENCH TOAST", description: "How many slices?", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 6, name: "PANCAKES", description: "Take these hotcakes on a hot date.", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 7, name: "WAFFLES", description: "The griddle's greatest ever!", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 8, name: "STUFFED WAFFLE", description: "A sweet treat of your creation...", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 9, name: "BURRITO", description: "Breakfast in a burrito.", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 10, name: "MUFFIN SANDWICH", description: "Muffins make miracles...", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 11, name: "FRIED STEAK", description: "A fried steak w/ a light gravy.", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 12, name: "BACON", description: "Meat... NOT fat...", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 13, name: "SAUSAGES", description: "Pick your type & flavor...", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 14, name: "BREADS", description: "Toast! Muffins! The universal breakfast staple.", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== SANDWICH ====================
  { id: 15, name: "CLUB", description: "Build your own club sandwich.", price: 0, category: "SANDWICH", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 16, name: "GRILLED CHEESE", description: "Build your own grilled cheese sandwich.", price: 0, category: "SANDWICH", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 17, name: "HOT DELI", description: "Build your own hoagie.", price: 0, category: "SANDWICH", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== BUNS ====================
  { id: 18, name: "BURGER", description: "Build your own burger on this bun.", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 19, name: "BURGER: SLIDERS", description: "Smaller burgers built on rolls.", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 20, name: "HOT DOG", description: "Pig out, without the pig!", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 21, name: "SAUSAGE", description: "Go long... Go deep!", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 22, name: "SUBMARINE SAUSAGE", description: "Go long... Go deep!", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 23, name: "SAVORY STUFFED WAFFLE", description: "We definitely skipped breakfast.", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== BIRDS ====================
  { id: 24, name: "FRIED CHICKEN", description: "A half, whole, or butchered bird.", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 25, name: "FRIED CHICKEN DRUMS", description: "These legs were actually clucking at some point... Unlike their 'birds'...", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 26, name: "FRIED CHICKEN THIGHS", description: "These thighs were actually running at some point... Unlike their 'birds'...", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 27, name: "FRIED CHICKEN BREASTS", description: "This chicken was actually clucking at some point... Unlike their 'birds'...", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 28, name: "PARTY WINGS: FRIED CHICKEN", description: "Make sure you order some things to go with these wings...", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 29, name: "FRIED TURKEY", description: "A whole bird, deep-fried or convection fried w/ oil.", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 30, name: "FRIED TURKEY DRUMS", description: "Fried & fit for a feast.", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 31, name: "FRIED TURKEY THIGHS", description: "Bigger wings... Bigger flavor!", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 32, name: "PARTY WINGS: FRIED TURKEY", description: "Bigger wings... Bigger flavor!", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== SEAFOOD ====================
  { id: 33, name: "CITRUS SHRIMP", description: "Sautéed, seasoned & satisfying", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 34, name: "FRIED PRAWNS", description: "Prawns big enough to be a pet!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 35, name: "FRIED SNAPPER", description: "Battered but unbeatable!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 36, name: "STEAMED SNAPPER", description: "Swimming in seasoning.", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 37, name: "GRILLED SALMON", description: "Battered but unbeatable!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 38, name: "BOILED CRAB LEGS", description: "A boil in a bag!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 39, name: "STEAMED CRAB LEGS", description: "Cleaned & steamed... So get crackin'!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 40, name: "BOILED KING CRAB LEGS", description: "A boil fit for a king!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 41, name: "STEAMED KING CRAB LEGS", description: "All hail the King!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== FRIED SIDE ====================
  { id: 42, name: "POTATO: FRIES", description: "Fried potatoes, not some science experiment.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 43, name: "POTATO: CURLIES", description: "You can almost never order enough curly fries... But you can try!", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 44, name: "POTATO: WEDGES", description: "A seasoned potato, fried, fluffy, & flavorful.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 45, name: "ZU: FRIES", description: "Zucchini has entered the chat.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 46, name: "ZU: CURLIES", description: "Zucchini with a twist! Literally...", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 47, name: "RINGS", description: "Battered & seasoned onion slices.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 48, name: "POPPERS", description: "Breaded jalapeños full of gooey cheese.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 49, name: "FLOWER BITES", description: "Popcorn cauliflower bites.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 50, name: "POPCORN CHICKEN", description: "Eat treat. Repeat!", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 51, name: "POPCORN SHRIMP", description: "Eat treat. Repeat!", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== LATIN AMERICA ====================
  { id: 52, name: "BURRITO", description: "Build your burrito.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 53, name: "QUESADILLA", description: "Just a flour tortilla, put stuff in it.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 54, name: "TACO", description: "Just a corn tortilla, put stuff in it.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 55, name: "TACO PACKAGES", description: "Build your ideal taco meal.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 56, name: "TACO TRIO", description: "Customize these 3 amigos.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 57, name: "TACO PACK", description: "Add 3 groups to customize.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 58, name: "TACO PARTY", description: "Add 4 groups to customize.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 59, name: "TACO PARTY: FIESTA GRANDE", description: "Add 5 groups to customize.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 60, name: "ENCHILADAS", description: "Add 5 groups to customize.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== ASIAN ====================
  { id: 61, name: "CHOW MEIN", description: "Build your bowl, a full side serving of veggies.", price: 0, category: "ASIAN", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 62, name: "STIR-FRY VEGETABLES", description: "Build your bowl, a full side serving of veggies.", price: 0, category: "ASIAN", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 63, name: "CITRUS CHICKEN", description: "Build your bowl, a full side serving of veggies.", price: 0, category: "ASIAN", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== BEEF ====================
  { id: 64, name: "EGG ROLL", description: "Cabbage, carrots, ginger, olives, scallions, & sprouts in a wrapper.", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 65, name: "COUNTRY FRIED STEAK", description: "Beaten down, battered up... but now it's all gravy...", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 66, name: "RIBEYE STEAK", description: "", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 67, name: "TOMAHAWK STEAK", description: "", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 68, name: "FLANKEN RIBS", description: "", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 69, name: "SHORT RIBS", description: "", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 70, name: "OXTAILS", description: "", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== SIDE ====================
  { id: 71, name: "MAC & CHEESE", description: "Cooked low & slow...", price: 0, category: "SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 72, name: "ALFREDO", description: "", price: 0, category: "SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 73, name: "RICE", description: "", price: 0, category: "SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 74, name: "FRESH FRUIT CUP", description: "", price: 0, category: "SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== VEGGIES ====================
  { id: 75, name: "STEAMED VEGGIES", description: "", price: 0, category: "VEGGIES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 76, name: "SAUTÉED VEGGIES", description: "", price: 0, category: "VEGGIES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 77, name: "SALAD", description: "", price: 0, category: "VEGGIES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== SOUPS & STEWS ====================
  { id: 78, name: "CHILI", description: "Slow-cooked & off the hook!", price: 0, category: "SOUPS & STEWS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 79, name: "SOUP & STEW", description: "Create a beautiful bowl", price: 0, category: "SOUPS & STEWS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== JR. DISHES ====================
  { id: 80, name: "HOT DOG", description: "", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 81, name: "JR. BURGER", description: "", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 82, name: "GRILLED CHEESE SANDWICH", description: "Classic grilled sandwich on white bread.", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 83, name: "CHICKEN FINGERS", description: "", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 84, name: "JR. FRIES", description: "", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 85, name: "JR. CURLIES", description: "", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 86, name: "JR. QUESADILLA", description: "", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 87, name: "SOFT TACO", description: "", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 88, name: "JR. MAC & CHEESE", description: "", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 89, name: "FRESH FRUIT CUP", description: "", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== TREATS ====================
  { id: 90, name: "STUFFED WAFFLE", description: "A stuffed dessert waffle.", price: 0, category: "TREATS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== FLAMED ====================
  { id: 91, name: "BEEF", description: "The cow jumped over the moon... & landed right on the grill!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 92, name: "LAMB", description: "Perfect for grilling... Mary, look away!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 93, name: "BAKED CHICKEN", description: "Barbecue chicken.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 94, name: "ROASTED CHICKEN", description: "Barbecue chicken.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 95, name: "CHICKEN: DRUMS", description: "Hot legs.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 96, name: "TURKEY WINGS", description: "Barbecue chicken.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 97, name: "SNAPPER", description: "Hot fish... Hot dish!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 98, name: "SHRIMP", description: "Every tail tells a tale...", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 99, name: "BURGERS", description: "Charboiled patties...", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 100, name: "SAUSAGES", description: "Hot... Dogs.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 101, name: "VEGETABLES", description: "Build your own veggie meal, fresh off the grill.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 102, name: "BAKED POTATO", description: "This is no side dish!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 103, name: "STUFFED PEPPER", description: "A loaded bell pepper.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 104, name: "EGGPLANT", description: "Craft your own loaded eggplant.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== ROTISSERIE ====================
  { id: 105, name: "BEEF", description: "Big beef, cooked slow.", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 106, name: "CHICKEN", description: "Let's make this bird dizzy...", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 107, name: "TURKEY", description: "Holiday flavor, any day!", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 108, name: "CABBAGE", description: "You gotta try this!!!", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 109, name: "CAULIFLOWER", description: "A super fire flower... Just ask Mario!", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 110, name: "PINEAPPLE", description: "Topped w/ cinnamon. What a treat!", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== SMOKED ====================
  { id: 111, name: "OXTAILS", description: "", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 112, name: "FLANKEN BEEF RIBS", description: "", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 113, name: "SHORT BEEF RIBS", description: "", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 114, name: "STEAKS", description: "", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 115, name: "TOMAHAWK STEAK", description: "", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 116, name: "GOAT/LAMB", description: "", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 117, name: "CHICKEN", description: "", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 118, name: "CORNISH HEN", description: "", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 119, name: "TURKEY", description: "", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 120, name: "SALMON", description: "", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 121, name: "SNAPPER", description: "A whole seasoned red snapper fish.", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 122, name: "SHRIMP", description: "Sold by the half pound.", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== BEVERAGE ====================
  { id: 123, name: "SPRING WATER", description: "Cool & refreshing.", price: 0, category: "BEVERAGE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 124, name: "LEMONADE", description: "Lemon & honey infused spring water.", price: 0, category: "BEVERAGE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 125, name: "DIRTY STRAWBERRY LEMONADE", description: "Honey & cinnamon infused strawberry lemonade.", price: 0, category: "BEVERAGE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
];