// This is a Netlify Function. It runs on the server, not in the browser.
// This is where your secret API key is kept safe.

exports.handler = async function(event, context) {
    // 1. Get the assetName and apiKey from the request sent by the front-end.
    const { assetName, apiKey } = JSON.parse(event.body);

    // Use the user-provided API key, or fall back to the one set in Netlify's environment variables.
    const effectiveApiKey = apiKey || process.env.GEMINI_API_KEY;

    if (!effectiveApiKey) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'API key is missing.' })
        };
    }

    // In a real application, this is where you would make a secure call to the Gemini API
    // using the 'effectiveApiKey'. For this simulation, we will replicate the analysis logic.
    // The key point is that this logic runs on the server, hiding the API key from the user.

    const [name, tld] = assetName.toLowerCase().split('.');
    
    // --- Simulated Analysis Logic (This runs securely on the server) ---
    const scores = {
        Bedrock: Math.max(3, 10 - Math.floor(name.length / 2.5)),
        Story: 5 + Math.floor(Math.random() * 5),
        Compass: 5 + Math.floor(Math.random() * 5),
        Current: 6 + Math.floor(Math.random() * 4),
        Lightning: 5 + Math.floor(Math.random() * 5)
    };
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const getSparkGrade = (score) => {
        if (score >= 45) return 'A+ (Foundational Landmark)';
        if (score >= 40) return 'A (Core Landmark)';
        if (score >= 35) return 'A- (Prime Asset)';
        if (score >= 30) return 'B+ (Strong Asset)';
        return 'Curation Pass';
    };

    let locusGrade = 'B';
    if (['com', 'im', 'ai', 'io', 'art', 'eco', 'earth'].includes(tld)) locusGrade = 'A';
    if (['xyz', 'co'].includes(tld)) locusGrade = 'C';

    const report = {
        echo: { grade: 'B', analysis: `The chamber finds a strong positive resonance around '${name}'. Its primal feel is direct, it evokes a clear founder vision, and its narrative potential is significant.` },
        spark: {
            sieve: { recommendation: 'Curate', rationale: `The asset has clear commercial potential.` },
            analysis: {
                Bedrock: { score: scores.Bedrock, rationale: `A strong linguistic foundation. Its ${name.length > 7 ? 'length is a minor liability' : 'brevity is a major asset'}.` },
                Story: { score: scores.Story, rationale: 'The narrative is compelling, suggesting a brand built on a powerful mission.' },
                Compass: { score: scores.Compass, rationale: `Establishes immediate authority in its niche.` },
                Current: { score: scores.Current, rationale: `The name aligns perfectly with current cultural trends.` },
                Lightning: { score: scores.Lightning, rationale: `The "Aha!" is the satisfying recognition of a name that perfectly encapsulates a vision.` }
            },
            locus: { grade: locusGrade, rationale: `The .${tld} TLD is a solid, modern choice.` },
            cartography: { summary: `Initial checks suggest social handles for '${name}' are likely taken, requiring creative modifiers.` },
            totalScore: totalScore,
            finalGrade: getSparkGrade(totalScore),
            alistairNote: { profile: 'The Keystone', insight: `A versatile, all-around strong asset with a good story and solid commercial potential.` }
        },
        shadow: { score: 'Low', analysis: `The Conceptual Shadow is minimal. Any primary risk lies in the Associative Shadow of the .${tld} TLD.` },
        ignition: {
            myth: `To build the definitive platform for creative collaboration, making complex systems accessible and human-centric.`,
            archetype: 'The Systems Thinker: A founder who sees the big picture.',
            moat: 'The name\'s primary moat is its clarity and authority.',
            moves: ['Publish a founding manifesto.', 'Secure key social media handles.', 'Begin building a community.']
        }
    };
    // --- End Simulated Analysis ---

    // 2. Send the finished report back to the front-end as JSON.
    return {
        statusCode: 200,
        body: JSON.stringify(report)
    };
};
