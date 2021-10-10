const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function signupUser(payload, isValid = false) {
  try {
    await sleep(1000);
    const response = { status: isValid ? 'success' : 'failure' };
    return response;
  } catch (error) {
    return {
      status: error,
    };
  }
}
