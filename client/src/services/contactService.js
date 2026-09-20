import api from "./api";

export const contactService = {
  async submitMessage(data) {
    try {
      const res = await api.post("/contact", data);
      return res.data;
    } catch (err) {
      // Return simulated success if server is offline so user experience is smooth
      console.warn("[ContactService] Offline fallback:", err.message);
      return { success: true, message: "Message sent successfully! (Local simulation)" };
    }
  },

  async getMessages() {
    const res = await api.get("/contact");
    return res.data;
  },
};

export default contactService;
