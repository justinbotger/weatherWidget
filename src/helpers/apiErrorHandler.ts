export function handleApiError(error: any): string {
  if (error.response) {
    // Server responded with a status code outside the 2xx range
    switch (error.response.status) {
      case 400:
        return "Bad Request. Please check the location input.";
      case 404:
        return "Weather data not found. Try another location.";
      case 429:
        return error.response.data.message;
      case 500:
        return "Server error. Please try again later.";
      default:
        return `An error occurred: ${error.response.message}`;
    }
  } else if (error.request) {
    // No response received from server
    return "Unable to connect to the server. Please check your network.";
  } else {
    // Other errors during request setup
    return `Error: ${error.message}`;
  }
}
