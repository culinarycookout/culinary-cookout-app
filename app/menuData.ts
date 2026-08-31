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
  { id: "breakfast-burrito", name: "BREAKFAST BURRITO", description: "Breakfast in a burrito.", category: "BREAKFAST", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/breakfast/breakfast-breakfast-burrito%20(1).png", subMenu: [] },
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
  { id: "birds-air-fried-chicken", name: "AIR-FRIED CHICKEN", description: "Go half, or go whole.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "The full bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken-whole.png" },
    { id: "half", name: "HALF", description: "Half the bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken-half.png" },
    { id: "thigh", name: "THIGH", description: "These thighs can run, but they can't fly!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken-thigh.png" },
    { id: "breast", name: "BREAST", description: "Don't take your eyes off these!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken-breast.png" }, ]},
  { id: "birds-air-fried-chicken-wings", name: "AIR-FRIED CHICKEN WINGS", description: "Don't let these wings fly far.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-chicken-wings.png", subMenu: [] },
  { id: "birds-fried-chicken", name: "FRIED CHICKEN", description: "Go half, or go whole.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "The full bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-whole.png" },
    { id: "half", name: "HALF", description: "Half the bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-half.png" },
    { id: "drum", name: "DRUM", description: "Play this drum with your teeth.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-drum.png" },
    { id: "thigh", name: "THIGH", description: "These thighs can run, but they can't fly!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-thigh.png" },
    { id: "breast", name: "BREAST", description: "Don't take your eyes off these!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-breast.png" }, ]},
  { id: "birds-fried-chicken-wings", name: "FRIED CHICKEN WINGS", description: "Want some hot wings?… No, literally!", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-chicken-wings.png", subMenu: [] },
  { id: "birds-air-fried-turkey", name: "AIR-FRIED TURKEY", description: "He got fried because he couldn't fly.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "The full bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-whole2.png" },
    { id: "half", name: "HALF", description: "Half the bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-half.png" },
    { id: "drum", name: "DRUM", description: "Fried & fit for a feast.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-drum.png" },
    { id: "thigh", name: "THIGH", description: "Bigger thighs… Save even more lives!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-thigh.png" },
    { id: "breast", name: "BREAST", description: "No botched breast job here!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-breast.png" }, ]},
  { id: "birds-air-fried-turkey-wings", name: "AIR-FRIED TURKEY WINGS", description: "Don't let these wings fly far.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-air-fried-turkey-wings.png", subMenu: [] },
  { id: "birds-fried-turkey", name: "FRIED TURKEY", description: "He got fried because he couldn't fly.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "The full bird.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey-whole.png" },
    { id: "drum", name: "DRUM", description: "Fried & fit for a feast.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey-drum.png" },
    { id: "thigh", name: "THIGH", description: "Bigger thighs… Save even more lives!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey-thigh.png" },
    { id: "breast", name: "BREAST", description: "No botched breast job here!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey-breast.png" }, ]},
  { id: "birds-fried-turkey-wings", name: "FRIED TURKEY WINGS", description: "Don't let these wings fly far.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-fried-turkey-wings2.png", subMenu: [] },
  { id: "birds-stuffed-breasts", name: "STUFFED BREASTS", description: "Stuffed to perfection.", category: "BIRDS", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-stuffed-breasts.png", subMenu: [
    { id: "stuffed-chicken", name: "CHICKEN", description: "Stuffed chicken breast.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-stuffed-breasts-chicken.png" },
    { id: "stuffed-turkey", name: "TURKEY", description: "Stuffed turkey breast.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/birds/birds-stuffed-breasts-turkey.png" }, ]},
  // ==================== SEAFOOD ====================
  { id: "seafood-snapper", name: "SNAPPER", description: "Hot fish… Hot dish!", category: "SEAFOOD", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-snapper.png", subMenu: [
    { id: "battered", name: "BATTERED", description: "Battered but unbeatable!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-snapper-battered.png" },
    { id: "sauteed", name: "SAUTÉED", description: "Fresh fillet, fired for full flavor!", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-snapper-sauteed.png" },
    { id: "steamed", name: "STEAMED", description: "Swimming in seasoning.", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-snapper-steamed.png" }, ]},
  { id: "seafood-salmon", name: "SALMON", description: "From sea to seasoned.", category: "SEAFOOD", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-salmon.png", subMenu: [
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
  { id: "sauteed-sablefish", name: "SAUTÉED SABLEFISH", description: "Fresh fillet, fired for full flavor!", category: "SEAFOOD", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-sauteed-sablefish.png", subMenu: [] },
  { id: "sauteed-chilean-sea-bass", name: "SAUTÉED CHILEAN SEA BASS", description: "The Ferrari of fish!", category: "SEAFOOD", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/seafood/seafood-sauteed-chilean-sea-bass.png", subMenu: [] },

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
  { id: "stir-fry-veggies", name: "STIR-FRY VEGGIES", description: "Build your bowl, a full side serving of veggies.", category: "ASIAN", image: "https://sugyjadfumovhwawpvam.supabase.co/storage/v1/object/public/menu-images/menu-items/asian/asian-stir-fry-veggies.png", subMenu: [] },
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
  { id: "salad", name: "SALAD", description: "Create like Cardini.", category: "VEGGIES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "veggies", name: "VEGGIES", description: "They enjoy a hot sauna too!", category: "VEGGIES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "sautéed", name: "SAUTÉED VEGGIES", description: "Tossed & turned because it was too hot.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "steamed", name: "STEAMED VEGGIES", description: "They enjoy a hot sauna too!", image: "PLACEHOLDER_IMAGE_URL" }, ]},

  // ==================== SOUPS & STEWS ====================
  { id: "chili", name: "CHILI", description: "Fresh or fast, make it last…", category: "SOUPS & STEWS", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "soup-stew", name: "SOUP & STEW", description: "Create a beautiful bowl!", category: "SOUPS & STEWS", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },

  // ==================== JR. DISHES ====================
  { id: "jr-hot-dog", name: "HOT DOG", description: "Your favorite dog!", category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "jr-burger", name: "JR. BURGER", description: "A quarter-pound of fun in a bun.", category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "jr-grilled-cheese", name: "GRILLED CHEESE SANDWICH", description: "Classic grilled sandwich on white bread.", category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "jr-chicken-fingers", name: "CHICKEN FINGERS", description: "A few fingers for a few fingers.", category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "jr-fries", name: "JR. FRIES", description: "A must-order!", category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "jr-curlies", name: "JR. CURLIES", description: "A curl cut above the rest!", category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "jr-quesadilla", name: "JR. QUESADILLA", description: "Try these triangles at different angles!", category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "jr-soft-taco", name: "SOFT TACO", description: "A taco dressed like a burrito, so you won't be dressed like a taco!", category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "jr-mac-cheese", name: "JR. MAC & CHEESE", description: "A lil mac'n never hurt nobody.", category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "jr-fruit-cup", name: "JR. FRUIT CUP", description: "Nature's candy.", category: "JR. DISHES", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },

  // ==================== TREATS ====================
  { id: "treats-stuffed-waffle", name: "STUFFED WAFFLE", description: "A sweet treat of your creation…", category: "TREATS", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },

    // ==================== AIR-FRIED ====================
  { id: "air-fried-chicken", name: "CHICKEN", description: "TYPE LATER", category: "AIR-FRIED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "air-fried-turkey", name: "TURKEY", description: "TYPE LATER", category: "AIR-FRIED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },

  // ==================== FLAMED ====================
  { id: "flamed-lamb", name: "LAMB", description: "Perfect for grilling… Mary, look away!", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "flamed-shrimp", name: "SHRIMP", description: "Every tail tells a tale…", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "flamed-burgers", name: "BURGERS", description: "Less grease, more goodness.", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "flamed-eggplant", name: "EGGPLANT", description: "Craft your own loaded eggplant.", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "flamed-baked-cabbage", name: "BAKED CABBAGE", description: "Baked, not boring.", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "flamed-big-beef", name: "BIG BEEF", description: "The cow jumped over the moon… & landed on the grill!", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "tri-tip-roast", name: "TRI-TIP ROAST", description: "Juicy, smoky, carved to perfection.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "tomahawk-steak", name: "TOMAHAWK STEAK", description: "Your appetite is axing for it!", image: "PLACEHOLDER_IMAGE_URL" }, ]},
  { id: "flamed-ribs", name: "RIBS", description: "Order some replacement ribs, just in case…", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "short-ribs", name: "SHORT RIBS", description: "Thick, meaty, flame-kissed.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "flanken-strips", name: "FLANKEN RIBS", description: "Thin-cut, flame-seared perfection.", image: "PLACEHOLDER_IMAGE_URL" }, ]},
  { id: "flamed-chicken", name: "CHICKEN", description: "Check out these hot…", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "spatchcock", name: "SPATCHCOCK", description: "Butterflied & flame-cooked.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "half", name: "HALF", description: "Half a bird, flame-grilled.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "drums", name: "DRUMS", description: "Hatched from real eggs.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "breasts", name: "BREASTS", description: "Check out these hot…", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "PLACEHOLDER_IMAGE_URL" }, ]},
  { id: "flamed-snapper", name: "SNAPPER", description: "Hot fish… Hot dish!", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "whole-snapper", name: "WHOLE", description: "Whole fish, flame-kissed.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "fillet", name: "FILLET", description: "Fresh fillet, fired for full flavor!", image: "PLACEHOLDER_IMAGE_URL" }, ]},
  { id: "flamed-sausage", name: "SAUSAGE", description: "Hot…Dogs.", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "hot-dog", name: "HOT DOG", description: "Get busy on this glizzy…", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "link", name: "LINK", description: "Classic link sausage.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "submarine", name: "SUBMARINE", description: "Go long… Go deep!", image: "PLACEHOLDER_IMAGE_URL" }, ]},
  { id: "flamed-veggies", name: "VEGGIES", description: "Build your own veggie meal, fresh off the grill.", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "course-cut", name: "COURSE", description: "Nearly whole vegetables like long carrots, asparagus, & onion slices.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "cut", name: "CUT", description: "Small cuts of asparagus, chopped onions, & diced peppers.", image: "PLACEHOLDER_IMAGE_URL" }, ]},
  { id: "flamed-baked-potato", name: "BAKED POTATO", description: "This is no side dish!", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "standard", name: "STANDARD", description: "Flame-baked perfection.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "hasselback", name: "HASSELBACK", description: "The fancy, flame-baked cut.", image: "PLACEHOLDER_IMAGE_URL" }, ]},
  { id: "flamed-stuffed-pepper", name: "STUFFED PEPPER", description: "This pepper is waiting to be loaded!", category: "FLAMED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [
    { id: "bell", name: "BELL", description: "A loaded bell pepper.", image: "PLACEHOLDER_IMAGE_URL" },
    { id: "jalapeño", name: "JALAPEÑO", description: "A spicy, loaded jalapeño.", image: "PLACEHOLDER_IMAGE_URL" }, ]},

  // ==================== BRAISED ====================
  { id: "braised-short-ribs", name: "SHORT RIBS", description: "These ribs never fall short.", category: "BRAISED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "braised-oxtails", name: "OXTAILS", description: "These tails tell no tales, no bull!", category: "BRAISED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "braised-goat-chunks", name: "GOAT CHUNKS", description: "The goat of goats!", category: "BRAISED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "braised-chicken", name: "CHICKEN", description: "Raised from eggs to be braised.", category: "BRAISED", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },

  // ==================== ROTISSERIE ====================
  { id: "rotisserie-beef", name: "BEEF", description: "Big beef, cooked slow…", category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "rotisserie-leg-lamb", name: "LEG OF LAMB", description: "The centerpiece of a feast!", category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "rotisserie-chicken", name: "CHICKEN", description: "Let's make this bird dizzy…", category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "rotisserie-turkey", name: "TURKEY", description: "Holiday flavor, any day!", category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "rotisserie-fish", name: "FISH", description: "Swimming in the ring of fire!", category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "rotisserie-cabbage", name: "CABBAGE", description: "You gotta try this!!!", category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "rotisserie-cauliflower", name: "CAULIFLOWER", description: "A super fire flower… Just ask Mario!", category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "rotisserie-pineapple", name: "PINEAPPLE", description: "Topped w/ cinnamon. What a treat!", category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },
  { id: "rotisserie-kebab", name: "KEBAB", description: "The original global street food.", category: "ROTISSERIE", image: "PLACEHOLDER_IMAGE_URL", subMenu: [] },

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