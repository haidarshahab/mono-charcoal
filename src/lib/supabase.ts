const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://rnjalauqcvamvhpenjtg.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRVD1GcjK6P9wN5wN8wG5W5JvMJ3HnG3pGP2pV3Yx4g';
const SUPABASE_SERVICE_KEY = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.E-g-iV3pI7N3tT5vN5wG5W5JvMJ3HnG3pGP2pV3Yx4g';

const headers = (isAdmin: boolean = false) => ({
  'Content-Type': 'application/json',
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${isAdmin ? SUPABASE_SERVICE_KEY : SUPABASE_ANON_KEY}`,
});

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  keywords: string[] | null;
  takeaways: string[] | null;
  date: string | null;
  read_time: string | null;
  published: boolean;
  created_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

export interface Contact {
  id: string;
  name: string | null;
  email: string | null;
  company: string | null;
  country: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

// Articles
export const getArticles = async (publishedOnly: boolean = false): Promise<Article[]> => {
  const url = `${SUPABASE_URL}/rest/v1/articles?select=*${publishedOnly ? '&published=eq.true' : ''}&order=created_at.desc`;
  const res = await fetch(url, { headers: headers() });
  return res.json();
};

export const getArticleById = async (id: string): Promise<Article> => {
  const url = `${SUPABASE_URL}/rest/v1/articles?id=eq.${id}&select=*`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  return data[0];
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const url = `${SUPABASE_URL}/rest/v1/articles?slug=eq.${slug}&select=*`;
  const res = await fetch(url, { headers: headers() });
  const data = await res.json();
  return data[0] || null;
};

export const createArticle = async (article: Partial<Article>): Promise<Article> => {
  const url = `${SUPABASE_URL}/rest/v1/articles`;
  const res = await fetch(url, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify(article),
  });
  return res.json();
};

export const updateArticle = async (id: string, article: Partial<Article>): Promise<Article> => {
  const url = `${SUPABASE_URL}/rest/v1/articles?id=eq.${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: headers(true),
    body: JSON.stringify(article),
  });
  return res.json();
};

export const deleteArticle = async (id: string): Promise<void> => {
  const url = `${SUPABASE_URL}/rest/v1/articles?id=eq.${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: headers(true),
  });
};

// Subscribers
export const getSubscribers = async (): Promise<Subscriber[]> => {
  const url = `${SUPABASE_URL}/rest/v1/subscribers?select=*&order=subscribed_at.desc`;
  const res = await fetch(url, { headers: headers() });
  return res.json();
};

export const addSubscriber = async (email: string): Promise<Subscriber> => {
  const url = `${SUPABASE_URL}/rest/v1/subscribers`;
  const res = await fetch(url, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to subscribe');
  }
  return res.json();
};

// Contacts
export const getContacts = async (status?: string): Promise<Contact[]> => {
  const url = `${SUPABASE_URL}/rest/v1/contacts?select=*${status ? `&status=eq.${status}` : ''}&order=created_at.desc`;
  const res = await fetch(url, { headers: headers() });
  return res.json();
};

export const addContact = async (contact: Partial<Contact>): Promise<Contact> => {
  const url = `${SUPABASE_URL}/rest/v1/contacts`;
  const res = await fetch(url, {
    method: 'POST',
    headers: headers(true),
    body: JSON.stringify(contact),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to add contact');
  }
  return res.json();
};

export const updateContactStatus = async (id: string, status: string): Promise<Contact> => {
  const url = `${SUPABASE_URL}/rest/v1/contacts?id=eq.${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: headers(true),
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// Stats
export const getStats = async () => {
  const [articles, published, subscribers, contacts] = await Promise.all([
    getArticles(),
    getArticles(true),
    getSubscribers(),
    getContacts(),
  ]);
  
  const unreadContacts = contacts.filter(c => c.status === 'unread');
  
  return {
    totalArticles: articles.length,
    publishedArticles: published.length,
    draftArticles: articles.length - published.length,
    totalSubscribers: subscribers.length,
    totalContacts: contacts.length,
    unreadContacts: unreadContacts.length,
  };
};

// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export { SUPABASE_URL, SUPABASE_ANON_KEY };