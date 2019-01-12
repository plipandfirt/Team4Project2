async function fetchRecipes(){
//   const appId = process.env.EDAMAM_RECIPE_APP_ID;
//   const appId = "9ba82081";
//   const appKey = "7812af8b5126f42bf75451a05e092929";
  //   const appKey = process.env.EDAMAM_RECIPE_APP_KEY;
//   const baseUrl = `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}`;
//   console.log(baseUrl);
//   const chicken = await fetch(`https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}&q=chicken`);
//   console.log(chicken);
  const data = await fetch("/api/recipes");
//   console.log(data);
}

fetchRecipes();