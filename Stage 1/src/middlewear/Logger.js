const LogApi=import.meta.env.VITE_LOG_API;
const token=import.meta.env.VITE_TOKEN;

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
  } catch (error) {
    console.log("Logging failed");
  }
}