const LogApi = import.meta.env.LogApi;
const token = import.meta.env.token;

export async function Log(stack, level, packageName, message) {
  try {
    await fetch(LogApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message,
      }),
    });
  } catch (err) {
    console.log("Log failed");
  }
}