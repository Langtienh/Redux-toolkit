"use server";

import http from "./http";

export const getPostListAction = async () => {
  try {
    const response = await http.get<Post[]>("/posts");
    return response;
  } catch (error) {
    console.log("Lỗi servers");
    throw error;
  }
};
