// app/menuData.ts

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  subMenu: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const FOOD_MENU_ITEMS: MenuItem[] = [
  // ==================== BREAKFAST ====================
  { id: "breakfast-eggs", name: "EGGS", description: "The incredible, edible egg...", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-eggs.png", subMenu: [
    { id: "eggs-boiled", name: "BOILED", description: "The quickest meal of the day…", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-eggs-boiled-egg.png" },
    { id: "eggs-fried", name: "FRIED", description: "How far will you let the yolk run?", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-eggs-fried-egg%20.png" },
    { id: "eggs-scrambled", name: "SCRAMBLED", description: "No need to scramble, unless it's eggs…", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-eggs-scrambled-eggs.png" },
    { id: "eggs-omelette", name: "OMELLETTE", description: "Start with eggs, end with eggstasy.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-eggs-omelette.png" },
    { id: "eggs-omelette-pockets", name: "OMELLETTE POCKETS", description: "Omelettes on the go!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-eggs-omelette-pockets.png" }, ]},
  { id: "breakfast-griddle", name: "GRIDDLE", description: "The griddle's greatest ever!", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-griddle.png", subMenu: [
    { id: "french-toast", name: "FRENCH TOAST", description: "How many slices are too many?", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-french-toast.png" },
    { id: "pancakes", name: "PANCAKES", description: "Take these hotcakes on a hot date.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-pancakes.png" },
    { id: "waffles", name: "WAFFLES", description: "The gridiron's greatest ever!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-waffles.png" },
    { id: "stuffed-waffle", name: "STUFFED WAFFLE", description: "The complete breakfast, in a waffle.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-stuffed-waffle.png" }, ]},
  { id: "breakfast-meats", name: "MEATS", description: "Pick your type & flavor…", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-meats.png", subMenu: [
    { id: "bacon", name: "BACON", description: "Meat… NOT fat…", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-meats-bacon.png" },
    { id: "breakfast-sausage", name: "SAUSAGE", description: "Pick your type & flavor…", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-meats-sausage.png" },
    { id: "breakfast-sausage-patty", name: "SAUSAGE PATTY", description: "Classic, hearty, and savory.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-meats-sausage-patty.png" }, ]},
  { id: "breakfast-potatoes", name: "POTATOES", description: "Pick your type & flavor…", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-potatoes.png", subMenu: [
    { id: "chunks", name: "CHUNKS", description: "Hearty, crispy breakfast potatoes.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-potato-chunks.png" },
    { id: "diced", name: "DICED", description: "Small, golden fried potato bites.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-potatoes-diced.png" },
    { id: "hash-brown", name: "HASH BROWN PATTY", description: "The crispy, classic breakfast side.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-hash-brown-patty.png" }, ]},
  { id: "breakfast-breads", name: "BREADS", description: "Toast? Muffins? The universal breakfast staple…", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-breads.png", subMenu: [
    { id: "toast", name: "TOAST", description: "Crisp, golden, and ready for butter.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-breads-toast.png" },
    { id: "english-muffin", name: "ENGLISH MUFFIN", description: "The classic nooks & crannies.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-breads-english-muffin.png" },
    { id: "biscuit", name: "BISCUIT", description: "Fluffy, buttery, and irresistible.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-breads-biscuit.png" },
    { id: "muffin", name: "MUFFIN", description: "A baked breakfast staple.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-breads-muffin.png" }, ]},
  { id: "breakfast-sandwiches", name: "BREAKFAST SANDWICHES", description: "The ultimate breakfast on the go.", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-sandwiches-2.png", subMenu: [
    { id: "breakfast-sandwich-club", name: "CLUB-STYLE", description: "Stacked high with all the fixings.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-sandwiches-club.png" },
    { id: "breakfast-sandwich-muffin", name: "MUFFIN-STYLE", description: "A breakfast classic, stacked between a muffin.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-sandwiches-muffin-2.png" }, ]},
  { id: "breakfast-fried-steak", name: "FRIED STEAK", description: "If it ain't fried, it ain't right!", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-fried-steak.png", subMenu: [
    { id: "fried-steak-beef", name: "BEEF", description: "A hearty, classic breakfast steak.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-fried-steak-beef.png" },
    { id: "fried-steak-chicken", name: "CHICKEN", description: "A lighter, crispy breakfast steak.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-fried-steak-chicken.png" }, ]},
  { id: "breakfast-burrito", name: "BREAKFAST BURRITO", description: "Breakfast in a burrito.", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-breakfast-burrito.png", subMenu: [] },
  { id: "breakfast-yogurt", name: "YOGURT", description: "Your yogurt, your way…", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-yogurt.png", subMenu: [] },
  { id: "breakfast-whole-fruit", name: "WHOLE FRUIT", description: "The freshest start to your day.", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-whole-fruit.png", subMenu: [
    { id: "apple", name: "APPLE", description: "Crisp & refreshing.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-whole-fruit-apples.png" },
    { id: "banana", name: "BANANA", description: "Sweet & filling.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-whole-fruit-banana.png" },
    { id: "blueberries", name: "BLUEBERRIES", description: "Packed with antioxidants.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-whole-fruit-blueberries.png" },
    { id: "boysenberries", name: "BOYSENBERRIES", description: "Sweet & tangy.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-whole-fruit-boysenberries.png" },
    { id: "orange", name: "ORANGE", description: "Bright & juicy.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-whole-fruit-orange.png" },
    { id: "strawberries", name: "STRAWBERRIES", description: "Sweet & ripe.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-whole-fruit-strawberries.png" }, ]},

  // ==================== SANDWICHES ====================
  { id: "savory-stuffed-waffle", name: "SAVORY STUFFED WAFFLE", description: "We definitely skipped breakfast.", category: "SANDWICHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-savory-stuffed-waffle.png", subMenu: [] },
  { id: "sandwich-club", name: "CLUB", description: "Build your own club sandwich.", category: "SANDWICHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-club.png", subMenu: [
    { id: "club-sandwich", name: "CLUB SANDWICH", description: "Build your own club sandwich.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/Sandwiches-club-club-sandwich.png" },
    { id: "double-decker", name: "DOUBLE-DECKER", description: "Twice the flavor, stacked to the sky.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-club-double-decker.png" }, ]},
  { id: "sandwich-hoagie", name: "HOAGIE", description: "Build your own hoagie.", category: "SANDWICHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-hoagie.png", subMenu: [
    { id: "half-hoagie", name: "HALF", description: "Half the size, all the flavor.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-hoagie-half.png" },
    { id: "submarine", name: "SUBMARINE", description: "The full-sized classic.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-hoagie-submarine.png" }, ]},
  { id: "sandwich-pressed", name: "PRESSED", description: "All warm & toasty.", category: "SANDWICHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-club-pressed.png", subMenu: [
    { id: "grilled-cheese", name: "GRILLED CHEESE", description: "Build your own grilled cheese sandwich.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "panini", name: "PANINI", description: "All warm & toasty.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-club-panini.png" }, ]},
  { id: "sandwich-sausages", name: "SAUSAGES", description: "Pig out, without the pig!", category: "SANDWICHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-sausages.png", subMenu: [
    { id: "hot-dog", name: "HOT DOG", description: "Get busy on this glizzy…", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-hot-dog.png" },
    { id: "link", name: "LINK", description: "Classic link sausage.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-sausages-link.png" },
    { id: "submarine-sandwich", name: "SUBMARINE", description: "Go long… Go deep!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-sausages-submarine-sausage.png" }, ]},
  { id: "sandwich-burgers", name: "BURGERS", description: "Build your burger from the bun up.", category: "SANDWICHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-burgers.jpg", subMenu: [
    { id: "burger", name: "BURGER", description: "Build your burger from the bun up.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-burgers-burger.png" },
    { id: "sliders", name: "SLIDERS", description: "Smaller burgers built on rolls.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sandwiches/sandwiches-burgers-sliders.png" }, ]},

    // ==================== BIRDS ====================
    { id: "birds-fried-chicken", name: "FRIED CHICKEN", description: "Go half, or go whole.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "The full bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-whole.png" },
    { id: "half", name: "HALF", description: "Half the bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-half.png" },
    { id: "drum", name: "DRUM", description: "Play this drum with your teeth.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-drum.png" },
    { id: "thigh", name: "THIGH", description: "These thighs can run, but they can't fly!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-thigh.png" },
    { id: "breast", name: "BREAST", description: "Don't take your eyes off these!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-breast.png" },
    { id: "wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-wings.png" }, ]},
    { id: "birds-fried-turkey", name: "FRIED TURKEY", description: "He got fried because he couldn't fly.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "The full bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey-whole.png" },
    { id: "drum", name: "DRUM", description: "Fried & fit for a feast.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey-drum.png" },
    { id: "thigh", name: "THIGH", description: "Bigger thighs… Save even more lives!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey-thigh.png" },
    { id: "breast", name: "BREAST", description: "No botched breast job here!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey-breast.png" },
    { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey-wings2.png" }, ]},
  { id: "birds-stuffed-breasts", name: "STUFFED BREASTS", description: "Stuffed to perfection.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-stuffed-breasts.png", subMenu: [
    { id: "stuffed-chicken", name: "CHICKEN", description: "Stuffed chicken breast.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-stuffed-breasts-chicken.png" },
    { id: "stuffed-turkey", name: "TURKEY", description: "Stuffed turkey breast.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-stuffed-breasts-turkey.png" }, ]},
 
    // ==================== SEAFOOD ====================
  { id: "seafood-snapper", name: "SNAPPER", description: "Hot fish… Hot dish!", category: "SEAFOOD", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-snapper.png", subMenu: [
    { id: "battered", name: "BATTERED", description: "Battered but unbeatable!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-snapper-battered.png" },
    { id: "sauteed", name: "SAUTÉED", description: "Fresh fillet, fired for full flavor!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-snapper-sauteed.png" },
    { id: "steamed", name: "STEAMED", description: "Swimming in seasoning.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-snapper-steamed.png" }, ]},
  { id: "seafood-salmon", name: "SALMON", description: "From sea to seasoned.", category: "SEAFOOD", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-salmon-2.png", subMenu: [
    { id: "sauteed", name: "SAUTÉED", description: "From sea to seasoned.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-salmon-sauteed.png" },
    { id: "steamed", name: "STEAMED", description: "Hot steam, upstream!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-salmon-steamed.png" }, ]},
  { id: "seafood-crab-legs", name: "CRAB LEGS", description: "Cleaned & steamed… So get crackin'!", category: "SEAFOOD", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-crab-legs-2.png", subMenu: [
    { id: "dungeness", name: "DUNGENESS", description: "A boil in a bag!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-crab-legs-boiled.png" },
    { id: "snow", name: "SNOW", description: "Cleaned & steamed… So get crackin'!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-crab-legs-snow.png" },
    { id: "king", name: "KING", description: "All shell the King!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-crab-legs-king.png" }, ]},
  { id: "seafood-lobster-tails", name: "LOBSTER TAILS", description: "Broiled to perfection.", category: "SEAFOOD", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-lobster-tails.png", subMenu: [
    { id: "broiled", name: "BROILED", description: "Broiled to perfection.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-lobster-tails-broiled.png" },
    { id: "steamed", name: "STEAMED", description: "Steamed to perfection.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-lobster-tails-steamed.png" },
    { id: "deluxe", name: "DELUXE", description: "The ultimate lobster experience.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-lobster-tails-deluxe.png" }, ]},
  { id: "seafood-shrimp", name: "SHRIMP", description: "Every tail tells a tale…", category: "SEAFOOD", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-shrimp.png", subMenu: [
    { id: "citrus", name: "CITRUS", description: "Sautéed, seasoned, & satisfying.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-shrimp-citrus.png" },
    { id: "battered", name: "BATTERED", description: "Prawns big enough to be a pet!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-shrimp-battered.png" },
    { id: "sauteed", name: "SAUTÉED", description: "Sautéed, seasoned, & satisfying.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-shrimp-sauteed.png" },
    { id: "steamed", name: "STEAMED", description: "Sautéed, seasoned, & satisfying.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-shrimp-steamed.png" }, ]},

  // ==================== FRIED SIDES ====================
  { id: "fried-sides-fries", name: "FRIES", description: "Fried potatoes, not some science experiment.", category: "FRIED SIDES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-fries.png", subMenu: [
    { id: "fries-potato", name: "FRIES", description: "Fried potatoes, not some science experiment.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-fries-potato.png" },
    { id: "fries-curlies", name: "CURLIES", description: "You can almost never order enough curly fries… But you can try!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-fries-curlies.png" },
    { id: "fries-wedges", name: "WEDGES", description: "A seasoned potato, fried, fluffy, & flavorful.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-fries-wedges.png" },
    { id: "fries-zu-fries", name: "ZU-FRIES", description: "Zucchini has entered the chat.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-fries-zu-fries.png" },
    { id: "fries-zu-curlies", name: "ZU-CURLIES", description: "Zucchini with a twist! Literally…", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-fries-zu-curlies.png" }, ]},
  { id: "fried-sides-popcorn-bites", name: "POPCORN BITES", description: "Bite-sized bite, big-time flavor!", category: "FRIED SIDES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-popcorn-bites.png", subMenu: [
    { id: "popcorn-chicken", name: "POPCORN CHICKEN", description: "Eat treat. Repeat!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-popcorn-bites-chicken.png" },
    { id: "popcorn-shrimp", name: "POPCORN SHRIMP", description: "Bite-sized bite, big-time flavor!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-popcorn-bites-shrimp.png" },
    { id: "popcorn-flower", name: "FLOWER BITES", description: "Popcorn cauliflower bites.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-popcorn-bites-flower.png" }, ]},
  { id: "fried-sides-onions", name: "ONIONS", description: "They will have you crying for more!", category: "FRIED SIDES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-onions.png", subMenu: [
    { id: "onions-blossom", name: "BLOSSOM", description: "The ultimate onion experience.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-onions-blossom.png" },
    { id: "onions-rings", name: "RINGS", description: "Battered & seasoned onion slices.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-onions-rings.png" }, ]},
  { id: "fried-sides-jalapeno-poppers", name: "JALAPENO POPPERS", description: "Breaded jalapeños full of gooey goodness.", category: "FRIED SIDES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/fried-sides/fried-sides-jalapeno-poppers.png", subMenu: [] },

  // ==================== LATIN AMERICA ====================
  { id: "latin-america-burrito", name: "BURRITO", description: "Not a lil donkey!", category: "LATIN AMERICA", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/latin-america/latin-america-burrito.png", subMenu: [] },
  { id: "latin-america-quesadilla", name: "QUESADILLA", description: "A grilled cheese tortilla sandwich.", category: "LATIN AMERICA", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/latin-america/latin-america-quesadilla.png", subMenu: [] },
  { id: "latin-america-enchiladas", name: "ENCHILADAS", description: "Add 5 groups to customize.", category: "LATIN AMERICA", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/latin-america/latin-america-enchiladas.png", subMenu: [] },
  { id: "latin-america-tacos", name: "TACOS", description: "Just a corn tortilla, put stuff in it.", category: "LATIN AMERICA", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/latin-america/latin-america-tacos.png", subMenu: [
    { id: "latin-taco", name: "TACO", description: "Just a corn tortilla, put stuff in it.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/latin-america/latin-america-tacos-taco.png" },
    { id: "latin-taco-trio", name: "TACO TRIO", description: "Customize these 3 amigos.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/latin-america/latin-america-tacos-trio-2.png" },
    { id: "latin-taco-pack", name: "TACO PACK", description: "Add 3 groups to customize.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/latin-america/latin-america-tacos-pack.png" },
    { id: "latin-taco-party", name: "TACO PARTY", description: "Add 4 groups to customize.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/latin-america/latin-america-tacos-party-2.png" },
    { id: "latin-taco-party-fiesta-grande", name: "TACO PARTY: FIESTA GRANDE", description: "Add 5 groups to customize.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/latin-america/latin-america-tacos-fiesta-grande.png" }, ]},

    // ==================== ASIAN ====================
  { id: "chow-mein", name: "CHOW MEIN", description: "Turn noodles into something notable.", category: "ASIAN", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/asian/asian-chow-mein.png", subMenu: [] },
  { id: "stir-fry", name: "STIR-FRY", description: "Build your bowl, a full side serving of veggies.", category: "ASIAN", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/asian/asian-stir-fry-veggies.png", subMenu: [] },
  { id: "citrus-glazed-chicken", name: "CITRUS GLAZED CHICKEN", description: "Chicken worthy of glazing.", category: "ASIAN", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/asian/asian-citrus-chicken.png", subMenu: [] },
  { id: "wonton-roll", name: "WONTON ROLL", description: "Thin, crispy, goodness!", category: "ASIAN", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/asian/asian-wonton-roll.png", subMenu: [] },

  // ==================== BEEF ====================
  { id: "beef-steaks", name: "STEAKS", description: "A good cut, for a full gut.", category: "BEEF", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/beef/beef-steaks.png", subMenu: [
    { id: "beef-battered", name: "BATTERED", description: "Battered to perfection.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/beef/beef-steaks-battered.png" },
    { id: "beef-ribeye", name: "RIBEYE", description: "A good cut, for a full gut.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/beef/beef-steaks-ribeye.png" },
    { id: "beef-chunks", name: "CHUNKS", description: "Hearty chunks of beef.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/beef/beef-steaks-chunks.png" }, ]},

    // ==================== SIDES ====================
  { id: "sides-noodles", name: "NOODLES", description: "The perfect comfort food.", category: "SIDES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sides/sides-noodles.png", subMenu: [
    { id: "sides-mac", name: "MAC & CHEESE", description: "Whether you choose dairy or not, your stomach will thank you!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sides/sides-noodles-mac-&-cheese.png" },
    { id: "sides-alfredo", name: "ALFREDO", description: "Alfredo is life with the dull bits cut out.” - Hitchcock", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sides/sides-noodles-alfredo.png" },
    { id: "sides-garlic", name: "GARLIC NOODLES", description: "Vampires beware!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sides/sides-noodles-garlic.png" }, ]},
  { id: "sides-rice", name: "RICE", description: "20,000 years of deliciousness!", category: "SIDES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sides/sides-rice.png", subMenu: [] },
  { id: "sides-fresh-fruit-cup", name: "FRESH FRUIT CUP", description: "No forbidden fruits here!", category: "SIDES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/sides/sides-fresh-fruit-cup-2.png", subMenu: [] },

    // ==================== VEGGIES ====================
  { id: "veggies-salad", name: "SALAD", description: "Create like Cardini.", category: "VEGGIES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/veggies/veggies-salad.png", subMenu: [
    { id: "veggies-salad-garden", name: "GARDEN", description: "A fresh, crisp classic.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/veggies/veggies-salad-garden.png" },
    { id: "veggies-salad-chefs", name: "CHEF'S", description: "The chef's signature salad.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/veggies/veggies-salad-chefs.png" }, ]},
  { id: "veggies", name: "VEGGIES", description: "They enjoy a hot sauna too!", category: "VEGGIES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/veggies/veggies.png", subMenu: [
    { id: "veggies-sauteed", name: "SAUTÉED", description: "Tossed & turned because it was too hot.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/veggies/veggies-sauteed.png" },
    { id: "veggies-steamed", name: "STEAMED", description: "They enjoy a hot sauna too!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/veggies/veggies-steamed.png" }, ]},

    // ==================== SOUPS & STEWS ====================
  { id: "soups", name: "SOUP", description: "Create a beautiful bowl!", category: "SOUPS & STEWS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-soup-1.png", subMenu: [
    { id: "soups-hot-pot", name: "HOT POT", description: "A rich and comforting bowl.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-soup-hot-pot-soup.png" },
    { id: "soups-noodle", name: "NOODLE", description: "A hearty noodle classic.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-soup-noodle-soup.png" },
    { id: "soups-ramen", name: "RAMEN", description: "A flavorful, rich ramen bowl.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-soup-ramen.png" }, ]},
  { id: "soups-stew", name: "STEW", description: "Create a beautiful bowl!", category: "SOUPS & STEWS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-stew.png", subMenu: [
    { id: "soups-stew-gumbo", name: "GUMBO", description: "A bold, flavorful stew.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-stew-gumbo.png" },
    { id: "soups-stew-stew", name: "STEW", description: "Slow-simmered and hearty.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-stew-stew.png" }, ]},
  { id: "soups-chili", name: "CHILI", description: "Fresh or fast, make it last…", category: "SOUPS & STEWS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-stew-chili.png", subMenu: [
    { id: "soups-chili-quick", name: "QUICK", description: "Fresh or fast, make it last…", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-stew-chili-quick.png" },
    { id: "soups-chili-slow", name: "SLOW", description: "Slow-cooked & off the hook!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-stew-chili-slow.png" }, ]},
  { id: "soups-jambalaya", name: "JAMBALAYA", description: "A spicy, satisfying classic.", category: "SOUPS & STEWS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/soups-&-stews/soups-&-stews-jambalaya.png", subMenu: [] },

    // ==================== JR. DISHES ====================
  { id: "jr-hot-dog", name: "HOT DOG", description: "Your favorite dog!", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-hot-dog.png", subMenu: [] },
  { id: "jr-burger", name: "JR. BURGER", description: "A quarter-pound of fun in a bun.", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-jr-burger.png", subMenu: [] },
  { id: "jr-grilled-cheese", name: "GRILLED CHEESE SANDWICH", description: "Classic grilled sandwich on white bread.", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-grilled-cheese-sandwich.png", subMenu: [] },
  { id: "jr-chicken-fingers", name: "CHICKEN FINGERS", description: "A few fingers for a few fingers.", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-chicken-fingers.png", subMenu: [] },
  { id: "jr-fries", name: "JR. FRIES", description: "A must-order!", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-fries.png", subMenu: [] },
  { id: "jr-curlies", name: "JR. CURLIES", description: "A curl cut above the rest!", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-curlies.png", subMenu: [] },
  { id: "jr-quesadilla", name: "JR. QUESADILLA", description: "Try these triangles at different angles!", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-jr-quesadillas.png", subMenu: [] },
  { id: "jr-soft-taco", name: "SOFT TACO", description: "A taco dressed like a burrito, so you won't be dressed like a taco!", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-soft-taco.png", subMenu: [] },
  { id: "jr-mac-cheese", name: "JR. MAC & CHEESE", description: "A lil mac'n never hurt nobody.", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-mac-n-cheese.png", subMenu: [] },
  { id: "jr-fruit-cup", name: "JR. FRUIT CUP", description: "Nature's candy.", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-fruit-cup.png", subMenu: [] },
  { id: "jr-sticks-dip", name: "STICKS & DIP", description: "Crispy sticks with your favorite dip.", category: "JR. DISHES", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/jr.-dishes/jr.-dishes-sticks-&-dip.png", subMenu: [] },

    // ==================== TREATS ====================
  { id: "treats-candied-fruit-cup", name: "CANDIED FRUIT CUP", description: "Your favorites, but sweeter!", category: "TREATS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/treats/treats-candied-fruit-cup.png", subMenu: [] },
  { id: "treats-pancake-taco", name: "PANCAKE TACO", description: "Ordering just 1, is a mistake!", category: "TREATS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/treats/treats-pancake-taco.png", subMenu: [] },
  { id: "treats-stuffed-waffle", name: "STUFFED WAFFLE", description: "A sweet treat of your creation…", category: "TREATS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/treats/treats-stuffed-waffle.png", subMenu: [] },

    // ==================== AIR-FRIED ====================
  { id: "birds-air-fried-chicken", name: "AIR-FRIED CHICKEN", description: "The most air this bird will ever get!", category: "AIR-FRIED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "The full bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken-whole.png" },
    { id: "half", name: "HALF", description: "Go half, or go home!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken-half.png" },
    { id: "thigh", name: "THIGH", description: "These thighs can run, but they can't fly!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken-thigh.png" },
    { id: "breast", name: "BREAST", description: "Don't take your eyes off these!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken-breast.png" },
    { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken-wings.png" }, ]},
  { id: "birds-air-fried-turkey", name: "AIR-FRIED TURKEY", description: "He got fried because he couldn't fly.", category: "AIR-FRIED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "The real big bird!.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-whole2.png" },
    { id: "half", name: "HALF", description: "Half a holiday feast.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-half.png" },
    { id: "drum", name: "DRUM", description: "Fried & fit for a feast.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-drum.png" },
    { id: "thigh", name: "THIGH", description: "Bigger thighs… Save even more lives!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-thigh.png" },
    { id: "breast", name: "BREAST", description: "No botched breast job here!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-breast.png" },
    { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-wings.png" }, ]},

    // ==================== FLAMED ====================
  { id: "flamed-lamb", name: "LAMB", description: "Perfect for grilling… Mary, look away!", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-lamb.png", subMenu: [] },
  { id: "flamed-shrimp", name: "SHRIMP", description: "Every tail tells a tale…", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-shrimp.png", subMenu: [] },
  { id: "flamed-burgers", name: "BURGERS", description: "Less grease, more goodness.", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-burger.png", subMenu: [] },
  { id: "flamed-eggplant", name: "EGGPLANT", description: "Craft your own loaded eggplant.", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-eggplant.png", subMenu: [] },
  { id: "flamed-baked-cabbage", name: "BAKED CABBAGE", description: "Baked, not boring.", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-baked-cabbage.png", subMenu: [] },
  { id: "flamed-big-beef", name: "BIG BEEF", description: "The cow jumped over the moon… & landed on the grill!", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-big-beef.png", subMenu: [
    { id: "flamed-tri-tip", name: "TRI-TIP", description: "Juicy, smoky, carved to perfection.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-tri-tip.png" },
    { id: "flamed-tomahawk", name: "TOMAHAWK STEAK", description: "Your appetite is axing for it!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-big-beef-tomahawk-steak.png" }, ]},
  { id: "flamed-ribs", name: "RIBS", description: "Order some replacement ribs, just in case…", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-ribs.png", subMenu: [
    { id: "flamed-short", name: "SHORT", description: "Thick, meaty, flame-kissed.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-ribs-short.png" },
    { id: "flamed-flanken", name: "FLANKEN", description: "Thin-cut, flame-seared perfection.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-ribs-flanken.png" },
    { id: "flamed-lamb-rack", name: "LAMB RACK", description: "A premium, flame-grilled rack.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-ribs-lamb-rack.png" }, ]},
  { id: "flamed-chicken", name: "CHICKEN", description: "Check out these hot…", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-chicken.png", subMenu: [
    { id: "flamed-spatchcock", name: "SPATCHCOCK", description: "Butterflied & flame-cooked.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-chicken-spatchcock-2.png" },
    { id: "flamed-half", name: "HALF", description: "Half a bird, flame-grilled.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-chicken-half.png" },
    { id: "flamed-drums", name: "DRUMS", description: "Hatched from real eggs.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-chicken-drum.png" },
    { id: "flamed-thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-chicken-thigh.png" },
    { id: "flamed-breasts", name: "BREASTS", description: "Check out these hot…", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-chicken-breast.png" },
    { id: "flamed-wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-chicken-wings.png" }, ]},
  { id: "flamed-snapper", name: "SNAPPER", description: "Hot fish… Hot dish!", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-snapper-2.png", subMenu: [
    { id: "flamed-whole", name: "WHOLE", description: "Whole fish, flame-kissed.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-snapper-whole.png" },
    { id: "flamed-fillet", name: "FILLET", description: "Fresh fillet, fired for full flavor!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-snapper-fillet.png" }, ]},
  { id: "flamed-sausages", name: "SAUSAGES", description: "Hot…Dogs.", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-sausages.png", subMenu: [
    { id: "flamed-hot-dogs", name: "HOT DOG", description: "Get busy on this glizzy…", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-sausages-hot-dogs.png" },
    { id: "flamed-link", name: "LINK", description: "Classic link sausage.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-sausages-link.png" },
    { id: "flamed-submarine", name: "SUBMARINE", description: "Go long… Go deep!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-sausages-submarine.png" }, ]},
  { id: "flamed-veggies", name: "VEGGIES", description: "Build your own veggie meal, fresh off the grill.", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-veggies.png", subMenu: [
    { id: "flamed-course", name: "COURSE", description: "Nearly whole vegetables like long carrots, asparagus, & onion slices.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-veggies-course.png" },
    { id: "flamed-cut", name: "CUT", description: "Small cuts of asparagus, chopped onions, & diced peppers.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-veggies-cut.png" },
    { id: "flamed-combo", name: "COMBO", description: "Meat… Veggies… What more could you want?!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-veggie-combo.png" }, ]},
  { id: "flamed-baked-potatoes", name: "BAKED POTATOES", description: "This is no side dish!", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-baked-potatoes.png", subMenu: [
    { id: "flamed-standard", name: "STANDARD", description: "Flame-baked perfection.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-baked-potatoes-standard.png" },
    { id: "flamed-hasselback", name: "HASSELBACK", description: "The fancy, flame-baked cut.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-baked-potatoes-hasselback-2.png" }, ]},
  { id: "flamed-stuffed-peppers", name: "STUFFED PEPPERS", description: "This pepper is waiting to be loaded!", category: "FLAMED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-stuffed-peppers.png", subMenu: [
    { id: "flamed-bell", name: "BELL", description: "A loaded bell pepper.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-stuffed-pepper.png" },
    { id: "flamed-jalapeno", name: "JALAPEÑO", description: "A spicy, loaded jalapeño.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/flamed/flamed-stuffed-peppers-jalapeno.png" }, ]},

      // ==================== BRAISED ====================
  { id: "braised-beef", name: "BEEF", description: "Big beef, cooked slow…", category: "BRAISED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/braised/braised-beef.png", subMenu: [
    { id: "braised-pot-roast", name: "POT ROAST", description: "Cooked low & slow...", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/braised/braised-pot-roast.png" },
    { id: "braised-short-ribs", name: "SHORT RIBS", description: "These ribs never fall short.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/braised/braised-short-ribs.png" },
    { id: "braised-oxtails", name: "OXTAILS", description: "These tails tell no tales, no bull!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/braised/braised-oxtails.png" }, ]},
  { id: "braised-goat-chunks", name: "GOAT CHUNKS", description: "The goat of goats!", category: "BRAISED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/braised/braised-goat-chunks.png", subMenu: [] },
  { id: "braised-lamb", name: "LAMB", description: "The other red meat, braised to perfection.", category: "BRAISED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/braised/braised-lamb.png", subMenu: [
    { id: "braised-lamb-shank", name: "SHANK", description: "Rich, tender, and fall-off-the-bone.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/braised/braised-lamb-shank.png" },
    { id: "braised-lamb-loin-chops", name: "LOIN CHOPS", description: "Tender, juicy, and full of flavor.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/braised/braised-lamb-loin-chops.png" }, ]},
  { id: "braised-chicken", name: "CHICKEN", description: "Raised from eggs to be braised.", category: "BRAISED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/braised/braised-chicken.png", subMenu: [] },
  { id: "braised-apples", name: "APPLES", description: "A sweet, braised treat.", category: "BRAISED", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/braised/braised-apples.png", subMenu: [] },

    // ==================== ROTISSERIE ====================
  { id: "rotisserie-beef", name: "BEEF", description: "Big beef, cooked slow…", category: "ROTISSERIE", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-beef.png", subMenu: [
    { id: "rotisserie-prime-rib", name: "PRIME RIB ROAST", description: "A premium cut, cooked to perfection.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-beef-prime-rib-roast.png" },
    { id: "rotisserie-beef-roast", name: "ROAST", description: "A classic beef roast, slow-cooked.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-beef-roast.png" }, ]},
  { id: "rotisserie-lamb", name: "LAMB", description: "The centerpiece of a feast!", category: "ROTISSERIE", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-lamb.png", subMenu: [
    { id: "rotisserie-lamb-leg", name: "LEG", description: "A classic, juicy leg of lamb.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-lamb-leg.png" },
    { id: "rotisserie-lamb-boneless", name: "BONELESS LEG", description: "Easy to carve, full of flavor.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-lamb-boneless-leg.png" },
    { id: "rotisserie-lamb-shank", name: "SHANK", description: "Tender, rich, and fall-off-the-bone.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-lamb-shank.png" }, ]},
  { id: "rotisserie-chicken", name: "CHICKEN", description: "Let's make this bird dizzy…", category: "ROTISSERIE", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-chicken.png", subMenu: [
    { id: "rotisserie-chicken-whole", name: "WHOLE", description: "The full bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-chicken-whole.png" },
    { id: "rotisserie-chicken-half", name: "HALF", description: "Half the bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-chicken-half-2.png" },
    { id: "rotisserie-chicken-hen", name: "HEN", description: "A smaller, tender bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-chicken-hen.png" }, ]},
  { id: "rotisserie-turkey", name: "TURKEY", description: "Holiday flavor, any day!", category: "ROTISSERIE", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-turkey.png", subMenu: [
    { id: "rotisserie-turkey-whole", name: "WHOLE", description: "The full bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-turkey-whole.png" },
    { id: "rotisserie-turkey-half", name: "HALF", description: "Half the bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-turkey-half.png" }, ]},
  { id: "rotisserie-fish", name: "FISH", description: "Swimming in the ring of fire!", category: "ROTISSERIE", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-fish.png", subMenu: [
    { id: "rotisserie-fish-whole", name: "WHOLE", description: "Whole fish, perfectly cooked.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-fish-whole.png" },
    { id: "rotisserie-fish-fillet", name: "FILLET", description: "A perfectly cooked fillet.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-fish-fillet.png" }, ]},
  { id: "rotisserie-cabbage", name: "CABBAGE", description: "You gotta try this!!!", category: "ROTISSERIE", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-cabbage.png", subMenu: [] },
  { id: "rotisserie-pineapple", name: "PINEAPPLE", description: "Topped w/ cinnamon. What a treat!", category: "ROTISSERIE", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-pineapple.png", subMenu: [] },
  { id: "rotisserie-kebabs", name: "KEBABS", description: "The original global street food.", category: "ROTISSERIE", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/rotisserie/rotisserie-kebabs.png", subMenu: [] },

  // ==================== SMOKED ====================
  { id: "smoked-beef-roast", name: "BEEF ROAST", description: "Big, bold, & beefy.", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "smoked-tomahawk", name: "TOMAHAWK STEAK", description: "Metal axe > Wood > Smoke > Meat Axe > Hunger", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "smoked-steaks", name: "STEAKS", description: "No problems w/ this beef.", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "smoked-oxtails", name: "OXTAILS", description: "This time, fumes are going into the tail.", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "smoked-salmon-fillet", name: "SALMON FILLET", description: "Hooked & croaked… Cooked & smoked.", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "smoked-snapper", name: "SNAPPER", description: "From on the hook, to off the hook!", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "smoked-shrimp", name: "SHRIMP", description: "A pound of large shrimp.", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "smoked-ribs", name: "RIBS", description: "No stripped-down flavor on these strips!", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "short-ribs", name: "SHORT RIBS", description: "CAUTION: They may become boneless!", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "flanken-ribs", name: "FLANKEN RIBS", description: "No stripped-down flavor on these strips!", image: "PLACEHOLDER_IMAGE_URL" }, ]},
  { id: "smoked-goat-lamb", name: "GOAT/LAMB", description: "The other red meats.", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "chunks", name: "CHUNKS", description: "The goat of goats!", image: "PLACEHOLDER_IMAGE_URL" }, ]},
  { id: "smoked-chicken", name: "CHICKEN", description: "From halves to hens.", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "spatchcock", name: "SPATCHCOCK", description: "Butterflied & smoked.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "half", name: "HALF", description: "Half a bird.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "drums", name: "DRUMS", description: "Smoked to perfection.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "breasts", name: "BREASTS", description: "Don't take your eyes off these!", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "PLACEHOLDER_IMAGE_URL" }, ]},
  { id: "smoked-turkey", name: "TURKEY", description: "Be thankful for this bird!", category: "SMOKED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "spatchcock", name: "SPATCHCOCK", description: "Butterflied & smoked.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "half", name: "HALF", description: "Half a bird.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "drums", name: "DRUMS", description: "Smoked to perfection.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "breasts", name: "BREASTS", description: "Don't take your eyes off these!", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "PLACEHOLDER_IMAGE_URL" }, ]},

  // ==================== BEVERAGES ====================
  { id: "spring-water", name: "SPRING WATER", description: "Cool & refreshing.", category: "BEVERAGES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "lemonade", name: "LEMONADE", description: "Lemon & honey infused spring water.", category: "BEVERAGES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "dirty-limeade", name: "DIRTY LIMEADE", description: "Honey & cinnamon infused lime & peach juice..", category: "BEVERAGES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
];