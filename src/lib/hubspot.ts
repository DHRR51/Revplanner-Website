/**
 * HubSpot Forms + tracking integration.
 * Forms API: https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
 */

const PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID as string | undefined;
const REGION = (import.meta.env.VITE_HUBSPOT_REGION as string | undefined) ?? 'na2';

export type HubSpotField = {
  name: string;
  value: string;
};

export type HubSpotSubmitOptions = {
  formId: string;
  fields: HubSpotField[];
  pageUri?: string;
  pageName?: string;
};

export async function submitHubSpotForm({
  formId,
  fields,
  pageUri,
  pageName,
}: HubSpotSubmitOptions): Promise<{ ok: boolean; status: number; body?: unknown }> {
  if (!PORTAL_ID) {
    console.error('VITE_HUBSPOT_PORTAL_ID is not set; HubSpot form submission skipped.');
    return { ok: false, status: 0 };
  }

  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${formId}`;
  const payload = {
    fields: fields.map((f) => ({ objectTypeId: '0-1', name: f.name, value: f.value })),
    context: {
      pageUri: pageUri ?? (typeof window !== 'undefined' ? window.location.href : undefined),
      pageName: pageName ?? (typeof document !== 'undefined' ? document.title : undefined),
      hutk: getHubspotutk(),
    },
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => undefined);
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    console.error('HubSpot submit failed', err);
    return { ok: false, status: 0 };
  }
}

/**
 * Read the hubspotutk cookie set by the HubSpot tracking script,
 * which lets HubSpot stitch form submissions to the visitor's session.
 */
function getHubspotutk(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
  return match?.[1];
}

export const HUBSPOT_REGION = REGION;
export const HUBSPOT_PORTAL_ID = PORTAL_ID;
