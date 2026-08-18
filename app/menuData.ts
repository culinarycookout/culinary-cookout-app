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
  { id: 1, name: "EGG: BOILED", description: "The quickest meal of the day...", price: 0, category: "BREAKFAST", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
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

  // ==================== SANDWICHES ====================
  { id: 15, name: "CLUB", description: "Build your own club sandwich.", price: 0, category: "SANDWICH", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 16, name: "GRILLED CHEESE", description: "Build your own grilled cheese sandwich.", price: 0, category: "SANDWICH", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 17, name: "HOAGIE", description: "Build your own hoagie.", price: 0, category: "SANDWICH", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 18, name: "PANINI", description: "All warm & toasty.", price: 0, category: "SANDWICH", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== BUNS ====================
  { id: 19, name: "BURGER", description: "Build your own burger on this bun.", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 20, name: "SLIDERS", description: "Smaller burgers built on rolls.", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 21, name: "HOT DOG", description: "Get busy on this...", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 22, name: "SAUSAGE", description: "Pig out, without the pig!", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 23, name: "SUBMARINE SAUSAGE", description: "Go long... Go deep!", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 24, name: "SAVORY STUFFED WAFFLE", description: "We definitely skipped breakfast.", price: 0, category: "BUNS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== BIRDS ====================
  { id: 25, name: "FRIED CHICKEN", description: "Go half, or go whole.", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 26, name: "FRIED CHICKEN DRUM", description: "Play this drum with your teeth.", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 27, name: "FRIED CHICKEN THIGH", description: "These thighs were actually running at some point... Unlike their 'birds'...", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 28, name: "FRIED CHICKEN BREAST", description: "Don't take your eyes off these!", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 29, name: "FRIED CHICKEN PARTY WINGS", description: "Make sure you order some things to go with these wings...", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 30, name: "FRIED CHICKEN FINGERS", description: "Juicy strips of chicken fingertips.", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 31, name: "FRIED TURKEY", description: "He got fried because he couldn't fly.", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 32, name: "FRIED TURKEY DRUMS", description: "Fried & fit for a feast.", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 33, name: "FRIED TURKEY THIGHS", description: "Bigger thighs... Save even more lives!", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 34, name: "FRIED TURKEY PARTY WINGS", description: "Don't let these wings fly far.", price: 0, category: "BIRDS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== SEAFOOD ====================
  { id: 35, name: "CITRUS SHRIMP", description: "Sautéed, seasoned, & satisfying", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 36, name: "FRIED PRAWNS", description: "Prawns big enough to be a pet!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 37, name: "FRIED SNAPPER", description: "Battered but unbeatable!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 38, name: "STEAMED SNAPPER", description: "Swimming in seasoning.", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 39, name: "GRILLED SALMON", description: "Battered but unbeatable!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 40, name: "BOILED CRAB LEGS", description: "A boil in a bag!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 41, name: "STEAMED CRAB LEGS", description: "Cleaned & steamed... So get crackin'!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 42, name: "BOILED KING CRAB LEGS", description: "A boil fit for a king!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 43, name: "STEAMED KING CRAB LEGS", description: "All hail the King!", price: 0, category: "SEAFOOD", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== FRIED SIDES ====================
  { id: 44, name: "POTATO: FRIES", description: "Fried potatoes, not some science experiment.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 45, name: "POTATO: CURLIES", description: "You can almost never order enough curly fries... But you can try!", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 46, name: "POTATO: WEDGES", description: "A seasoned potato, fried, fluffy, & flavorful.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 47, name: "ZU: FRIES", description: "Zucchini has entered the chat.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 48, name: "ZU: CURLIES", description: "Zucchini with a twist! Literally...", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 49, name: "RINGS", description: "Battered & seasoned onion slices.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 50, name: "POPPERS", description: "Breaded jalapeños full of gooey cheese.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 51, name: "FLOWER BITES", description: "Popcorn cauliflower bites.", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 52, name: "POPCORN CHICKEN", description: "Eat treat. Repeat!", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 53, name: "POPCORN SHRIMP", description: "Bite-sized bite, big-time flavor!", price: 0, category: "FRIED SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== LATIN AMERICA ====================
  { id: 54, name: "BURRITO", description: "Build your burrito.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 55, name: "QUESADILLA", description: "Just a flour tortilla, put stuff in it.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 56, name: "TACO", description: "Just a corn tortilla, put stuff in it.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 57, name: "TACO PACKAGES", description: "Build your ideal taco meal.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 58, name: "TACO TRIO", description: "Customize these 3 amigos.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 59, name: "TACO PACK", description: "Add 3 groups to customize.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 60, name: "TACO PARTY", description: "Add 4 groups to customize.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 61, name: "TACO PARTY: FIESTA GRANDE", description: "Add 5 groups to customize.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 62, name: "ENCHILADAS", description: "Add 5 groups to customize.", price: 0, category: "LATIN AMERICA", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== ASIAN ====================
  { id: 63, name: "CHOW MEIN", description: "Turn noodles into something notable.", price: 0, category: "ASIAN", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 64, name: "STIR-FRY VEGETABLES", description: "Build your bowl, a full side serving of veggies.", price: 0, category: "ASIAN", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 65, name: "CITRUS CHICKEN", description: "Chicken worthy of a glazing.", price: 0, category: "ASIAN", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== BEEF ====================
  { id: 66, name: "EGG ROLL", description: "Cabbage, carrots, ginger, olives, scallions, & sprouts in a wrapper.", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 67, name: "COUNTRY FRIED STEAK", description: "Beaten down, battered up... but now it's all gravy...", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 68, name: "RIBEYE STEAK", description: "A good cut, for a full gut.", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 69, name: "TOMAHAWK STEAK", description: "Get 1st dibs on these ribs!", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 70, name: "FLANKEN RIBS", description: "", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 71, name: "SHORT RIBS", description: "", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 72, name: "OXTAILS", description: "", price: 0, category: "BEEF", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== SIDES ====================
  { id: 73, name: "MAC 'N' CHEESE", description: "Cooked low & slow...", price: 0, category: "SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 74, name: "ALFREDO", description: "Alfredo is life with the dull bits cut out. - Hitchcock", price: 0, category: "SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 75, name: "RICE", description: "20,000 years of deliciousness!", price: 0, category: "SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 76, name: "FRESH FRUIT CUP", description: "No forbidden fruits here!", price: 0, category: "SIDE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== VEGGIES ====================
  { id: 77, name: "STEAMED VEGGIES", description: "They enjoy a hot sauna too!", price: 0, category: "VEGGIES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 78, name: "SAUTÉED VEGGIES", description: "Tossed & turned because it was too hot.", price: 0, category: "VEGGIES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 79, name: "SALAD", description: "Create like Cardini.", price: 0, category: "VEGGIES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== SOUPS & STEWS ====================
  { id: 80, name: "CHILI", description: "Fresh or fast, make it last...", price: 0, category: "SOUPS & STEWS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 81, name: "SOUP & STEW", description: "Create a beautiful bowl!", price: 0, category: "SOUPS & STEWS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== JR. DISHES ====================
  { id: 82, name: "HOT DOG", description: "Your favorite dog!", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 83, name: "JR. BURGER", description: "A quarter-pound of fun in a bun.", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 84, name: "GRILLED CHEESE SANDWICH", description: "Classic grilled sandwich on white bread.", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 85, name: "CHICKEN FINGERS", description: "A few fingers for a few fingers.", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 86, name: "JR. FRIES", description: "A must-order!", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 87, name: "JR. CURLIES", description: "A curl cut above the rest!", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 88, name: "JR. QUESADILLA", description: "Try these triangles at different angles.", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 89, name: "SOFT TACO", description: "A taco dressed like a burrito, so you won't be dressed like a taco!", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 90, name: "JR. MAC & CHEESE", description: "A lil mac never hurt nobody.", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 91, name: "JR. FRUIT CUP", description: "Nature's candy.", price: 0, category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== TREATS ====================
  { id: 92, name: "STUFFED WAFFLE", description: "A stuffed dessert waffle.", price: 0, category: "TREATS", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== FLAMED ====================
  { id: 93, name: "BEEF", description: "The cow jumped over the moon... & landed right on the grill!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 94, name: "TOMAHAWK STEAK", description: "Your appetite is axing for it!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 95, name: "LAMB", description: "Perfect for grilling... Mary, look away!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 96, name: "BAKED CHICKEN", description: "Flame-baked, not flambéed.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 97, name: "ROASTED CHICKEN", description: "Held by the fire, & ends with a hot kiss.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 98, name: "CHICKEN BREASTS", description: "Check out these hot...", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 99, name: "CHICKEN DRUMS", description: "Made 100% from eggs.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 100, name: "CHICKEN THIGHS", description: "These thighs can run, but they can't fly!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 101, name: "CHICKEN WINGS", description: "Want some hot wings?... No, literally!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 102, name: "BAKED POTATO", description: "This is no side dish!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 103, name: "TURKEY BREASTS", description: "No botched breast job here!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 104, name: "TURKEY DRUMS", description: "A microwave can't do this!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 105, name: "TURKEY WINGS", description: "The hottest wings.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 106, name: "SNAPPER", description: "Hot fish... Hot dish!", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 107, name: "SHRIMP", description: "Every tail tells a tale...", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 108, name: "BURGERS", description: "Less grease, more goodness.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 109, name: "SAUSAGES", description: "Hot...Dogs.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 110, name: "VEGETABLES", description: "Build your own veggie meal, fresh off the grill.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 111, name: "STUFFED PEPPER", description: "A loaded bell pepper.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 112, name: "EGGPLANT", description: "Craft your own loaded eggplant.", price: 0, category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== BRAISED ====================
  { id: 113, name: "SHORT RIBS", description: "These ribs never fall short.", price: 0, category: "BRAISED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 114, name: "OXTAILS", description: "These tails tell no tales, no bull!", price: 0, category: "BRAISED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 115, name: "GOAT CHUNKS", description: "The goat of goats!", price: 0, category: "BRAISED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 116, name: "CHICKEN", description: "Raised from eggs to be braised.", price: 0, category: "BRAISED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== ROTISSERIE ====================
  { id: 117, name: "BEEF", description: "Big beef, cooked slow...", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 118, name: "CHICKEN", description: "Let's make this bird dizzy...", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 119, name: "TURKEY", description: "Holiday flavor, any day!", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 120, name: "CABBAGE", description: "You gotta try this!!!", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 121, name: "CAULIFLOWER", description: "A super fire flower... Just ask Mario!", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 122, name: "PINEAPPLE", description: "Topped w/ cinnamon. What a treat!", price: 0, category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== SMOKED ====================
  { id: 123, name: "OXTAILS", description: "This time, fumes are going into the tail.", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 124, name: "FLANKEN BEEF RIBS", description: "No stripped-down flavor on these strips!", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 125, name: "SHORT RIBS", description: "CAUTION: They may become boneless.", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 126, name: "STEAKS", description: "No problems w/ this beef.", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 127, name: "TOMAHAWK STEAK", description: "Metal axe > Wood > Smoke > Meat Axe > Hunger", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 128, name: "GOAT/LAMB", description: "The other red meats.", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 129, name: "CHICKEN", description: "From halves to hens.", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 130, name: "CORNISH HEN", description: "A grown baby bird.", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 131, name: "TURKEY", description: "Be thankful for this bird!", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 132, name: "SALMON FILLET", description: "Hooked & crooked... Cooked & smoked.", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 133, name: "SNAPPER", description: "From on the hook, to off the hook!", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 134, name: "SHRIMP", description: "A pound of large shrimp.", price: 0, category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },

  // ==================== BEVERAGE ====================
  { id: 135, name: "SPRING WATER", description: "Cool & refreshing.", price: 0, category: "BEVERAGE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 136, name: "LEMONADE", description: "Lemon & honey infused spring water.", price: 0, category: "BEVERAGE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
  { id: 137, name: "DIRTY LEMONADE", description: "Honey & cinnamon infused lemonade w/ peach & cherry juice..", price: 0, category: "BEVERAGE", image: "PLACEHOLDER_IMAGE_URL", addOns: [] },
];