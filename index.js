import axios from "axios";

const API_URL = "https://dolphindashbackend.onrender.com/api";

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/bets`);
        const lastBet = response.data[response.data.length - 1];
        const startedAt = new Date(lastBet.startedAt);
        lastBet.endAt = new Date(startedAt);
        lastBet.endAt.setUTCHours(20, 0, 0, 0);
        const endAt = new Date(lastBet.endAt);
        const diffMs = endAt - startedAt;
        const diffSeconds = Math.floor(diffMs / 1000);
        const now = new Date();
        const timeLeftMs = endAt - now;
        const timeLeftSeconds = Math.max(0, Math.floor(timeLeftMs / 1000));
        console.log(`Time left before betting round ends: ${timeLeftSeconds} seconds`);
        console.log(`Difference: ${(diffSeconds-timeLeftSeconds)/diffSeconds*100} percent`);
        console.log(response.data[response.data.length-1].startedAt);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
fetchData();