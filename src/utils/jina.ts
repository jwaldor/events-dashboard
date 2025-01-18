export async function getMarkdownFromUrl(url: string): Promise<string> {
  const jinaUrl = `https://r.jina.ai/${url}`;
  const token = process.env.JINA_API_KEY;

  try {
    const response = await fetch(jinaUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error("Error fetching markdown:", error);
    throw error;
  }
}
