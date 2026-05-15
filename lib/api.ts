const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ── Token management ──────────────────────────────────────────────────────────

export const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("ecolink_token") : null;

export const setToken = (token: string) =>
  localStorage.setItem("ecolink_token", token);

export const clearToken = () =>
  localStorage.removeItem("ecolink_token");

// ── Base fetch wrapper ────────────────────────────────────────────────────────

async function api(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const authAPI = {
  register: (body: {
    firstName: string;
    lastName: string;
    phone: string;
    businessType: string;
    state?: string;
    lga?: string;
  }) => api("/auth/register", { method: "POST", body: JSON.stringify(body) }),

  verifyOtp: (body: { phone: string; otp: string }) =>
    api("/auth/verify-otp", { method: "POST", body: JSON.stringify(body) }),

  resendOtp: (body: { phone: string }) =>
    api("/auth/resend-otp", { method: "POST", body: JSON.stringify(body) }),

  login: (body: { phone: string; pin: string }) =>
    api("/auth/login", { method: "POST", body: JSON.stringify(body) }),

  setupPin: (body: { pin: string; skills: string[]; languages?: string[] }) =>
    api("/auth/setup-pin", { method: "POST", body: JSON.stringify(body) }),

  me: () => api("/auth/me"),
};

// ── Wallet ────────────────────────────────────────────────────────────────────

export const walletAPI = {
  create: (body: { bvn: string; dob: string; address: string; beneficiaryAccount: string }) =>
    api("/wallet/create", { method: "POST", body: JSON.stringify(body) }),

  balance: () => api("/wallet/balance"),

  transactions: (params?: { limit?: number; page?: number; purpose?: string }) => {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return api(`/wallet/transactions${q ? `?${q}` : ""}`);
  },

  lookup: (body: { bankCode: string; accountNumber: string }) =>
    api("/wallet/lookup", { method: "POST", body: JSON.stringify(body) }),

  send: (body: { bankCode: string; accountNumber: string; accountName: string; amount: number; note?: string }) =>
    api("/wallet/send", { method: "POST", body: JSON.stringify(body) }),

  paymentLink: (body: { amount: number; description?: string }) =>
    api("/wallet/payment-link", { method: "POST", body: JSON.stringify(body) }),

  ussd: (body: { amount: number; bankCode: string }) =>
    api("/wallet/ussd", { method: "POST", body: JSON.stringify(body) }),
  banks: () => api("/wallet/banks"),
};

// ── Jobs ──────────────────────────────────────────────────────────────────────

export const jobsAPI = {
  list: (params?: { category?: string; state?: string; jobType?: string; page?: number }) => {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return api(`/jobs${q ? `?${q}` : ""}`);
  },

  get: (id: string) => api(`/jobs/${id}`),

  post: (body: {
    title: string;
    description: string;
    skills: string[];
    languages?: string[];
    state: string;
    lga?: string;
    jobType: string;
    category: string;
    payAmount: number;
    payFrequency: string;
    escrowEnabled: boolean;
  }) => api("/jobs", { method: "POST", body: JSON.stringify(body) }),

  myPosted: () => api("/jobs/mine/posted"),
  myApplied: () => api("/jobs/mine/applied"),

  apply: (id: string, body: { coverNote?: string }) =>
    api(`/jobs/${id}/apply`, { method: "POST", body: JSON.stringify(body) }),

  hire: (jobId: string, applicantId: string) =>
    api(`/jobs/${jobId}/hire/${applicantId}`, { method: "PATCH" }),

  complete: (id: string) =>
    api(`/jobs/${id}/complete`, { method: "PATCH" }),
};

// ── Savings ───────────────────────────────────────────────────────────────────

export const savingsAPI = {
  list: () => api("/savings"),

  get: (groupId: string) => api(`/savings/${groupId}`),

  create: (body: {
    name: string;
    contributionAmount: number;
    frequency: string;
    maxMembers: number;
    payoutOrder?: string;
  }) => api("/savings", { method: "POST", body: JSON.stringify(body) }),

  join: (groupId: string) =>
    api(`/savings/${groupId}/join`, { method: "POST" }),

  contribute: (groupId: string, body: { paymentMethod?: string; bankCode?: string }) =>
    api(`/savings/${groupId}/contribute`, { method: "POST", body: JSON.stringify(body) }),

  disburse: (groupId: string) =>
    api(`/savings/${groupId}/disburse`, { method: "POST" }),
};

// ── Credit ────────────────────────────────────────────────────────────────────

export const creditAPI = {
  score: () => api("/credit/score"),
  offers: () => api("/credit/offers"),
  loans: () => api("/credit/loans"),

  apply: (body: { amount: number; purpose: string; durationDays: number }) =>
    api("/credit/apply", { method: "POST", body: JSON.stringify(body) }),

  disburse: (loanId: string) =>
    api(`/credit/loans/${loanId}/disburse`, { method: "POST" }),
};

// ── Profile ───────────────────────────────────────────────────────────────────

export const profileAPI = {
  get: () => api("/profile"),

  update: (body: {
    firstName?: string;
    lastName?: string;
    businessName?: string;
    bio?: string;
    businessType?: string;
    skills?: string[];
    languages?: string[];
    state?: string;
    lga?: string;
    email?: string;
  }) => api("/profile", { method: "PATCH", body: JSON.stringify(body) }),

  kyc: (body: { documentType: string; documentUrl: string; selfieUrl: string }) =>
    api("/profile/kyc", { method: "POST", body: JSON.stringify(body) }),

  checkin: (body: { mood: "good" | "okay" | "slow" }) =>
    api("/profile/checkin", { method: "POST", body: JSON.stringify(body) }),
};

// ── Vouch ─────────────────────────────────────────────────────────────────────

export const vouchAPI = {
  submit: (body: { recipientPhone: string; audioUrl: string; durationSeconds: number; language: string }) =>
    api("/vouch", { method: "POST", body: JSON.stringify(body) }),

  received: () => api("/vouch/received"),
  given: () => api("/vouch/given"),

  forUser: (userId: string) => api(`/vouch/user/${userId}`),
};