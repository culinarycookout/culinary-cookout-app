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
  { id: "breakfast-eggs", name: "EGGS", description: "The incredible, edible egg...", category: "BREAKFAST", image: "https://iili.io/nKUpOZv.png", subMenu: [
    { id: "eggs-boiled", name: "BOILED", description: "The quickest meal of the day…", image: "https://iili.io/nKUpV3P.png" },
    { id: "eggs-fried", name: "FRIED", description: "How far will you let the yolk run?", image: "https://iili.io/nKUpG6B.png" },
    { id: "eggs-scrambled", name: "SCRAMBLED", description: "No need to scramble, unless it's eggs…", image: "https://iili.io/nKUpwua.png" },
    { id: "eggs-omelette", name: "OMELETTE", description: "Start with eggs, end with eggstasy.", image: "https://iili.io/nKUpX8F.png" },
    { id: "eggs-omelette-pockets", name: "OMELETTE POCKETS", description: "Omelettes on the go!", image: "https://iili.io/nKUr5xe.png" }, ]},
  { id: "breakfast-griddle", name: "GRIDDLE", description: "The griddle's greatest ever!", category: "BREAKFAST", image: "https://iili.io/nKUp69n.png", subMenu: [
    { id: "french-toast", name: "FRENCH TOAST", description: "How many slices are too many?", image: "https://iili.io/nKUpknR.png" },
    { id: "pancakes", name: "PANCAKES", description: "A hot date with hotcakes.", image: "https://iili.io/n35QrFa.png" },
    { id: "waffles", name: "WAFFLES", description: "The gridiron's MVP!", image: "https://iili.io/nKUyzNa.png" },
    { id: "stuffed-waffle", name: "STUFFED WAFFLE", description: "The complete breakfast, in a waffle.", image: "https://iili.io/nIs8JNp.png" }, ]},
  { id: "breakfast-meats", name: "MEATS", description: "The first protein of the day.", category: "BREAKFAST", image: "https://iili.io/nKUpmc7.png", subMenu: [
    { id: "bacon", name: "BACON", description: "Meat… NOT fat…", image: "https://iili.io/nKUpstf.png" },
    { id: "breakfast-sausage", name: "SAUSAGE", description: "The biggest little compliment.", image: "https://iili.io/nKUptP2.png" },
    { id: "breakfast-sausage-patty", name: "SAUSAGE PATTY", description: "To meat, or not to meat...", image: "https://iili.io/nKUpQn4.png" }, ]},
  { id: "breakfast-potatoes", name: "POTATOES", description: "No potato is a poor choice... Literally!", category: "BREAKFAST", image: "https://iili.io/nKUyFMQ.png", subMenu: [
    { id: "chunks", name: "CHUNKS", description: "The hearty fill, of any meal!", image: "https://iili.io/nKUyJwb.png" },
    { id: "diced", name: "DICED", description: "Nice, diced, potato bites.", image: "https://iili.io/nKUyKPV.png" },
    { id: "hash-brown", name: "HASH BROWN PATTY", description: "Crispiness at its finest.", image: "https://iili.io/nKUpPus.png" }, ]},
  { id: "breakfast-breads", name: "BREADS", description: "Toast? Muffins? The universal breakfast staple…", category: "BREAKFAST", image: "https://iili.io/nKUtO11.png", subMenu: [
    { id: "toast", name: "TOAST", description: "It's good, no matter what!", image: "https://iili.io/nKUtVmx.png" },
    { id: "english-muffin", name: "ENGLISH MUFFIN", description: "Toasted? Warm? Honey?", image: "https://iili.io/nKUtXzQ.png" },
    { id: "biscuit", name: "BISCUIT", description: "The anytime bread!", image: "https://iili.io/nKUtjLB.png" },
    { id: "muffin", name: "MUFFIN", description: "The complete bread meal!", image: "https://iili.io/nKUthXV.png" }, ]},
  { id: "breakfast-sandwiches", name: "BREAKFAST SANDWICHES", description: "The ultimate breakfast on the go.", category: "BREAKFAST", image: "https://iili.io/nKUyoHF.png", subMenu: [
    { id: "breakfast-sandwich-club", name: "CLUB-STYLE", description: "The perfect brunch!", image: "https://iili.io/nKUyCS1.png" },
    { id: "breakfast-sandwich-muffin", name: "MUFFIN-STYLE", description: "Breakfast's best seller!", image: "https://iili.io/nKUyBcP.png" }, ]},
  { id: "breakfast-fried-steak", name: "FRIED STEAK", description: "If it ain't fried, it ain't right!", category: "BREAKFAST", image: "https://iili.io/nKUpvGp.png", subMenu: [
    { id: "fried-steak-beef", name: "BEEF", description: "Something tender to remember.", image: "https://iili.io/nKUpr8X.png" },
    { id: "fried-steak-chicken", name: "CHICKEN", description: "A crispy steak, for your breakfast plate.", image: "https://iili.io/nKUpgat.png" }, ]},
  { id: "breakfast-burrito", name: "BREAKFAST BURRITO", description: "Breakfast in a burrito.", category: "BREAKFAST", image: "https://iili.io/nKUpEGV.png", subMenu: [] },
  { id: "breakfast-yogurt", name: "YOGURT", description: "Your yogurt, your way…", category: "BREAKFAST", image: "https://iili.io/n35taXS.png", subMenu: [] },
  { id: "breakfast-whole-fruit", name: "WHOLE FRUIT", description: "The freshest start to your day.", category: "BREAKFAST", image: "https://iili.io/n35tIgs.png", subMenu: [
    { id: "apple", name: "APPLE", description: "The doctor is right, you know.", image: "https://iili.io/n35Zwfn.png" },
    { id: "banana", name: "BANANA", description: "Bliss comes in bunches.", image: "https://iili.io/n35Z4s9.png" },
    { id: "lime", name: "LIME", description: "The perfect squirt!", image: "https://iili.io/nKUyuov.png" },
    { id: "orange", name: "ORANGE", description: "Vitamin C, before vitamin D.", image: "https://iili.io/nKUyRPp.png" }, ]},

  // ==================== SANDWICHES ====================
  { id: "sandwiches-stacked", name: "STACKED", description: "The sandwich you know & love!", category: "SANDWICHES", image: "https://iili.io/nK6NGxs.png", subMenu: [
    { id: "classic-sandwich", name: "CLASSIC", description: "Fresh fuel.", image: "https://iili.io/nfXUAXf.png" },
    { id: "club-sandwich", name: "CLUB", description: "How many layers do you need?.", image: "https://iili.io/nq1xFKF.jpg" }, ]},
  { id: "sandwiches-hoagie", name: "HOAGIE", description: "The heart of the deli.", category: "SANDWICHES", image: "https://iili.io/nKiXtl2.png", subMenu: [
    { id: "half-hoagie", name: "HALF", description: "The sub on the go.", image: "https://iili.io/nKPVEQ4.png" },
    { id: "submarine", name: "SUBMARINE", description: "All aboard!", image: "https://iili.io/nqef0bt.png" }, ]},
  { id: "sandwiches-pressed", name: "PRESSED", description: "Heated, but never mistreated.", category: "SANDWICHES", image: "https://iili.io/nq4zzns.png", subMenu: [
    { id: "grilled-cheese", name: "GRILLED CHEESE", description: "Gooey goodness.", image: "https://iili.io/n37tcMP.png" },
    { id: "panini", name: "PANINI", description: "Pressed & dressed for success.", image: "https://iili.io/nK6NMWG.png" }, ]},
  { id: "sandwiches-sausages", name: "SAUSAGES", description: "Pig out, without the pig!", category: "SANDWICHES", image: "https://iili.io/n37twoN.png", subMenu: [
    { id: "hot-dog", name: "HOT DOG", description: "Get busy on this glizzy…", image: "https://iili.io/nq4Gien.png" },
    { id: "link", name: "LINK", description: "Hungrier than a hot dog?", image: "https://iili.io/nq6zhkN.png" },
    { id: "submarine-sausage", name: "SUBMARINE SAUSAGE", description: "Go long… Go deep!", image: "https://iili.io/n37thtp.png" }, ]},
  { id: "sandwiches-burgers", name: "BURGERS", description: "From pan to perfection!", category: "SANDWICHES", image: "https://iili.io/n37taoB.jpg", subMenu: [
    { id: "burger", name: "BURGER", description: "Build your burger from the bun up.", image: "https://iili.io/nqoIZKX.png" },
    { id: "sliders", name: "SLIDERS", description: "Three chances at greatness!", image: "https://iili.io/nqnp6Zl.png" }, ]},
  { id: "sandwiches-gyro", name: "GYRO", description: "Find out what the big dill is...", category: "SANDWICHES", image: "https://iili.io/nqcxSQ1.png", subMenu: [] },
  { id: "sandwiches-savory-stuffed-waffle", name: "SAVORY STUFFED WAFFLE", description: "We definitely skipped breakfast.", category: "SANDWICHES", image: "https://iili.io/n37tNVI.png", subMenu: [] },

    // ==================== BIRDS ====================
  { id: "birds-fried-chicken", name: "FRIED CHICKEN", description: "Go half, or go whole.", category: "BIRDS", image: "https://iili.io/n3RsBqb.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "This bird was actually clucking at some point.", image: "https://iili.io/n3RsdeS.png" },
    { id: "half", name: "HALF", description: "It's so more than half the bird it used to be.", image: "https://iili.io/n3Rir0v.png" },
    { id: "drum", name: "DRUM", description: "Play this drum with your teeth.", image: "https://iili.io/n3RiPJp.png" },
    { id: "thigh", name: "THIGH", description: "These thighs can run, but they can't fly!", image: "https://iili.io/n3RimqG.png" },
    { id: "breast", name: "BREAST", description: "Don't take your eyes off these!", image: "https://iili.io/n3RsxdQ.png" },
    { id: "wings", name: "WINGS", description: "Neither buffaloes nor chickens fly, how did we get here?", image: "https://iili.io/n3RsaEJ.png" }, ]},
  { id: "birds-fried-turkey", name: "FRIED TURKEY", description: "He got fried because he couldn't fly.", category: "BIRDS", image: "https://iili.io/n3Rsmj1.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "Fried & fit for a feast.", image: "https://iili.io/n3RsWhX.png" },
    { id: "drum", name: "DRUM", description: "The banquet benchmark!", image: "https://iili.io/n3RsjBs.png" },
    { id: "thigh", name: "THIGH", description: "Bigger thighs… Save even more lives!", image: "https://iili.io/n3RiMib.png" },
    { id: "breast", name: "BREAST", description: "No botched breast job here!", image: "https://iili.io/n3RsxdQ.png" },
    { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "https://iili.io/n3RsL3x.png" }, ]},
   { id: "birds-steamed-breasts", name: "STEAMED BREASTS", description: "The cleanest meat on land.", category: "BIRDS", image: "https://iili.io/n3RLBjt.png", subMenu: [
    { id: "steamed-breast-chicken", name: "CHICKEN", description: "Practically a seabird now!", image: "https://iili.io/n3RLHGa.png" },
    { id: "steamed-breast-turkey", name: "TURKEY", description: "Order if you fear dry turkey.", image: "https://iili.io/n3RsbTP.png" }, ]},

    // ==================== SEAFOOD ====================
  { id: "seafood-snapper", name: "SNAPPER", description: "The one Fish, paired with green eggs & ham, since 1960.", category: "SEAFOOD", image: "https://iili.io/nBUdjAF.png", subMenu: [
    { id: "battered", name: "BATTERED", description: "Battered but unbeatable!", image: "https://iili.io/n37b667.png" },
    { id: "sauteed", name: "SAUTÉED", description: "Fresh fillet, fried for full flavor!", image: "https://iili.io/nB8O9Ox.png" },
    { id: "steamed", name: "STEAMED", description: "Swimming in seasoning.", image: "https://iili.io/n37bevs.png" }, ]},
  { id: "seafood-salmon", name: "SALMON", description: "From sea to seasoned.", category: "SEAFOOD", image: "https://iili.io/n37DZLN.png", subMenu: [
    { id: "sauteed", name: "SAUTÉED", description: "Sensationally, seared.", image: "https://iili.io/n37Dy2n.png" },
    { id: "steamed", name: "STEAMED", description: "Hot steam, upstream!", image: "https://iili.io/n37bJpf.png" }, ]},
  { id: "seafood-crab-legs", name: "CRAB LEGS", description: "Crazed for crackin' cleaned clusters?", category: "SEAFOOD", image: "https://iili.io/nB6FZUG.png", subMenu: [
    { id: "dungeness", name: "DUNGENESS", description: "A boil in a bag!", image: "https://iili.io/nB4583Q.png" },
    { id: "snow", name: "SNOW", description: "A cold crab, fresh out the sauna.", image: "https://iili.io/nB4NwEQ.png" },
    { id: "king", name: "KING", description: "All shell the King!", image: "https://iili.io/nBPAHns.png" }, ]},
  { id: "seafood-lobster-tails", name: "LOBSTER TAILS", description: "Luxury lives in lobster.", category: "SEAFOOD", image: "https://iili.io/n37DQXp.png", subMenu: [
    { id: "seared-lobster-tail", name: "SEARED", description: "Sear-iously good.", image: "https://iili.io/nBsCikF.png" },
    { id: "steamed-lobster-tail", name: "STEAMED", description: "A timeless gift from Native America.", image: "https://iili.io/n37D67a.png" },
    { id: "large-lobster-tail", name: "DELUXE", description: "Quite a big tail to chase!", image: "https://iili.io/n37D4dg.png" }, ]},
  { id: "seafood-shrimp", name: "SHRIMP", description: "Every tail tells a tale…", category: "SEAFOOD", image: "https://iili.io/nBsGsKN.png", subMenu: [
    { id: "battered-shrimp", name: "BATTERED", description: "Prawns big enough to be a pet!", image: "https://iili.io/n37bxkb.png" },
    { id: "sauteed-shrimp", name: "SAUTÉED", description: "Sautéed, seasoned, & satisfying.", image: "https://iili.io/n37brn2.png" },
    { id: "steamed-shrimp", name: "STEAMED", description: "A cleaner way to see food.", image: "https://iili.io/nBsrQAG.png" }, ]},

  // ==================== FRIED SIDES ====================
  { id: "fried-sides-fries", name: "FRIES", description: "Order twice, just in case one disappears!", category: "FRIED SIDES", image: "https://iili.io/nBtBOl4.png", subMenu: [
    { id: "fries-potato", name: "POTATO", description: "Fried potatoes, not some science experiment.", image: "https://iili.io/nCHGtF1.png" },
    { id: "fries-curlies", name: "CURLIES", description: "You can almost never order enough curly fries… But you can try!", image: "https://iili.io/nCJDahg.png" },
    { id: "fries-wedges", name: "WEDGES", description: "What wonderful wedges!", image: "https://iili.io/nCJbpff.png" },
    { id: "fries-zu-fries", name: "ZU-FRIES", description: "Zucchini has entered the chat.", image: "https://iili.io/nCdKNZQ.png" },
    { id: "fries-zu-curlies", name: "ZU-CURLIES", description: "Zucchini with a twist! Literally…", image: "https://iili.io/n37Ffp9.png" }, ]},
  { id: "fried-sides-popcorn-bites", name: "POPCORN BITES", description: "Bite-sized bite, big-time flavor!", category: "FRIED SIDES", image: "https://iili.io/nCJpjTP.png", subMenu: [
    { id: "popcorn-chicken", name: "POPCORN CHICKEN", description: "Eat treat. Repeat!", image: "https://iili.io/nCd2JEX.png" },
    { id: "popcorn-shrimp", name: "POPCORN SHRIMP", description: "Almost too good!", image: "https://iili.io/n37FcQa.png" },
    { id: "popcorn-flower", name: "FLOWER BITES", description: "Cauliflower bites.", image: "https://iili.io/nCdM1V4.png" }, ]},
  { id: "fried-sides-onions", name: "ONIONS", description: "They will have you crying for more!", category: "FRIED SIDES", image: "https://iili.io/n37Fahg.png", subMenu: [
    { id: "onions-blossom", name: "BLOSSOM", description: "The ultimate onion experience.", image: "https://iili.io/n37FKk7.png" },
    { id: "onions-rings", name: "RINGS", description: "Battered & seasoned onion slices.", image: "https://iili.io/n37F5p1.png" }, ]},
  { id: "fried-sides-jalapeno-poppers", name: "JALAPENO POPPERS", description: "Breaded jalapeños full of gooey goodness.", category: "FRIED SIDES", image: "https://iili.io/nCdyJX1.png", subMenu: [] },
  { id: "fried-sides-mini-pockets", name: "MINI POCKETS", description: "A savory snack to push hunger back!", category: "FRIED SIDES", image: "https://iili.io/nC22VJs.png", subMenu: [] },

  // ==================== AIR-FRIED ====================
  { id: "birds-air-fried-chicken", name: "AIR-FRIED CHICKEN", description: "The most air this bird will ever get!", category: "AIR-FRIED", image: "https://iili.io/nFhlmx4.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "The full bird.", image: "https://iili.io/nC2zrxe.png" },
    { id: "half", name: "HALF", description: "Go half, or go home!", image: "https://iili.io/nFSk6Nt.png" },
    { id: "breast", name: "BREAST", description: "Don't take your eyes off these!", image: "https://iili.io/nCFLthF.png" },
    { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "https://iili.io/nFjhHkN.png" }, ]},
  { id: "birds-air-fried-turkey", name: "AIR-FRIED TURKEY", description: "He got fried because he couldn't fly.", category: "AIR-FRIED", image: "https://iili.io/nC3pofn.png", subMenu: [
    { id: "whole", name: "WHOLE", description: "The real big bird!.", image: "https://iili.io/nCFM22V.png" },
    { id: "drum", name: "DRUM", description: "Fried & fit for a feast.", image: "https://iili.io/nFh0HfS.png" },
    { id: "thigh", name: "THIGH", description: "Bigger thighs… Save even more lives!", image: "https://iili.io/nCFvXQ2.png" },
    { id: "breast", name: "BREAST", description: "No botched breast job here!", image: "https://iili.io/nFhlpWl.png" },
    { id: "wings", name: "WINGS", description: "Don't let these wings fly far.", image: "https://iili.io/nFjXmrv.png" }, ]},

  // ==================== LATIN AMERICA ====================
  { id: "latin-america-burrito", name: "BURRITO", description: "Not a lil donkey!", category: "LATIN AMERICA", image: "https://iili.io/nouaLts.png", subMenu: [] },
  { id: "latin-america-quesadilla", name: "QUESADILLA", description: "A grilled cheese sandwich in a tortilla.", category: "LATIN AMERICA", image: "https://iili.io/nox9dzB.png", subMenu: [] },
  { id: "latin-america-enchiladas", name: "ENCHILADAS", description: "Straight from Mexico's first cookbook ever!", category: "LATIN AMERICA", image: "https://iili.io/noxxM0v.png", subMenu: [] },
  { id: "latin-america-tacos", name: "TACOS", description: "Take time for taco time!", category: "LATIN AMERICA", image: "https://iili.io/noqgsup.png", subMenu: [
    { id: "latin-taco", name: "TACO", description: "The king of the street!", image: "https://iili.io/noCjrIn.png" },
    { id: "latin-taco-trio", name: "TACO TRIO", description: "Customize these three amigos.", image: "https://iili.io/nofPJ7j.png" },
    { id: "latin-taco-pack", name: "TACO PACK", description: "Three sets of twins.", image: "https://iili.io/noqAeXs.png" },
    { id: "latin-taco-party", name: "TACO PARTY", description: "A taco for every hour of the day!", image: "https://iili.io/n37BjS4.png" },
    { id: "latin-taco-party-fiesta-grande", name: "TACO PARTY: FIESTA GRANDE", description: "Fiesta... Party of fifty!", image: "https://iili.io/nofQLVp.png" }, ]},
  { id: "latin-america-nachos", name: "NACHOS", description: "Make these nachos, all yours!", category: "LATIN AMERICA", image: "https://iili.io/noYIgF2.png", subMenu: [] },

  // ==================== ASIAN ====================
  { id: "chow-mein", name: "CHOW MEIN", description: "Turn noodles into something notable.", category: "ASIAN", image: "https://iili.io/n3oNEts.png", subMenu: [] },
  { id: "stir-fry", name: "STIR-FRY", description: "Woks of fun!", category: "ASIAN", image: "https://iili.io/n3xq1kJ.png", subMenu: [] },
  { id: "citrus-glazed-chicken", name: "CITRUS GLAZED CHICKEN", description: "Chicken worthy of glazing.", category: "ASIAN", image: "https://iili.io/n3ovjLu.png", subMenu: [] },
  { id: "wonton-roll", name: "WONTON ROLL", description: "Fresh, fried, fillings!", category: "ASIAN", image: "https://iili.io/n3xqMIR.png", subMenu: [] },
  { id: "spring-roll", name: "SPRING ROLL", description: "Delicious without disguise!", category: "ASIAN", image: "https://iili.io/n3osfvs.png", subMenu: [] },

  // ==================== BEEF ====================
  { id: "beef-steaks", name: "STEAKS", description: "Your plate can get no beefier.", category: "BEEF", image: "https://iili.io/n3xo9G2.png", subMenu: [
    { id: "beef-battered", name: "BATTERED", description: "A breaded bovine.", image: "https://iili.io/n3xnbjf.png" },
    { id: "beef-ribeye", name: "RIBEYE", description: "A good cut, for a full gut.", image: "https://iili.io/n3xnQvn.png" },
    { id: "beef-chunks", name: "CHUNKS", description: "Steak on easy difficulty.", image: "https://iili.io/n3xnDTG.png" }, ]},
  { id: "beef-ground-beef", name: "GROUND BEEF", description: "The most versatile meat in the world.", category: "BEEF", image: "https://iili.io/n3xnZps.png", subMenu: [] },

  // ==================== VEGGIES ====================
  { id: "veggies-salad", name: "SALAD", description: "Create like Cardini.", category: "VEGGIES", image: "https://iili.io/n3Yqg5l.png", subMenu: [
    { id: "veggies-salad-garden", name: "GARDEN", description: "Garden freshness for your digestion.", image: "https://iili.io/n3Yq8gf.png" },
    { id: "veggies-salad-chefs", name: "CHEF'S", description: "A deluxe salad sampler.", image: "https://iili.io/n3YqUJ4.png" }, ]},
  { id: "veggies", name: "VEGGIES", description: "Volumes of vital vitamins!", category: "VEGGIES", image: "https://iili.io/n3YqZ0b.png", subMenu: [
    { id: "veggies-sauteed", name: "SAUTÉED", description: "Tossed & turned because it was too hot.", image: "https://iili.io/n3Yqkfs.png" },
    { id: "veggies-steamed", name: "STEAMED", description: "They enjoy a hot sauna too!", image: "https://iili.io/n3YqPz7.png" }, ]},

  // ==================== SOUPS & STEWS ====================
  { id: "soups", name: "SOUP", description: "The first dish in history!", category: "SOUPS & STEWS", image: "https://iili.io/n3Y3Z9S.png", subMenu: [
    { id: "soups-hot-pot", name: "HOT POT", description: "Nutrients, not noodles.", image: "https://iili.io/n3Y34MG.png" },
    { id: "soups-noodle", name: "NOODLE", description: "The secret weapon for sickness!", image: "https://iili.io/nohPZcg.png" },
    { id: "soups-ramen", name: "RAMEN", description: "Not just a cup of noodles!", image: "https://iili.io/n3Y3scl.png" }, ]},
  { id: "soups-stew", name: "STEW", description: "The original recipes of the world!", category: "SOUPS & STEWS", image: "https://iili.io/n3YFRRI.png", subMenu: [
    { id: "soups-stew-gumbo", name: "GUMBO", description: "World history in a bowl...", image: "https://iili.io/n3YFRRI.png" },
    { id: "soups-stew-stew", name: "STEW", description: "The definition of hearty.", image: "https://iili.io/n3YF7DX.png" }, ]},
  { id: "soups-chili", name: "CHILI", description: "Fresh or fast, make it last…", category: "SOUPS & STEWS", image: "https://iili.io/n3YF2SV.png", subMenu: [
    { id: "soups-chili-quick", name: "QUICK", description: "When you have to have it!", image: "https://iili.io/noXq8fn.png" },
    { id: "soups-chili-slow", name: "SLOW", description: "Slow-cooked & off the hook!", image: "https://iili.io/noXz6Ob.png" }, ]},
  { id: "soups-jambalaya", name: "JAMBALAYA", description: "The depth of satisfaction.", category: "SOUPS & STEWS", image: "https://iili.io/nohTXXj.png", subMenu: [] },

  // ==================== SIDES ====================
  { id: "sides-pasta", name: "PASTA", description: "A fork in the road? No, just a fork for your pasta.", category: "SIDES", image: "https://iili.io/n3YJzyF.png", subMenu: [
    { id: "sides-mac", name: "MAC & CHEESE", description: "Whether you choose dairy or not, your stomach will thank you!", image: "https://iili.io/nowip7n.png" },
    { id: "sides-alfredo", name: "ALFREDO", description: "Alfredo is life with the dull bits cut out.” - Hitchcock", image: "https://iili.io/n3YJqEQ.png" },
    { id: "sides-garlic", name: "GARLIC NOODLES", description: "Vampires beware!", image: "https://iili.io/n3YJn3B.png" }, ]},
  { id: "sides-rice", name: "RICE", description: "20,000 years of deliciousness!", category: "SIDES", image: "https://iili.io/nxny0fR.png", subMenu: [] },
  { id: "sides-fresh-fruit-cup", name: "FRESH FRUIT CUP", description: "No forbidden fruits here!", category: "SIDES", image: "https://iili.io/n3YJfCx.png", subMenu: [] },
  { id: "sides-breads", name: "BREADS", description: "The perfect support for any meal.", category: "SIDES", image: "https://iili.io/nxyh7nt.png", subMenu: [
    { id: "sides-breads-roll", name: "ROLL", description: "", image: "https://iili.io/nzTt9YF.png" },
    { id: "sides-breads-pita", name: "FLATBREAD", description: "The bread before there were borders.", image: "https://iili.io/n3YJFQj.png" },
    { id: "sides-breads-slice", name: "SLICE", description: "One slice can change a meal.", image: "https://iili.io/n3YHZQf.png" },
    { id: "sides-breads-bun", name: "BUN", description: "The bread before there were borders.", image: "https://iili.io/n3YJJpe.png" }, ]},
    

  // ==================== JR. DISHES ====================
  { id: "jr-hot-dog", name: "HOT DOG", description: "Your favorite dog!", category: "JR. DISHES", image: "https://iili.io/n37KeN1.png", subMenu: [] },
  { id: "jr-burger", name: "JR. BURGER", description: "A quarter-pound of fun in a bun.", category: "JR. DISHES", image: "https://iili.io/n37KNHB.png", subMenu: [] },
  { id: "jr-grilled-cheese", name: "GRILLED CHEESE SANDWICH", description: "Classic grilled sandwich on white bread.", category: "JR. DISHES", image: "https://iili.io/nIbtQRf.png", subMenu: [] },
  { id: "jr-chicken-fingers", name: "CHICKEN FINGERS", description: "A few fingers for a few fingers.", category: "JR. DISHES", image: "https://iili.io/n37K8og.png", subMenu: [] },
  { id: "jr-fries", name: "JR. FRIES", description: "A must-order!", category: "JR. DISHES", image: "https://iili.io/n37KSVa.png", subMenu: [] },
  { id: "jr-curlies", name: "JR. CURLIES", description: "A curl cut above the rest!", category: "JR. DISHES", image: "https://iili.io/nzYBLSS.png", subMenu: [] },
  { id: "jr-quesadilla", name: "JR. QUESADILLA", description: "Try these triangles at different angles!", category: "JR. DISHES", image: "https://iili.io/nTu64iQ.png", subMenu: [] },
  { id: "jr-soft-taco", name: "SOFT TACO", description: "A taco dressed like a burrito, so you won't be dressed like a taco!", category: "JR. DISHES", image: "https://iili.io/n37KLNt.png", subMenu: [] },
  { id: "jr-mac-cheese", name: "JR. MAC & CHEESE", description: "A lil mac'n never hurt nobody.", category: "JR. DISHES", image: "https://iili.io/n37KUiJ.png", subMenu: [] },
  { id: "jr-fruit-cup", name: "JR. FRUIT CUP", description: "Nature's candy.", category: "JR. DISHES", image: "https://iili.io/nz78RuR.png", subMenu: [] },
  { id: "jr-sticks-dip", name: "STICKS & DIP", description: "Crispy sticks with your favorite dip.", category: "JR. DISHES", image: "https://iili.io/n37K6Sp.png", subMenu: [] },

    // ==================== TREATS ====================
  { id: "treats-candied-fruit-cup", name: "CANDIED FRUIT CUP", description: "Your favorites, but sweeter!", category: "TREATS", image: "https://iili.io/n3Yf2TP.png", subMenu: [] },
  { id: "treats-pancake-taco", name: "PANCAKE TACO", description: "Ordering just 1, is a mistake!", category: "TREATS", image: "https://iili.io/n3YfJyB.png", subMenu: [] },
  { id: "treats-stuffed-waffle", name: "STUFFED WAFFLE", description: "A sweet treat of your creation…", category: "TREATS", image: "https://iili.io/nTwlfPj.png", subMenu: [] },
  { id: "treats-dessert-dumplings", name: "DESSERT DUMPLINGS", description: "The perfect treat after the perfect eat!", category: "TREATS", image: "https://iili.io/n3Yf2TP.png", subMenu: [] },

    // ==================== FLAMED ====================
  { id: "flamed-big-beef", name: "BIG BEEF", description: "The cow jumped over the moon… & landed on the grill!", category: "FLAMED", image: "https://iili.io/n37HHjj.png", subMenu: [
    { id: "flamed-tri-tip", name: "TRI-TIP", description: "Juicy, smoky, carved to perfection.", image: "https://iili.io/nTUWDns.png" },
    { id: "flamed-tomahawk", name: "TOMAHAWK STEAK", description: "Your appetite is axing for it!", image: "https://iili.io/n379Z4S.png" }, ]},
  { id: "flamed-ribs", name: "RIBS", description: "Order some replacement ribs, just in case…", category: "FLAMED", image: "https://iili.io/n37HGn4.png", subMenu: [
    { id: "flamed-short", name: "SHORT", description: "Thick, meaty, flame-kissed.", image: "https://iili.io/n37H1tf.png" },
    { id: "flamed-flanken", name: "FLANKEN", description: "Thin-cut, flame-seared perfection.", image: "https://iili.io/n37H0wG.png" }, ]},
  { id: "flamed-lamb", name: "LAMB", description: "Perfect for grilling… Mary, look away!", category: "FLAMED", image: "https://iili.io/n37H7at.png", subMenu: [] },
  { id: "flamed-chicken", name: "CHICKEN", description: "Check out these hot…", category: "FLAMED", image: "https://iili.io/n37HB8F.png", subMenu: [
    { id: "flamed-spatchcock", name: "SPATCHCOCK", description: "Butterflied & flame-cooked.", image: "https://iili.io/n37Hf3P.png" },
    { id: "flamed-half", name: "HALF", description: "Half a bird, flame-grilled.", image: "https://iili.io/n37HF6B.png" },
    { id: "flamed-drums", name: "DRUMS", description: "Hatched from real eggs.", image: "https://iili.io/n37H2CQ.png" },
    { id: "flamed-thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "https://iili.io/n37HCyg.png" },
    { id: "flamed-breasts", name: "BREASTS", description: "Check out these hot…", image: "https://iili.io/n37H3GV.png" },
    { id: "flamed-wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "https://iili.io/n37Houa.png" }, ]},
  { id: "flamed-stuffed-breasts", name: "STUFFED BREASTS", description: "No, we're not trying to make them look bigger!", category: "FLAMED", image: "https://iili.io/n37JJHX.png", subMenu: [
    { id: "stuffed-chicken", name: "CHICKEN", description: "When you're really hungry", image: "https://iili.io/n37HDVR.png" },
    { id: "stuffed-turkey", name: "TURKEY", description: "Stuff it with stuffing if you wish.", image: "https://iili.io/n37J9St.png" }, ]},
  { id: "flamed-fish", name: "FISH", description: "Hot fish… Hot dish!", category: "FLAMED", image: "https://iili.io/n37HA6N.png", subMenu: [
    { id: "flamed-halibut", name: "HALIBUT", description: "Fresh fillet, fired for full flavor!", image: "https://iili.io/n37HzZv.png" },
    { id: "flamed-snapper", name: "SNAPPER", description: "Hot fish… Hot dish!", image: "https://iili.io/n37HuGp.png" }, ]},
  { id: "flamed-shrimp", name: "SHRIMP", description: "Every tail tells a tale…", category: "FLAMED", image: "https://iili.io/n37HTnR.png", subMenu: [] },
  { id: "flamed-burgers", name: "BURGERS", description: "Less grease, more goodness.", category: "FLAMED", image: "https://iili.io/n37HJZx.png", subMenu: [] },
  { id: "flamed-baked-cabbage", name: "BAKED CABBAGE", description: "Baked, not boring.", category: "FLAMED", image: "https://iili.io/n379UYX.png", subMenu: [] },
  { id: "flamed-veggies", name: "VEGGIES", description: "Build your own veggie meal, fresh off the grill.", category: "FLAMED", image: "https://iili.io/nuBNK2j.png", subMenu: [
    { id: "flamed-course", name: "COURSE", description: "Nearly whole vegetables like long carrots, asparagus, & onion slices.", image: "https://iili.io/nuKPNdF.png" },
    { id: "flamed-cut", name: "CUT", description: "Small cuts of asparagus, chopped onions, & diced peppers.", image: "https://iili.io/n37Jwfp.png" },
    { id: "flamed-combo", name: "COMBO", description: "Meat… Veggies… What more could you want?!", image: "https://iili.io/nuo5uqB.png" }, ]},
  { id: "flamed-baked-potatoes", name: "BAKED POTATOES", description: "This is no side dish!", category: "FLAMED", image: "https://iili.io/n379QG2.png", subMenu: [
    { id: "flamed-standard", name: "STANDARD", description: "Flame-baked perfection.", image: "https://iili.io/nuzvvnf.png" },
    { id: "flamed-hasselback", name: "HASSELBACK", description: "The fancy, flame-baked cut.", image: "https://iili.io/n379rps.png" }, ]},
  { id: "flamed-stuffed-peppers", name: "STUFFED PEPPERS", description: "This pepper is waiting to be loaded!", category: "FLAMED", image: "https://iili.io/nuIW7Rf.png", subMenu: [
    { id: "flamed-bell", name: "BELL", description: "A loaded bell pepper.", image: "https://iili.io/nuIfWXt.png" },
    { id: "flamed-jalapeno", name: "JALAPEÑO", description: "A spicy, loaded jalapeño.", image: "https://iili.io/nuI1HbI.png" }, ]},
  
  // ==================== BRAISED ====================
  { id: "braised-beef", name: "BEEF", description: "Big beef, cooked slow…", category: "BRAISED", image: "https://iili.io/n35XMZP.png", subMenu: [
    { id: "braised-pot-roast", name: "POT ROAST", description: "Cooked low & slow...", image: "https://iili.io/n35XpV9.png" },
    { id: "braised-short-ribs", name: "SHORT RIBS", description: "These ribs never fall short.", image: "https://iili.io/n35XyPe.png" },
    { id: "braised-oxtails", name: "OXTAILS", description: "These tails tell no tales, no bull!", image: "https://iili.io/n35XsSf.png" }, ]},
  { id: "braised-goat-chunks", name: "GOAT CHUNKS", description: "The goat of goats!", category: "BRAISED", image: "https://iili.io/n35X0yQ.png", subMenu: [] },
  { id: "braised-lamb", name: "LAMB", description: "The other red meat, braised to perfection.", category: "BRAISED", image: "https://iili.io/n35XPFs.png", subMenu: [
    { id: "braised-lamb-shank", name: "SHANK", description: "Rich, tender, and fall-off-the-bone.", image: "https://iili.io/n35X4Pn.png" },
    { id: "braised-lamb-loin-chops", name: "LOIN CHOPS", description: "Tender, juicy, and full of flavor.", image: "https://iili.io/n35XO8v.png" }, ]},
  { id: "braised-chicken", name: "CHICKEN", description: "Raised from eggs to be braised.", category: "BRAISED", image: "https://iili.io/n35XNcJ.png", subMenu: [
    { id: "braised-chicken", name: "CHICKEN", description: "Rich, tender, and fall-off-the-bone.", image: "https://iili.io/n35X4Pn.png" },
    { id: "braised-hen", name: "HEN", description: "The banquet in a bag.", image: "https://iili.io/n35X4Pn.png" }, ]},
  { id: "braised-apples", name: "APPLES", description: "A sweet, braised treat.", category: "BRAISED", image: "https://iili.io/n35Xh6g.png", subMenu: [] },

    // ==================== ROTISSERIE ====================
  { id: "rotisserie-beef", name: "BEEF", description: "Big beef, cooked slow…", category: "ROTISSERIE", image: "https://iili.io/nuhv00u.png", subMenu: [
    { id: "rotisserie-prime-rib", name: "PRIME RIB ROAST", description: "A premium cut, cooked to perfection.", image: "https://iili.io/n37sOYv.png" },
    { id: "rotisserie-beef-roast", name: "ROAST", description: "A classic beef roast, slow-cooked.", image: "https://iili.io/nujgfHu.png" }, ]},
  { id: "rotisserie-lamb", name: "LAMB", description: "The centerpiece of a feast!", category: "ROTISSERIE", image: "https://iili.io/nujyozB.png", subMenu: [
    { id: "rotisserie-lamb-leg", name: "LEG", description: "A classic, juicy leg of lamb.", image: "https://iili.io/nuelp7S.png" },
    { id: "rotisserie-lamb-boneless", name: "BONELESS LEG", description: "Easy to carve, full of flavor.", image: "https://iili.io/nueTsX2.png" },
    { id: "rotisserie-lamb-shank", name: "SHANK", description: "Tender, rich, and fall-off-the-bone.", image: "https://iili.io/nueV3gf.png" }, ]},
  { id: "rotisserie-chicken", name: "CHICKEN", description: "Let's make this bird dizzy…", category: "ROTISSERIE", image: "https://iili.io/nuk6jne.png", subMenu: [
    { id: "rotisserie-chicken-whole", name: "WHOLE", description: "The full bird.", image: "https://iili.io/n37sUQt.png" },
    { id: "rotisserie-chicken-hen", name: "HEN", description: "A smaller, tender bird.", image: "https://iili.io/nAdiOfj.png" }, ]},
  { id: "rotisserie-turkey", name: "TURKEY", description: "Holiday flavor, any day!", category: "ROTISSERIE", image: "https://iili.io/nA3qqrv.png", subMenu: [
    { id: "rotisserie-turkey-whole", name: "WHOLE", description: "The full bird.", image: "https://iili.io/nA2UrZJ.png" },
    { id: "rotisserie-turkey-half", name: "HALF", description: "Half the bird.", image: "https://iili.io/n37L28x.png" }, ]},
  { id: "rotisserie-fish", name: "FISH", description: "Swimming in the ring of fire!", category: "ROTISSERIE", image: "https://iili.io/n37LJ3b.png", subMenu: [
    { id: "rotisserie-fish-whole", name: "WHOLE", description: "Whole fish, perfectly cooked.", image: "https://iili.io/n37syGe.png" },
    { id: "rotisserie-fish-fillet", name: "FILLET", description: "A perfectly cooked fillet.", image: "https://iili.io/n37spn9.png" }, ]},
  { id: "rotisserie-cabbage", name: "CABBAGE", description: "You gotta try this!!!", category: "ROTISSERIE", image: "https://iili.io/n37s8TN.png", subMenu: [] },
  { id: "rotisserie-pineapple", name: "PINEAPPLE", description: "An island visit without the airport!", category: "ROTISSERIE", image: "https://iili.io/nAFk1Wv.png", subMenu: [] },
  { id: "rotisserie-kebabs", name: "KEBABS", description: "The original global street food.", category: "ROTISSERIE", image: "https://iili.io/n37L3yQ.png", subMenu: [] },

  // ==================== SMOKED ====================
  { id: "smoked-beef", name: "BEEF", description: "Big, bold, & beefy.", category: "SMOKED", image: "https://iili.io/n3YJv99.png", subMenu: [
    { id: "smoked-packer-brisket", name: "PACKER BRISKET", description: "Big, bold, & beefy.", image: "https://iili.io/n3YJrnj.png" },
    { id: "smoked-center-brisket", name: "CENTER BRISKET", description: "No problems w/ this beef.", image: "https://iili.io/n3YJUZb.png" },
    { id: "smoked-sirloin-roast", name: "SIRLOIN ROAST", description: "Big, bold, & beefy.", image: "https://iili.io/n3YJiFV.png" },
    { id: "smoked-tomahawk", name: "TOMAHAWK STEAK", description: "Metal axe > Wood > Smoke > Meat Axe > Hunger", image: "https://iili.io/n3YJscB.png" },
    { id: "smoked-oxtails", name: "OXTAILS", description: "This time, fumes are going into the tail.", image: "https://iili.io/n3YJ8ue.png" }, ]},
  { id: "smoked-chicken", name: "CHICKEN", description: "From halves to hens.", category: "SMOKED", image: "https://iili.io/n3Yd2SI.png", subMenu: [
    { id: "smoked-spatchcock", name: "SPATCHCOCK", description: "Butterflied & smoked.", image: "https://iili.io/n3YJyMv.png" },
    { id: "smoked-half", name: "HALF", description: "Half a bird.", image: "https://iili.io/n3YJtAF.png" },
    { id: "smoked-tomahawk-leg", name: "TOMAHAWK LEG", description: "A giant, smoky leg.", image: "https://iili.io/n3Yd9PR.png" },
    { id: "smoked-wings", name: "WINGS", description: "Want some hot wings?… No, literally!", image: "https://iili.io/n3YdJFp.png" }, ]},
  { id: "smoked-turkey", name: "TURKEY", description: "Be thankful for this bird!", category: "SMOKED", image: "https://iili.io/n3Ydaob.png", subMenu: [
    { id: "smoked-turkey-spatchcock", name: "SPATCHCOCK", description: "Butterflied & smoked.", image: "https://iili.io/n3Yd5Ne.png" },
    { id: "smoked-turkey-drums", name: "DRUMS", description: "Smoked to perfection.", image: "https://iili.io/n3YdzKl.png" },
    { id: "smoked-turkey-thighs", name: "THIGHS", description: "These thighs can run, but they can't fly!", image: "https://iili.io/nAnd9iF.png" },
    { id: "smoked-turkey-wings", name: "WINGS", description: "Don't let these wings fly far.", image: "https://iili.io/n3YdcVj.png" }, ]},
  { id: "smoked-salmon-fillet", name: "SALMON FILLET", description: "Hooked & croaked… Cooked & smoked.", category: "SMOKED", image: "https://iili.io/n3YdCoG.png", subMenu: [] },
  { id: "smoked-lobster-tail", name: "LOBSTER TAIL", description: "Smoked to perfection.", category: "SMOKED", image: "https://iili.io/n3YdKAX.png", subMenu: [] },

  // ==================== BEVERAGES ====================
  { id: "beverages-water", name: "WATER", description: "Hydration, elevated.", category: "BEVERAGES", image: "https://iili.io/n3R66CJ.png", subMenu: [
    { id: "beverages-water-spring", name: "SPRING", description: "Cool & refreshing.", image: "https://iili.io/n3R6UTF.png" },
    { id: "beverages-water-infused", name: "INFUSED", description: "Fruit-infused & refreshing.", image: "https://iili.io/n3R6kYB.png" }, ]},
  { id: "beverages-citrus-drinks", name: "CITRUS DRINKS", description: "Lemon & honey infused spring water.", category: "BEVERAGES", image: "https://iili.io/nAn4wAJ.png", subMenu: [
    { id: "beverages-lemonade", name: "LEMONADE", description: "Lemon & honey infused spring water.", image: "https://iili.io/n3R617S.png" },
    { id: "beverages-dirty-limeade", name: "DIRTY LIMEADE", description: "Honey & cinnamon infused lime & peach juice..", image: "https://iili.io/n3R6VIe.png" }, ]},
  { id: "beverages-smoothie", name: "SMOOTHIE", description: "A refreshing blended treat.", category: "BEVERAGES", image: "https://iili.io/n3R6Gp9.png", subMenu: [] },
];