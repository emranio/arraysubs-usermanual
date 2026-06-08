#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const MARKDOWNS = path.join(ROOT, "markdowns");
const TODAY = "2026-06-04";

const ignored = new Set(["menu.json", "index-plan.md", "writing-format.md"]);

const sectionMeta = {
  analytics: {
    module: "Analytics",
    availability: "Pro",
    screen: "WordPress Admin -> ArraySubs -> Reports and WooCommerce -> Analytics",
  },
  "audits-and-logs": {
    module: "Audits and Logs",
    availability: "Pro",
    screen: "WordPress Admin -> ArraySubs -> Audits [beta]",
  },
  "billing-and-renewals": {
    module: "Billing and Renewals",
    availability: "Shared",
    screen: "WordPress Admin -> ArraySubs -> Subscriptions",
  },
  "checkout-and-payments": {
    module: "Checkout and Payments",
    availability: "Shared",
    screen: "Storefront checkout and WordPress Admin -> ArraySubs -> Checkout Builder",
  },
  "customer-portal": {
    module: "Customer Portal",
    availability: "Shared",
    screen: "Storefront -> My Account -> Subscriptions",
  },
  emails: {
    module: "Emails",
    availability: "Shared",
    screen: "WordPress Admin -> WooCommerce -> Settings -> Emails",
  },
  "feature-manager": {
    module: "Feature Manager",
    availability: "Pro",
    screen: "WordPress Admin -> Products -> Edit Product and ArraySubs -> Settings -> Feature Manager",
  },
  "getting-started": {
    module: "Getting Started",
    availability: "Shared",
    screen: "WordPress Admin -> ArraySubs",
  },
  "manage-members": {
    module: "Manage Members",
    availability: "Pro",
    screen: "WordPress Admin -> ArraySubs -> Manage Members",
  },
  "manage-subscriptions": {
    module: "Subscription Admin",
    availability: "Shared",
    screen: "WordPress Admin -> ArraySubs -> Subscriptions",
  },
  "member-access": {
    module: "Member Access",
    availability: "Shared",
    screen: "WordPress Admin -> ArraySubs -> Member Access",
  },
  "profile-builder": {
    module: "Profile Builder",
    availability: "Shared",
    screen: "WordPress Admin -> ArraySubs -> Profile Builder",
  },
  "retention-and-refunds": {
    module: "Retention and Refunds",
    availability: "Shared",
    screen: "WordPress Admin -> ArraySubs -> Retention Flow",
  },
  settings: {
    module: "Settings",
    availability: "Shared",
    screen: "WordPress Admin -> ArraySubs -> Settings",
  },
  shortcodes: {
    module: "Shortcodes",
    availability: "Shared",
    screen: "WordPress Admin -> ArraySubs -> Shortcodes",
  },
  "store-credit": {
    module: "Store Credit",
    availability: "Pro",
    screen: "WordPress Admin -> ArraySubs -> Store Credit",
  },
  "subscription-products": {
    module: "Subscription Products",
    availability: "Shared",
    screen: "WordPress Admin -> Products -> Add/Edit Product",
  },
};

const routeHints = new Map([
  ["getting-started/easy-setup-wizard.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/easy-setup"],
  ["settings/general-settings.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/general"],
  ["settings/toolkit-settings.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/toolkit"],
  ["manage-subscriptions/subscription-operations.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/subscriptions"],
  ["manage-subscriptions/subscription-detail-cards.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/subscriptions/detail/{subscription_id}"],
  ["member-insight/README.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/manage-members"],
  ["store-credit/store-credit-management.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/store-credit"],
  ["store-credit/credit-history.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/store-credit/history"],
  ["store-credit/store-credit-settings.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/store-credit/settings"],
  ["member-access/access-rules.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access"],
  ["member-access/commerce-and-benefit-rules.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/discount-rules"],
  ["member-access/session-and-frontend-controls.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/members-access/login-limit"],
  ["profile-builder/profile-form.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/profile-builder/profile-form"],
  ["profile-builder/my-account-editor.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/profile-builder/my-account"],
  ["retention-and-refunds/cancellation-setup.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/retention-flow"],
  ["retention-and-refunds/retention-offers.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/retention-flow"],
  ["checkout-and-payments/checkout-builder/README.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/checkout-builder"],
  ["checkout-and-payments/checkout-builder/field-types.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/checkout-builder"],
  ["checkout-and-payments/checkout-builder/use-cases.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/checkout-builder"],
  ["audits-and-logs/activity-audits.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/activity-audits"],
  ["audits-and-logs/scheduled-job-logs.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/scheduled-job-logs"],
  ["gateway-health/README.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/settings/gateways"],
  ["audits-and-logs/renewal-failures.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/renewal-failures"],
  ["audits-and-logs/portal-action-failures.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/portal-action-failures"],
  ["audits-and-logs/access-rule-conflicts.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/audits/access-rule-conflicts"],
  ["analytics/reports-hub.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/reports"],
  ["analytics/subscription-performance.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/reports"],
  ["shortcodes/README.md", "/wp-admin/admin.php?page=arraysubs-mainadmin#/shortcodes"],
]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const rel = path.relative(MARKDOWNS, full).replaceAll(path.sep, "/");
      if (!ignored.has(rel)) files.push({ full, rel });
    }
  }
  return files.sort((a, b) => a.rel.localeCompare(b.rel));
}

function sectionOf(rel) {
  return rel.includes("/") ? rel.split("/")[0] : "";
}

function headingOf(content, fallback) {
  const lines = content.split("\n");
  let inInfo = lines[0]?.trim() === "# Info";
  for (const line of lines) {
    if (inInfo) {
      if (line.startsWith("# ") && line.trim() !== "# Info") {
        inInfo = false;
      } else {
        continue;
      }
    }
    if (line.startsWith("# ") && line.trim() !== "# Info") {
      return line.replace(/^#\s+/, "").trim();
    }
  }
  return fallback;
}

function availabilityOf(content, rel, section) {
  const explicit = content.match(/\*\*Availability:\*\*\s*([^\n]+)/i);
  if (explicit) return explicit[1].replace(/\s*\([^)]*\)\s*/g, "").trim();
  const meta = content.match(/^- Availability:\s*(.+)$/m);
  if (meta) return meta[1].trim();
  if (/\bPro\b|\*\(Pro\)\*|\*\*Pro\*\*/.test(content) || rel.includes("automatic-payments")) return "Pro";
  return sectionMeta[section]?.availability || "Shared";
}

function infoBlock(module, availability) {
  return `# Info\n- Module: ${module}\n- Availability: ${availability}\n- Last updated: ${TODAY}\n\n`;
}

function relLink(fromRel, toRel) {
  const fromDir = path.posix.dirname(fromRel);
  let link = path.posix.relative(fromDir, toRel);
  if (!link.startsWith(".")) link = `./${link}`;
  return link;
}

function sectionIndexLink(rel, section) {
  if (!section) return null;
  const target = `${section}/README.md`;
  if (rel === target) return relLink(rel, "README.md");
  return relLink(rel, target);
}

function adjacentLinks(rel, ordered) {
  const index = ordered.indexOf(rel);
  return {
    prev: index > 0 ? ordered[index - 1] : null,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null,
  };
}

function navBlock({ rel, title, section, screen, route, ordered }) {
  const overview = sectionIndexLink(rel, section);
  const { prev, next } = adjacentLinks(rel, ordered);
  const rootPrefix = rel.includes("/") ? "../".repeat(rel.split("/").length - 1) : "";
  const lines = ["## Page Navigation", ""];

  if (rel === "README.md") {
    lines.push("- **Manual home:** Start here for the complete ArraySubs and ArraySubsPro documentation map.");
    lines.push("- **First setup path:** [Before You Launch](getting-started/before-you-launch.md) -> [Easy Setup Wizard](getting-started/easy-setup-wizard.md) -> [First-Time Setup](getting-started/first-time-setup.md)");
    lines.push("- **Daily admin path:** [Subscription Operations](manage-subscriptions/subscription-operations.md) -> [Subscription Detail Cards](manage-subscriptions/subscription-detail-cards.md) -> [Lifecycle Management](manage-subscriptions/lifecycle-management.md)");
    lines.push("- **Troubleshooting path:** [Audits, Logs, and Troubleshooting](audits-and-logs/README.md)");
    return `${lines.join("\n")}\n\n`;
  }

  lines.push(`- **Current guide:** ${title}`);
  lines.push(`- **Where to open it:** ${screen}`);
  if (route) lines.push(`- **Direct route:** \`${route}\``);
  if (overview) lines.push(`- **Section overview:** [Open overview](${overview})`);
  if (prev) lines.push(`- **Previous guide:** [${headingOf("", path.basename(prev, ".md"))}](${relLink(rel, prev)})`);
  if (next) lines.push(`- **Next guide:** [${headingOf("", path.basename(next, ".md"))}](${relLink(rel, next)})`);
  lines.push(`- **Troubleshooting:** [Audits, Logs, and Troubleshooting](${rootPrefix}audits-and-logs/README.md)`);
  return `${lines.join("\n")}\n\n`;
}

function insertAfterAvailability(content, nav) {
  if (content.includes("\n## Page Navigation\n")) return content;

  const lines = content.split("\n");
  let insertAt = -1;
  for (let i = 0; i < Math.min(lines.length, 30); i += 1) {
    if (/^\*\*Availability:\*\*/.test(lines[i])) {
      insertAt = i + 1;
      break;
    }
  }
  if (insertAt === -1) {
    const h1 = lines.findIndex((line) => line.startsWith("# ") && line.trim() !== "# Info");
    insertAt = h1 >= 0 ? h1 + 1 : 0;
    for (let i = insertAt; i < Math.min(lines.length, insertAt + 8); i += 1) {
      if (lines[i].startsWith(">") || lines[i].trim() === "") insertAt = i + 1;
      if (/^\*\*Availability:\*\*/.test(lines[i])) {
        insertAt = i + 1;
        break;
      }
    }
  }

  lines.splice(insertAt, 0, "", nav.trimEnd());
  return `${lines.join("\n").replace(/\n{4,}/g, "\n\n\n").trimEnd()}\n`;
}

async function main() {
  const files = await walk(MARKDOWNS);
  const ordered = files.map((file) => file.rel);

  for (const file of files) {
    let content = await fs.readFile(file.full, "utf8");
    const section = sectionOf(file.rel);
    const sectionDefaults = sectionMeta[section] || {
      module: "User Manual",
      availability: "Shared",
      screen: "ArraySubs documentation",
    };
    const title = headingOf(content, file.rel === "README.md" ? "ArraySubs User Manual" : path.basename(file.rel, ".md"));
    const availability = availabilityOf(content, file.rel, section);
    const module = sectionDefaults.module;

    if (!content.startsWith("# Info\n")) {
      content = `${infoBlock(module, availability)}${content}`;
    }

    const nav = navBlock({
      rel: file.rel,
      title,
      section,
      screen: sectionDefaults.screen,
      route: routeHints.get(file.rel),
      ordered,
    });
    content = insertAfterAvailability(content, nav);

    await fs.writeFile(file.full, content, "utf8");
  }

  console.log(`Updated ${files.length} markdown pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
