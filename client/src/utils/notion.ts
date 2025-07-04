export async function fetchMultiplePageContents() {
  const res = await fetch('http://localhost:3001/notion', {
    method: 'POST',
  });

  if (!res.ok) throw new Error('Failed to fetch Notion pages');

  const json = await res.json();
  return json.pages; // array of { pageId, blocks }
}
