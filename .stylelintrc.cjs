/**
 * 🐾 Carmel CSS Judgment Rules (Correctness > Aesthetics)
 * Chief Judgment Officer: Carmel
 */
module.exports = {
    extends: [
        "stylelint-config-recommended",
        "stylelint-config-tailwindcss",
    ],
    rules: {
        "no-descending-specificity": null, // Tailwind-friendly
    },
};
