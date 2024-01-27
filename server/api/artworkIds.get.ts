export default defineEventHandler(async () => {
  let parsedRes = null;
  try {
    const res = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
    const data = await res.json();

    parsedRes = {
      total: data.total || null,
      success: true
    };
  } catch (error) {
    parsedRes = {
      total: null,
      success: false
    };
  }

  return parsedRes;
});
