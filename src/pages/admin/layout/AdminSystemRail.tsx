import { SystemToggle } from '../helpers';


export function AdminSystemRail() {
    return (
        <aside className="w-72 border-l border-zinc-800 bg-zinc-950 p-4 hidden xl:block">
            <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-4">
                System
            </h2>

            <div className="space-y-4">
                <SystemToggle label="Maintenance Mode" disabled />
                <SystemToggle label="Read-Only Mode" disabled />
                <SystemToggle label="Danger Zone" danger disabled />
            </div>
        </aside>
    );
}
