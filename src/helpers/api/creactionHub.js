import axiosInstace from "./axios";

export class CreationHubApi {

  static saveDocumentCreation = async (id) => {
    try {
      const res = await axiosInstace.post("/document", { id });

      if (res.data.status == 1) {
        return {
          error: false,
          success: true,
          data: res?.data?.data,
        };
      }

      return {
        error: false,
        success: false,
        data: res?.data?.data,
      };
    } catch (err) {
      return {
        error: true,
        errors: err,
      };
    }
  };
}
