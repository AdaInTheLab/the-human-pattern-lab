import {Panel} from "@/pages/admin/components/Panel";
import { StatusRow} from "@/pages/admin/components/StatusRow";

export function AdminDashboardPage() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Panel title="System Status">
                <div className="space-y-2">
                    <StatusRow label="API" value="Online" />
                    <StatusRow label="Auth" value="Session" />
                    <StatusRow label="Env" value={import.meta.env.MODE} />
                </div>
            </Panel>

            <Panel title="AdminNotesPage Scope">
                <p className="text-sm text-zinc-400">
                    You are operating with elevated permissions.
                </p>
            </Panel>

            <Panel title="Future Controls" muted>
                <p className="italic text-zinc-600">
                    Awaiting authorization…
                </p>
            </Panel>
        </section>
    );
}
