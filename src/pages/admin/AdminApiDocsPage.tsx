import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function AdminApiDocsPage() {
    const token = localStorage.getItem("github_token") ?? "";

    return (
        <div className="min-h-screen bg-black text-cyan-300">
            <div className="p-6 border-b border-cyan-800/40">
                <h1 className="text-3xl font-bold">API Docs</h1>
                <p className="text-sm text-cyan-400/80">
                    Admin-only OpenAPI explorer. Carmel is watching. 😼
                </p>
            </div>

            <div className="p-4">
                <SwaggerUI
                    url="/openapi.json"
                    requestInterceptor={(req) => {
                        // Swagger UI uses fetch under the hood; inject bearer token.
                        if (token) req.headers["Authorization"] = `Bearer ${token}`;
                        return req;
                    }}
                />
            </div>
        </div>
    );
}
