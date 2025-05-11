// frontend/src/components/ControlPanel.tsx
import { useConfig } from "../hooks/useConfig";

const profiles = ["eco", "balanced", "performance"] as const;

export function ControlPanel() {
    const { cfg, update } = useConfig();

    if (!cfg) return <p>Loading config…</p>;

    return (
        <div className="p-4 space-y-2">
            <label className="block text-sm">
                Compute profile:
                <select
                    className="ml-2 border rounded px-1 py-0.5"
                    value={cfg.compute_profile}
                    onChange={e => update({ compute_profile: e.target.value })}
                >
                    {profiles.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                </select>
            </label>
        </div>
    );
}
