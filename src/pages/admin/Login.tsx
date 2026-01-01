/* ===========================================================
   🌌 HUMAN PATTERN LAB — SOURCE FILE METADATA
   -----------------------------------------------------------
   Author: Ada Vale (Founder, The Human Pattern Lab)
   Assistant: Vesper (AI Lab Companion)
   File: Login.tsx
   Purpose: Renders the GitHub login gate for the Shadow Fox Admin Den.
   =========================================================== */

/**
 * @file Login.tsx
 * @author Ada Vale
 * @assistant Vesper
 * @lab-unit SCMS — Systems & Communication Meta-Structure
 * @status Active
 * @since 2025-12-20
 * @description The entry point to the Admin Den, guarded by GitHub OAuth.
 *              Displays a lore-flavored "summon the shadows" prompt and initiates
 *              the authentication flow. Only the worthy pass Carmel's squint.
 */

import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="p-8 bg-black text-cyan-300 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl mb-6">Shadow Fox Den</h1>
            <p className="text-lg mb-8">Only the worthy enter...</p>
            <a
                href="/auth/github"
                className="bg-purple-600 px-8 py-4 rounded-lg text-xl hover:bg-purple-700"
            >
                Login with GitHub
            </a>
        </div>
    );
};

export default Login;