import axios from "axios";
import axiosInstace from "./axios";

export class SubscribtionApi {
  static getSubscription = async () => {
    try {
      const res = await axiosInstace.post("/subscribe");
    } catch (err) {}
  };
}
