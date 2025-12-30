module.exports = async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    let reviewsCount = 20; // Default fallback

    // Try to get reviews count from Google API
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (apiKey && placeId) {
      try {
        const url = `https://places.googleapis.com/v1/places/${placeId}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": "rating,userRatingCount",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.userRatingCount) {
            reviewsCount = data.userRatingCount;
          }
        }
      } catch (err) {
        // Fallback to default if API fails
        console.error("Error fetching reviews count:", err);
      }
    }

    // Note: Patient count is static in serverless functions
    // To make it dynamic, you would need to use Vercel KV or a database
    const happyPatients = 400; // Static value - can be updated via environment variable

    return res.status(200).json({
      ok: true,
      stats: {
        reviews: reviewsCount,
        yearsExperience: 18,
        happyPatients: Number(process.env.DEFAULT_PATIENT_COUNT || happyPatients),
      },
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    return res.status(500).json({
      ok: false,
      error: "Failed to fetch stats",
    });
  }
}

