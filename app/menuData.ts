// app/menuData.ts

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  subMenu: SubMenuItem[];
  addOns: any[];
}

export interface SubMenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export const FOOD_MENU_ITEMS: MenuItem[] = [
  // ==================== BREAKFAST ====================
  {
    id: "breakfast-griddle",
    name: "GRIDDLE",
    description: "The griddle's greatest ever!",
    price: 0,
    category: "BREAKFAST",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "french-toast", name: "FRENCH TOAST", description: "How many slices are too many?", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "pancakes", name: "PANCAKES", description: "Take these hotcakes on a hot date.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "waffles", name: "WAFFLES", description: "The gridiron's greatest ever!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "breakfast-meat",
    name: "MEAT",
    description: "Pick your type & flavor…",
    price: 0,
    category: "BREAKFAST",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "bacon", name: "BACON", description: "Meat… NOT fat…", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "sausages", name: "SAUSAGES", description: "Pick your type & flavor…", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "breakfast-potato",
    name: "POTATO",
    description: "Pick your type & flavor…",
    price: 0,
    category: "BREAKFAST",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "chunks", name: "CHUNKS", description: "Hearty, crispy breakfast potatoes.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "diced", name: "DICED", description: "Small, golden fried potato bites.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "hash-brown", name: "HASH BROWN PATTY", description: "The crispy, classic breakfast side.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },

  // ==================== SANDWICHES ====================
  {
    id: "sandwich-club",
    name: "CLUB",
    description: "Build your own club sandwich.",
    price: 0,
    category: "SANDWICHES",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "club-sandwich", name: "CLUB SANDWICH", description: "Build your own club sandwich.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "double-decker", name: "DOUBLE-DECKER", description: "Twice the flavor, stacked to the sky.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "sandwich-hoagie",
    name: "HOAGIE",
    description: "Build your own hoagie.",
    price: 0,
    category: "SANDWICHES",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "half-hoagie", name: "HALF", description: "Half the size, all the flavor.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "submarine", name: "SUBMARINE", description: "The full-sized classic.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "sandwich-pressed",
    name: "PRESSED",
    description: "All warm & toasty.",
    price: 0,
    category: "SANDWICHES",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "grilled-cheese", name: "GRILLED CHEESE", description: "Build your own grilled cheese sandwich.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "panini", name: "PANINI", description: "All warm & toasty.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "sandwich-sausage",
    name: "SAUSAGE",
    description: "Pig out, without the pig!",
    price: 0,
    category: "SANDWICHES",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "hot-dog", name: "HOT DOG", description: "Get busy on this glizzy…", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "link", name: "LINK", description: "Classic link sausage.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "submarine-sandwich", name: "SUBMARINE", description: "Go long… Go deep!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "sandwich-burger",
    name: "BURGER",
    description: "Build your burger from the bun up.",
    price: 0,
    category: "SANDWICHES",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "burger", name: "BURGER", description: "Build your burger from the bun up.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "sliders", name: "SLIDERS", description: "Smaller burgers built on rolls.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },

  // ==================== BIRDS ====================
  {
    id: "birds-air-fried-chicken",
    name: "AIR-FRIED CHICKEN",
    description: "Go half, or go whole.",
    price: 0,
    category: "BIRDS",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "whole", name: "WHOLE", description: "The full bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "half", name: "HALF", description: "Half the bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "drums", name: "DRUMS", description: "Play this drum with your teeth.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "breasts", name: "BREASTS", description: "Don't take your eyes off these!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "birds-battered-fried-chicken",
    name: "BATTERED FRIED CHICKEN",
    description: "The ultimate crunch.",
    price: 0,
    category: "BIRDS",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "whole", name: "WHOLE", description: "The full bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "half", name: "HALF", description: "Half the bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "drums", name: "DRUMS", description: "Play this drum with your teeth.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "breasts", name: "BREASTS", description: "Don't take your eyes off these!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "chicken-fingers", name: "CHICKEN FINGERS", description: "Juicy strips of chicken fingertips.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "birds-fried-chicken",
    name: "FRIED CHICKEN",
    description: "Go half, or go whole.",
    price: 0,
    category: "BIRDS",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "whole", name: "WHOLE", description: "The full bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "half", name: "HALF", description: "Half the bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "drums", name: "DRUMS", description: "Play this drum with your teeth.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "breasts", name: "BREASTS", description: "Don't take your eyes off these!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "birds-air-fried-turkey",
    name: "AIR-FRIED TURKEY",
    description: "He got fried because he couldn't fly.",
    price: 0,
    category: "BIRDS",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "whole", name: "WHOLE", description: "The full bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "half", name: "HALF", description: "Half the bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "drums", name: "DRUMS", description: "Fried & fit for a feast.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "thighs", name: "THIGHS", description: "Bigger thighs… Save even more lives!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "breasts", name: "BREASTS", description: "No botched breast job here!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "birds-battered-turkey",
    name: "BATTERED TURKEY",
    description: "Crispy, golden, unforgettable.",
    price: 0,
    category: "BIRDS",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "whole", name: "WHOLE", description: "The full bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "half", name: "HALF", description: "Half the bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "drums", name: "DRUMS", description: "Fried & fit for a feast.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "thighs", name: "THIGHS", description: "Bigger thighs… Save even more lives!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "breasts", name: "BREASTS", description: "No botched breast job here!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "turkey-fingers", name: "TURKEY FINGERS", description: "Crispy turkey strips.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "birds-fried-turkey",
    name: "FRIED TURKEY",
    description: "He got fried because he couldn't fly.",
    price: 0,
    category: "BIRDS",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "whole", name: "WHOLE", description: "The full bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "half", name: "HALF", description: "Half the bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "drums", name: "DRUMS", description: "Fried & fit for a feast.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "thighs", name: "THIGHS", description: "Bigger thighs… Save even more lives!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "breasts", name: "BREASTS", description: "No botched breast job here!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },

  // ==================== SEAFOOD ====================
  {
    id: "seafood",
    name: "SEAFOOD",
    description: "Fresh from the ocean, seasoned to perfection.",
    price: 0,
    category: "SEAFOOD",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "fried-snapper", name: "FRIED SNAPPER", description: "Battered but unbeatable!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "sautéed-snapper", name: "SAUTÉED SNAPPER", description: "Fresh fillet, fired for full flavor!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "steamed-snapper", name: "STEAMED SNAPPER", description: "Swimming in seasoning.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "sautéed-sablefish", name: "SAUTÉED SABLEFISH", description: "Fresh fillet, fired for full flavor!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "sautéed-salmon", name: "SAUTÉED SALMON", description: "From sea to seasoned.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "steamed-salmon", name: "STEAMED SALMON", description: "Hot steam, upstream!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "sautéed-king-salmon", name: "SAUTÉED KING SALMON", description: "Seafood royalty.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "sautéed-chilean-sea-bass", name: "SAUTÉED CHILEAN SEA BASS", description: "The Ferrari of fish!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "fried-prawns", name: "FRIED PRAWNS", description: "Prawns big enough to be a pet!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "citrus-shrimp", name: "CITRUS SHRIMP", description: "Sautéed, seasoned, & satisfying.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "steamed-crab-legs", name: "STEAMED CRAB LEGS", description: "Cleaned & steamed… So get crackin'!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "boiled-crab-legs", name: "BOILED CRAB LEGS", description: "A boil in a bag!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "steamed-king-crab-legs", name: "STEAMED KING CRAB LEGS", description: "All shell the King!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "boiled-king-crab-legs", name: "BOILED KING CRAB LEGS", description: "A boil fit for a king!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },

  // ==================== FRIED SIDES ====================
  {
    id: "fried-sides-fries",
    name: "FRIES",
    description: "Fried potatoes, not some science experiment.",
    price: 0,
    category: "FRIED SIDES",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "fries", name: "FRIES", description: "Fried potatoes, not some science experiment.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "curlies", name: "CURLIES", description: "You can almost never order enough curly fries… But you can try!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "wedges", name: "WEDGES", description: "A seasoned potato, fried, fluffy, & flavorful.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "zu-fries", name: "ZU: FRIES", description: "Zucchini has entered the chat.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "zu-curlies", name: "ZU: CURLIES", description: "Zucchini with a twist! Literally…", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "fried-sides-popcorn",
    name: "POPCORN BITES",
    description: "Bite-sized bite, big-time flavor!",
    price: 0,
    category: "FRIED SIDES",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "popcorn-chicken", name: "POPCORN CHICKEN", description: "Eat treat. Repeat!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "popcorn-shrimp", name: "POPCORN SHRIMP", description: "Bite-sized bite, big-time flavor!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "flower-bites", name: "FLOWER BITES", description: "Popcorn cauliflower bites.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },

  // ==================== LATIN AMERICA ====================
  {
    id: "latin-america-tacos",
    name: "TACOS",
    description: "Just a corn tortilla, put stuff in it.",
    price: 0,
    category: "LATIN AMERICA",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "taco", name: "TACO", description: "Just a corn tortilla, put stuff in it.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "taco-trio", name: "TACO TRIO", description: "Customize these 3 amigos.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "taco-pack", name: "TACO PACK", description: "Add 3 groups to customize.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "taco-party", name: "TACO PARTY", description: "Add 4 groups to customize.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "taco-party-fiesta-grande", name: "TACO PARTY: FIESTA GRANDE", description: "Add 5 groups to customize.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },

  // ==================== VEGGIES ====================
  {
    id: "veggies",
    name: "VEGGIES",
    description: "They enjoy a hot sauna too!",
    price: 0,
    category: "VEGGIES",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "sautéed", name: "SAUTÉED VEGGIES", description: "Tossed & turned because it was too hot.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "steamed", name: "STEAMED VEGGIES", description: "They enjoy a hot sauna too!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },

  // ==================== FLAMED ====================
  {
    id: "flamed-big-beef",
    name: "BIG BEEF",
    description: "The cow jumped over the moon… & landed right on the grill!",
    price: 0,
    category: "FLAMED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "tri-tip-roast", name: "TRI-TIP ROAST", description: "Juicy, smoky, carved to perfection.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "tomahawk-steak", name: "TOMAHAWK STEAK", description: "Your appetite is axing for it!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "flamed-ribs",
    name: "RIBS",
    description: "Order some replacement ribs, just in case…",
    price: 0,
    category: "FLAMED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "short-ribs", name: "SHORT RIBS", description: "Thick, meaty, flame-kissed.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "flanken-strips", name: "FLANKEN RIBS", description: "Thin-cut, flame-seared perfection.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "flamed-chicken",
    name: "CHICKEN",
    description: "Check out these hot…",
    price: 0,
    category: "FLAMED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "spatchcock", name: "SPATCHCOCK", description: "Butterflied & flame-cooked.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "half", name: "HALF", description: "Half a bird, flame-grilled.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "drums", name: "DRUMS", description: "Hatched from real eggs.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "breasts", name: "BREASTS", description: "Check out these hot…", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "flamed-snapper",
    name: "SNAPPER",
    description: "Hot fish… Hot dish!",
    price: 0,
    category: "FLAMED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "whole-snapper", name: "WHOLE", description: "Whole fish, flame-kissed.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "fillet", name: "FILLET", description: "Fresh fillet, fired for full flavor!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "flamed-sausage",
    name: "SAUSAGE",
    description: "Hot…Dogs.",
    price: 0,
    category: "FLAMED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "hot-dog", name: "HOT DOG", description: "Get busy on this glizzy…", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "link", name: "LINK", description: "Classic link sausage.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "submarine", name: "SUBMARINE", description: "Go long… Go deep!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "flamed-veggies",
    name: "VEGGIES",
    description: "Build your own veggie meal, fresh off the grill.",
    price: 0,
    category: "FLAMED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "course-cut", name: "COURSE", description: "Nearly whole vegetables like long carrots, asparagus, & onion slices.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "cut", name: "CUT", description: "Small cuts of asparagus, chopped onions, & diced peppers.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "flamed-baked-potato",
    name: "BAKED POTATO",
    description: "This is no side dish!",
    price: 0,
    category: "FLAMED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "standard", name: "STANDARD", description: "Flame-baked perfection.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "hasselback", name: "HASSELBACK", description: "The fancy, flame-baked cut.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "flamed-stuffed-pepper",
    name: "STUFFED PEPPER",
    description: "This pepper is waiting to be loaded!",
    price: 0,
    category: "FLAMED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "bell", name: "BELL", description: "A loaded bell pepper.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "jalapeño", name: "JALAPEÑO", description: "A spicy, loaded jalapeño.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },

  // ==================== BRAISED ====================
  {
    id: "braised-short-ribs",
    name: "SHORT RIBS",
    description: "These ribs never fall short.",
    price: 0,
    category: "BRAISED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [],
    addOns: [],
  },

  // ==================== SMOKED ====================
  {
    id: "smoked-ribs",
    name: "RIBS",
    description: "No stripped-down flavor on these strips!",
    price: 0,
    category: "SMOKED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "short-ribs", name: "SHORT RIBS", description: "CAUTION: They may become boneless!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "flanken-ribs", name: "FLANKEN RIBS", description: "No stripped-down flavor on these strips!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "smoked-goat-lamb",
    name: "GOAT/LAMB",
    description: "The other red meats.",
    price: 0,
    category: "SMOKED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "chunks", name: "CHUNKS", description: "The goat of goats!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "smoked-chicken",
    name: "CHICKEN",
    description: "From halves to hens.",
    price: 0,
    category: "SMOKED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "spatchcock", name: "SPATCHCOCK", description: "Butterflied & smoked.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "half", name: "HALF", description: "Half a bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "drums", name: "DRUMS", description: "Smoked to perfection.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "breasts", name: "BREASTS", description: "Don't take your eyes off these!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
    ],
    addOns: [],
  },
  {
    id: "smoked-turkey",
    name: "TURKEY",
    description: "Be thankful for this bird!",
    price: 0,
    category: "SMOKED",
    image: "PLACEHOLDER_IMAGE_URL",
    subMenu: [
      { id: "spatchcock", name: "SPATCHCOCK", description: "Butterflied & smoked.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "half", name: "HALF", description: "Half a bird.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "drums", name: "DRUMS", description: "Smoked to perfection.", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "breasts", name: "BREASTS", description: "Don't take your eyes off these!", image: "PLACEHOLDER_IMAGE_URL", price: 0 },
      { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "PLACEHOLDER_IMAGE_URL", price: 0 }
    ],
    addOns: [],
  },
];