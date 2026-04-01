const SUPABASE_FUNCTION_URL = 'https://mqfyuprpztiyfpleannt.supabase.co/functions/v1/send-reminders';

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const response = await fetch(SUPABASE_FUNCTION_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    });

    const raw = await response.text();
    let data = null;

    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = { ok: false, error: 'Invalid JSON response', raw };
    }

    return res.status(response.status).json(data || { ok: response.ok });
  } catch (error) {
    return res.status(502).json({
      ok: false,
      error: 'Proxy request failed',
      details: error instanceof Error ? error.message : String(error)
    });
  }
};