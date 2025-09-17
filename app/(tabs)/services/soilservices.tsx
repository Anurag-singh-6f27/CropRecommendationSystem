import axios from 'axios';
interface OpenMeteoCurrent {
  soil_moisture_0_to_1cm: number;
}
interface OpenMeteoResponse {
  current: OpenMeteoCurrent;
}

export const getSoilMoisture = async (latitude: number, longitude: number): Promise<number | null> => {
  try {
    // Construct the API URL with the provided coordinates
    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=soil_moisture_0_to_1cm`;
    
    // Make the API call using axios
    const response = await axios.get<OpenMeteoResponse>(openMeteoUrl);
    
    // Extract the soil moisture value from the response
    const moistureDecimal = response.data.current.soil_moisture_0_to_1cm;
    
    // Convert the decimal value to a percentage and fix to one decimal place
    const moisturePercentage = parseFloat((moistureDecimal * 100).toFixed(1));
    
    return moisturePercentage;

  } catch (error) {
    // If the API call fails, log the error to the console
    console.error("Error fetching soil moisture data:", error);
    // Return null to indicate that the fetch failed
    return null;
  }
};