import { Panel } from "@/pages/admin/components/Panel";
import { useNavigate } from "react-router-dom";

export function AdminDeniedPage() {
    const navigate = useNavigate();

    return (
        <div className="max-w-xl space-y-6">
            <Panel title="Access Denied" muted>
                <div className="space-y-4">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        You are authenticated, but you do not have permission to enter the
                        Admin Control Room.
                    </p>

                    <p className="text-sm text-zinc-500 italic">
                        Carmel squints. The door remains closed.
                    </p>

                    <div className="pt-2">
                        <button
                            onClick={() => navigate("/")}
                            className="
                text-sm font-medium
                text-cyan-400 hover:text-cyan-300
                transition-colors
              "
                        >
                            Return to the Lab
                        </button>
                    </div>
                </div>
            </Panel>
        </div>
    );
}
