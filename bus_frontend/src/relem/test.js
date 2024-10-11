

// async function getAccessToken() {
//     const tokenResponse = await fetch("https://account.olamaps.io/realms/olamaps/protocol/openid-connect/token", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: new URLSearchParams({
//             grant_type: "client_credentials",
//             scope: "openid",
//             client_id: clientId,
//             client_secret: clientSecret,
//         }),
//     });

//     if (!tokenResponse.ok) {
//         throw new Error("Failed to fetch access token");
//     }

//     const tokenData = await tokenResponse.json();
//     return tokenData.access_token;
// }

// async function autocompletePlaces(searchText) {
//     try {
//         const accessToken = await getAccessToken();
//         console.log("Access Token:", accessToken);

//         const placesResponse = await fetch(`https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(searchText)}`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${accessToken}`,
//             },
//         });

//         if (!placesResponse.ok) {
//             throw new Error("Failed to fetch autocomplete places");
//         }

//         const placesData = await placesResponse.json();
//         console.log(placesData);
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }

// // Usage example
// const searchText = "barei"; // Replace with your search text
// autocompletePlaces(searchText);
