const SUPABASE_URL = 'https://rnjalauqcvamvhpenjtg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4ODg5MTAsImV4cCI6MjA5MTQ2NDkxMH0.vDk1vxDeohAfOVnB4cD-bvUcJhNSyjQx5rsPfcgXovU';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuamFsYXVxY3ZhbXZocGVuanRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTg4ODkxMCwiZXhwIjoyMDkxNDY0OTEwfQ.J1SRjX1lqUs4YintyDC_GPk9VjgG4TKdnF2tYXDjvFc';

const headers = () => ({
  'Content-Type': 'application/json',
  'apikey': SUPABASE_SERVICE_KEY,
  'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
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
    const errorText = await res.text();
    try {
      const error = JSON.parse(errorText);
      throw new Error(error.message || 'Failed to subscribe');
    } catch {
      throw new Error(errorText || 'Failed to subscribe');
    }
  }
  const text = await res.text();
  return text ? JSON.parse(text) : { success: true };
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
    const errorText = await res.text();
    try {
      const error = JSON.parse(errorText);
      throw new Error(error.message || 'Failed to add contact');
    } catch {
      throw new Error(errorText || 'Failed to add contact');
    }
  }
  const text = await res.text();
  return text ? JSON.parse(text) : { success: true };
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