import axios from "axios";

const API_URL = "http://localhost:8000";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    return response;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, userData);
    return response;
  } catch (error) {
    console.error("Error registering", error);
    throw error;
  }
};

export const fetchChats = async () => {
  try {
    const response = await axios.get(`${API_URL}/chat/getAllChats`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching chats", error);
    throw error;
  }
};

export const getNews = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/chat/getNews`, data, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news", error);
    throw error;
  }
};

export const addChat = async (chatData) => {
  try {
    const data = {
      query: chatData.name,
    };
    const response = await axios.post(`${API_URL}/chat/createChat`, data, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding chat", error);
    throw error;
  }
};

// export const sendMessage = async (chatId, messageData) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/chat/${chatId}/createMessage`,
//       messageData,
//       {
//         headers: {
//           authorization: localStorage.getItem("token"),
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error sending message", error);
//     throw error;
//   }
// };
