/**
 * Destiny Protocol — Content Config
 * ----------------------------------
 * Every piece of copy and every statistic on the site lives here, typed.
 * A non-developer can edit headlines, paragraphs and numbers in this file
 * without ever touching a component.
 *
 * DATA RULE: numbers are real values. Where a figure is an estimate or has a
 * known source, it is annotated. No stat silently renders as 0.
 */

/* ------------------------------------------------------------------ types -- */

export interface Stat {
  /** The numeric value the counter animates to. */
  value: number;
  /** Decimal places to show while counting (e.g. 2.5 -> 1). */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Honest sourcing / qualifier shown beneath the number. */
  note?: string;
}

export interface Card {
  title: string;
  body: string;
  /** Optional short kicker / index shown above the title. */
  kicker?: string;
  /** Theme chips (used by the Flip "winners" cards). */
  chips?: string[];
  /** Icon key (used by Architecture pillars); resolved in components/ui/Icon.tsx. */
  icon?: string;
}

export interface HistoryRow {
  event: string;
  era: string;
  impact: string;
}

export interface Scenario {
  name: string;
  context: string;
  outcome: string;
  /** Big numeric payoff, kept short. */
  metric: string;
}

export type Cell = boolean | "partial";

export interface MatrixRow {
  feature: string;
  /** One cell per column, in column order. */
  cells: Cell[];
}

/* ------------------------------------------------------------------- meta -- */

export const site = {
  name: "Destiny Protocol",
  domain: "destinypro.io",
  tagline:
    "Digital inheritance for the blockchain era. Non-custodial, encrypted, and automatic — so your legacy outlasts you.",
  description:
    "Destiny Protocol is the inheritance layer for digital wealth. Non-custodial, end-to-end encrypted, and automatic — the way TLS sits beneath every browser, Destiny sits beneath every wallet.",
  status: "Coming soon · in active development",
  nav: [
    { label: "Frame", href: "#frame" },
    { label: "History", href: "#history" },
    { label: "Architecture", href: "#architecture" },
    { label: "Flagship", href: "#flagship" },
    { label: "Why Destiny", href: "#why" },
  ],
  contact: {
    general: "contact@destinypro.io",
    invest: "invest@destinypro.io",
    careers: "careers@destinypro.io",
  },
  builtOn: ["Ethereum", "BNB Chain", "IPFS", "LayerZero"],
} as const;

/* ------------------------------------------------------------------ loader -- */

export const loader = {
  label: "Cracking the vault",
  brand: "Destiny Protocol",
};

/* -------------------------------------------------------------- 1 · hero --- */

export const hero = {
  eyebrow: "Securing & building your legacy",
  /** `gild` words are rendered in gold leaf. */
  titleLead: "Building the intelligent",
  gild: "inheritance",
  titleTail: "layer for the next era of Sapiens.",
  sub: "For 5,000 years, every form of wealth had a way to pass on. Digital wealth broke that. Destiny is the trust, identity and automation layer that makes digital wealth heritable — non-custodial, encrypted, and self-executing.",
  reframe: {
    lead: "We're not building a product.",
    tail: "We're building the substrate digital legacy runs on.",
  },
  ctas: [
    { label: "Explore the protocol", href: "#architecture", primary: true },
    { label: "Join early access", href: "#join", primary: false },
  ],
  chips: [
    "Identity",
    "Trust",
    "Intelligence",
    "Privacy",
    "Automation",
    "Decentralized resilience",
  ],
};

/* ------------------------------------------------------------- 1.5 · vision */

export const vision = {
  eyebrow: "The vision",
  heading: "A world where ownership outlasts the people who claim it.",
  body: "Wealth should not die with the person who holds the key. Destiny exists so that what you own — on-chain and off — passes on cleanly, privately, and without permission from anyone.",
  quote:
    "If we build this right, no one ever has to wonder who owns what — or what becomes of it next.",
};

/* --------------------------------------------------- 2 · the 5,000-year frame */

export const frame = {
  eyebrow: "The 5,000-year pattern",
  heading: "Every form of wealth always had a way to pass on.",
  body: "Continuity is the oldest technology civilization has. Long before banks or blockchains, humans invented instruments whose entire purpose was to carry ownership across the gap of a single human life.",
  ledger: [
    { kind: "Land", instrument: "had deeds." },
    { kind: "Money", instrument: "had wills." },
    { kind: "Stocks", instrument: "had beneficiaries." },
    { kind: "Titles", instrument: "had registries." },
  ],
};

/* --------------------------------------------------------------- 3 · break -- */

export const theBreak = {
  eyebrow: "The break",
  lead: "Then humanity invented digital wealth —",
  gild: "and broke all of it.",
  body: "A private key has no deed, no will, no beneficiary. It cannot detect death, cannot be inherited, and cannot be recovered. The most valuable assets ever created are the first in history with no way to pass on. When the key dies, the wealth dies with it.",
};

/* ------------------------------------------------------------- 4 · history -- */

export const history = {
  eyebrow: "The core question",
  heading: "What happens to humanity when intelligence is not preserved?",
  body: "Every collapse in the record below has the same shape: knowledge that existed, then didn't, because nothing was built to carry it across time. Digital wealth is now repeating the pattern — one lost key at a time.",
  rows: [
    {
      event: "Burning of Alexandria",
      era: "~48 BC – 642 AD",
      impact: "Loss of ancient scientific continuity",
    },
    {
      event: "Fall of Rome",
      era: "5th century AD",
      impact: "Infrastructure and institutional regression",
    },
    {
      event: "Destruction of the Maya codices",
      era: "16th century",
      impact: "Cultural and astronomical knowledge erased",
    },
    {
      event: "World War archival destruction",
      era: "1914 – 1945",
      impact: "Historical and scientific data fragmentation",
    },
    {
      event: "Modern cyberattacks & data loss",
      era: "21st century · ongoing",
      impact: "Economic and operational paralysis",
    },
  ] satisfies HistoryRow[],
};

/* -------------------------------------------------------------- 5 · crisis -- */

export const crisis = {
  eyebrow: "The modern crisis",
  heading: "The conditions for the next loss are already here.",
  body: "Not one dramatic fire, but a slow erosion across every system we trust to remember for us.",
  tags: [
    "Data silos",
    "Centralized dependency",
    "Identity fragmentation",
    "Trust deficits",
    "Information manipulation",
    "Short-lived platforms",
    "Knowledge decay",
    "Weak interoperability",
    "No meaningful ownership",
  ],
  todayLabel: "Today",
  today: [
    "A wallet is found, but no one alive can open it.",
    "A will names assets it can never legally reach.",
    "Heirs inherit a hardware device and a dead end.",
    "Exchanges fail — and take custody down with them.",
    "A seed phrase is the only copy, until it isn't.",
    "Probate runs for years while the keys sit frozen.",
  ],
  paradox:
    "We built the most valuable assets in history — and the only ones with no way to inherit them.",
};

/* ---------------------------------------------------------------- 6 · flip -- */

export const flip = {
  eyebrow: "Proof by history",
  heading: "The civilizations that preserved knowledge dominated the ones that didn't.",
  body: "The flip side of every collapse is a winner who did the opposite. Continuity is not nostalgia — it is compounding advantage.",
  cards: [
    {
      title: "Renaissance Europe",
      body: "Recovered the lost texts of antiquity — and restarted civilization on top of them.",
      chips: ["Preservation", "Translation", "Continuity"],
    },
    {
      title: "Japan's knowledge culture",
      body: "Treated legacy as infrastructure, passing craft and process down as a living system.",
      chips: ["Craft", "Transmission", "Ritual"],
    },
    {
      title: "NASA archival systems",
      body: "Learned that mission continuity is data continuity — every result kept, forever retrievable.",
      chips: ["Archival", "Retrieval", "Redundancy"],
    },
    {
      title: "Toyota Production System",
      body: "Turned process memory into a moat that compounded quietly for decades.",
      chips: ["Process memory", "Iteration", "Compounding"],
    },
  ] satisfies Card[],
};

/* -------------------------------------------------------- 7 · architecture -- */

export const architecture = {
  eyebrow: "The architecture",
  heading: "Five pillars. One coordinated framework for continuity.",
  body: "Each pillar is a capability — but the protocol's power is that they operate as one coordinated system, the way TLS quietly sits beneath every browser.",
  pillars: [
    {
      kicker: "01",
      title: "Knowledge Continuity Layer",
      body: "Encrypted capsules that carry files, messages and credentials across the gap of a single life.",
      icon: "vault",
    },
    {
      kicker: "02",
      title: "Identity & Trust Infrastructure",
      body: "Wallet-bound, self-sovereign identity with attestations that compound into a public trust score.",
      icon: "fingerprint",
    },
    {
      kicker: "03",
      title: "Adaptive Intelligence Systems",
      body: "Models that detect inactivity and anomalies from metadata alone — protecting without ever seeing.",
      icon: "pulse",
    },
    {
      kicker: "04",
      title: "Distributed Resilience",
      body: "A three-node private chain with sub-30-second failover, anchored to public chains for permanence.",
      icon: "network",
    },
    {
      kicker: "05",
      title: "Civilization Memory Infrastructure",
      body: "Tamper-evident records, designed open-source to outlast the team that built them.",
      icon: "monument",
    },
  ] satisfies Card[],
};

/* ------------------------------------------------------------- 8 · flagship -- */

export const flagship = {
  eyebrow: "Flagship · Property Registry",
  heading: "The first cryptographically anchored property registry.",
  body: "The largest asset class on earth still runs on paper, county clerks and legal contests. The Property Registry binds every high-value asset to verifiable, inheritable, tamper-evident ownership — for real estate, vehicles, IP, art and more.",
  stats: [
    {
      value: 380,
      prefix: "$",
      suffix: "T",
      label: "Global real estate — the largest asset class on earth",
    },
    {
      value: 1.5,
      decimals: 1,
      prefix: "$",
      suffix: "T",
      label: "Lost to title fraud every year",
      note: "FBI estimate",
    },
    {
      value: 70,
      suffix: "%",
      label: "Inheritance disputes involving unclear property ownership",
    },
  ] satisfies Stat[],
  guarantees: [
    "Tamper-evident ownership",
    "Verifiable chain of custody",
    "Documents bound to the asset",
    "Built-in inheritance & succession",
    "Borderless, jurisdiction-aware",
    "Built to outlast institutions",
  ],
};

/* --------------------------------------------------------------- 9 · market -- */

export const market = {
  eyebrow: "By the numbers",
  heading: "A multi-trillion-dollar need with no inheritance layer.",
  body: "The money is real, enormous, and entirely unserved. These are the numbers that make the case impossible to ignore.",
  stats: [
    {
      value: 2.5,
      decimals: 1,
      prefix: "$",
      suffix: "T",
      label: "Crypto wealth with no inheritance layer",
    },
    {
      value: 560,
      suffix: "M",
      label: "Crypto holders worldwide",
      note: "Crypto.com Global Report 2024 · +30% / yr",
    },
    {
      value: 20,
      suffix: "%",
      label: "Of all Bitcoin already lost forever",
      note: "estimated",
    },
    {
      value: 380,
      prefix: "$",
      suffix: "T",
      label: "Global real estate awaiting a digital title layer",
    },
    {
      value: 1.5,
      decimals: 1,
      prefix: "$",
      suffix: "T",
      label: "Lost annually to title fraud",
      note: "FBI estimate",
    },
    {
      value: 70,
      suffix: "%",
      label: "Inheritance disputes tied to unclear property ownership",
    },
  ] satisfies Stat[],
};

/* --------------------------------------------------------- 10 · what we build */

export const build = {
  eyebrow: "What we build",
  heading: "Four surfaces. One protocol.",
  body: "No vaporware. Destiny ships as concrete, demoable software — a mobile app, an operator console, audited contracts, and a private chain anchored to the public one.",
  surfaces: [
    {
      kicker: "Mobile app · iOS + Android",
      title: "One-tap heartbeat",
      body: "React Native with WalletConnect v2, an on-device encrypted vault, and beneficiary & guardian flows in your pocket.",
    },
    {
      kicker: "Web admin panel",
      title: "Operator console",
      body: "Users, recoveries, chain health, IPFS pin status and full audit trails — the control room for the protocol.",
    },
    {
      kicker: "Smart contracts",
      title: "Self-executing succession",
      body: "Solidity on Ethereum + BNB: ERC-20 allowance inheritance, ERC-721 NFT inheritance, inactivity time-locks, guardian multi-sig.",
    },
    {
      kicker: "Private blockchain",
      title: "Encrypted ledger",
      body: "A 3-node P2P chain with AES-256-GCM payloads and ed25519 block signatures, anchored to public chains for permanence.",
    },
  ] satisfies Card[],
};

/* ---------------------------------------------------------------- 11 · why us */

export const why = {
  eyebrow: "Why Destiny",
  heading: "Other solutions exist. None do this.",
  body: "Every alternative compromises on something fundamental — custody, privacy, automation, or permanence. Destiny refuses all four compromises at once.",
  pillars: [
    {
      title: "We never touch your money.",
      body: "Permission, never possession. Assets stay in your wallet until the moment of transfer.",
    },
    {
      title: "We never see your files.",
      body: "Everything is encrypted on-device. The protocol carries ciphertext it can never read.",
    },
    {
      title: "No lawyers, no courts.",
      body: "Succession resolves in a single beneficiary transaction — not a two-year legal process.",
    },
    {
      title: "Built to outlast us.",
      body: "Open-source from day one. The protocol survives even if the team does not.",
    },
  ] satisfies Card[],
  // Comparison matrix. Columns in display order; Destiny is first.
  columns: [
    "Destiny",
    "Custodial exchange",
    "Paper will / lawyer",
    "Shared seed phrase",
    "Time-lock contract",
  ],
  rows: [
    {
      feature: "Assets stay in your wallet",
      cells: [true, false, true, true, false],
    },
    {
      feature: "Encrypted vault for files",
      cells: [true, false, false, false, false],
    },
    {
      feature: "Triggers automatically",
      cells: [true, false, false, false, true],
    },
    {
      feature: "Cancel anytime",
      cells: [true, "partial", true, false, false],
    },
    {
      feature: "Beneficiary can't access early",
      cells: [true, true, true, false, true],
    },
    {
      feature: "No key exposure",
      cells: [true, false, true, false, true],
    },
    {
      feature: "Tamper-evident records",
      cells: [true, "partial", false, false, true],
    },
    {
      feature: "Multi-chain",
      cells: [true, "partial", false, false, false],
    },
  ] satisfies MatrixRow[],
};

/* ----------------------------------------------------------- 12 · scenarios -- */

export const scenarios = {
  eyebrow: "Lives it quietly protects",
  heading: "One protocol. Many lives, many outcomes.",
  body: "Every abstract feature becomes a person with a number. Here is what Destiny changes in practice.",
  people: [
    {
      name: "Mira",
      context: "Owns three properties across two countries.",
      outcome: "Cross-border succession that once took years now settles instantly.",
      metric: "2 years → 1 transaction",
    },
    {
      name: "Arjun",
      context: "Holds crypto and an apartment in Bangalore.",
      outcome: "One inheritance plan spanning on-chain and real-world assets.",
      metric: "1 plan, every asset class",
    },
    {
      name: "Renata",
      context: "Owns a 1932 Klee painting with eleven prior owners.",
      outcome: "A complete, verifiable chain of custody reconstructed on demand.",
      metric: "11 owners in 11 seconds",
    },
    {
      name: "Eight friends",
      context: "Co-own a beach house together.",
      outcome: "Real-time fractional co-ownership without forming a legal entity.",
      metric: "8-way ownership, 0 paperwork",
    },
    {
      name: "Kenji",
      context: "Selling a patent during an acquisition.",
      outcome: "Diligence that took weeks compressed into a single export.",
      metric: "80 hours → 1 click",
    },
  ] satisfies Scenario[],
};

/* ------------------------------------------------------------ 13 · the values */

export const values = {
  eyebrow: "What we believe",
  heading: "Conviction, stated as trade-offs.",
  // Antithesis lines: "X over Y".
  lines: [
    ["Truth", "comfort"],
    ["Cryptography", "committees"],
    ["Decades", "quarters"],
    ["Sovereignty", "convenience"],
    ["Boring infrastructure", "loud launches"],
    ["Demos", "slides"],
  ],
};

/* --------------------------------------------------------------- 14 · the bet */

export const bet = {
  eyebrow: "The bet",
  quote: "Civilizations survive when intelligence survives.",
  body: "Every private key that dies without a succession plan takes its wealth to the grave. We are building the layer that makes sure it doesn't have to. Inheritance is sacred — and for the first time, it can be cryptographic.",
  cta: {
    heading: "Your legacy starts soon.",
    sub: "Join early access and be among the first wallets on earth with an inheritance layer.",
    placeholder: "you@domain.com",
    button: "Request early access",
    fineprint: "No spam. Launch updates and beta invitations only.",
  },
};

/* ----------------------------------------------------------------- footer ---- */

export const footer = {
  blurb: site.tagline,
  columns: [
    {
      title: "Protocol",
      links: [
        { label: "Architecture", href: "#architecture" },
        { label: "Flagship registry", href: "#flagship" },
        { label: "Why Destiny", href: "#why" },
        { label: "The bet", href: "#bet" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Contact", href: "mailto:contact@destinypro.io" },
        { label: "Investors", href: "mailto:invest@destinypro.io" },
        { label: "Careers", href: "mailto:careers@destinypro.io" },
      ],
    },
  ],
};
