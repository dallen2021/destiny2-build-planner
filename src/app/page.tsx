import Link from "next/link";
import { Database, GitBranch, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <section className="home-workspace">
      <div className="home-heading">
        <p className="eyebrow">Destiny 2</p>
        <h1>Build Planner</h1>
        <p>
          Fresh Next.js foundation for Bungie auth, live inventory reads, and
          the build optimization work coming after the final update lands.
        </p>
      </div>

      <div className="ops-grid" aria-label="Rebuild status">
        <div className="ops-panel">
          <ShieldCheck size={20} />
          <span>Bungie OAuth</span>
          <strong>Session boundary ready</strong>
        </div>
        <div className="ops-panel">
          <Database size={20} />
          <span>Inventory</span>
          <strong>Armor normalization wired</strong>
        </div>
        <div className="ops-panel">
          <GitBranch size={20} />
          <span>Deployment</span>
          <strong>Main production, dev preview</strong>
        </div>
      </div>

      <div className="home-actions">
        <Link className="primary-action" href="/api/auth/login">
          <ShieldCheck size={16} />
          Connect Bungie
        </Link>
        <Link className="secondary-action" href="/inventory">
          <Database size={16} />
          Open inventory
        </Link>
      </div>
    </section>
  );
}
