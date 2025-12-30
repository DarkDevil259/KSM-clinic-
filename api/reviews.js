module.exports = async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
      return res.status(200).json({
        ok: true,
        reviews: [],
        message: "Google Places API not configured. Please add GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID to your environment variables.",
      });
    }

    // Fetch place details with reviews from Google Places API (New)
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews.authorAttribution.displayName,reviews.text.text,reviews.rating,reviews.publishTime,reviews.relativePublishTimeDescription,displayName,rating",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Places API error:", response.status, errorText);

      // Try fallback to old Places API if new API fails
      try {
        const oldApiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}`;
        const oldApiResponse = await fetch(oldApiUrl);
        if (oldApiResponse.ok) {
          const oldApiData = await oldApiResponse.json();
          if (oldApiData.result && oldApiData.result.reviews) {
            const reviews = oldApiData.result.reviews.map((review) => ({
              name: review.author_name || "Anonymous",
              text: review.text || "",
              rating: review.rating || 5,
              time: review.time || null,
              relativeTimeDescription: review.relative_time_description || null,
            }));
            return res.status(200).json({
              ok: true,
              reviews: reviews,
            });
          }
        }
      } catch (fallbackErr) {
        console.error("Fallback API also failed:", fallbackErr);
      }

      return res.status(200).json({
        ok: true,
        reviews: [],
        message: "Unable to fetch reviews from Google. Please check your API configuration.",
      });
    }

    const data = await response.json();
    const reviews = (data.reviews || []).map((review) => ({
      name: review.authorAttribution?.displayName || "Anonymous",
      text: review.text?.text || "",
      rating: review.rating || 5,
      time: review.publishTime || null,
      relativeTimeDescription: review.relativePublishTimeDescription || null,
    }));

    return res.status(200).json({
      ok: true,
      reviews: reviews,
    });
  } catch (err) {
    console.error("Error fetching Google reviews:", err);
    return res.status(200).json({
      ok: true,
      reviews: [],
      message: "Error fetching reviews. Please try again later.",
    });
  }
}

