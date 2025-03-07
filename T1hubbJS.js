:root {
    --primary-color: #E2231A;
    --secondary-color: #00A2FF;
    --text-color: #ffffff;
    --bg-color: #0A0A0A;
    --card-bg: #161616;
    --nav-bg: #111111;
    --hover-color: #1F1F1F;
    --border-color: #333;
    --accent-color: #FFD700;
    --gradient: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background: var(--bg-color);
}

nav {
    background: rgba(17, 17, 17, 0.8);
    padding: 1rem 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
}

.logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
    font-size: 1.4rem;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.logo-image {
    width: 45px;
    height: 45px;
    object-fit: contain;
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
}

nav ul {
    display: flex;
    list-style: none;
    gap: 2rem;
}

nav a {
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    transition: color 0.3s;
}

nav a:hover {
    color: var(--primary-color);
}

main {
    margin-top: 70px;
}

.hero {
    background: var(--bg-color);
    position: relative;
    overflow: hidden;
    color: white;
    text-align: center;
    padding: 4rem 2rem;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient);
    opacity: 0.1;
    z-index: 0;
}

.hero > * {
    position: relative;
    z-index: 1;
}

.hero h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: titleFloat 3s ease-in-out infinite;
}

@keyframes titleFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.hero p {
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
}

.cta-button {
    background: var(--gradient);
    color: white;
    border: none;
    padding: 1.2rem 2.5rem;
    font-size: 1.2rem;
    border-radius: 50px;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(226, 35, 26, 0.3);
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.features {
    padding: 4rem 2rem;
    background: var(--bg-color);
}

.features h2 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    background: var(--card-bg);
    padding: 2.5rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    position: relative;
    overflow: hidden;
}

.feature-card:hover {
    transform: translateY(-10px);
    border-color: var(--primary-color);
}

.feature-card::before {
    content: '';
    position: absolute;
    top: var(--mouse-y);
    left: var(--mouse-x);
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    transform: translate(-50%, -50%);
    pointer-events: none;
}

.feature-icon {
    width: 60px;
    height: 60px;
    padding: 12px;
    background: var(--gradient);
    border-radius: 50%;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
}

.download {
    padding: 4rem 2rem;
    text-align: center;
}

.download h2 {
    margin-bottom: 3rem;
    font-size: 2.5rem;
}

.download-options {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.download-card {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 10px;
    min-width: 250px;
    border: 1px solid var(--border-color);
}

.download-button {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 5px;
    margin-top: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.download-button:hover {
    background: #c41e16;
}

.support {
    background: var(--secondary-color);
    color: white;
    text-align: center;
    padding: 4rem 2rem;
}

.support-button {
    background: white;
    color: var(--secondary-color);
    border: none;
    padding: 1rem 2rem;
    border-radius: 5px;
    margin-top: 2rem;
    cursor: pointer;
    transition: transform 0.3s;
}

.support-button:hover {
    transform: scale(1.05);
}

.copy-section {
    background: var(--card-bg);
    padding: 3rem;
    border-radius: 15px;
    max-width: 800px;
    margin: 2rem auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.copy-section h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    background: var(--gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.copy-section p {
    color: #ccc;
    margin-bottom: 2rem;
}

.code-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: rgba(0, 0, 0, 0.3);
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    margin: 1.5rem 0;
}

.code-container + .code-container {
    margin-top: 1rem;
}

.code-text {
    flex-grow: 1;
    font-family: 'Consolas', monospace;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-color);
    padding: 1rem;
    width: 100%;
    border-radius: 8px;
    font-size: 1rem;
    cursor: default;
}

.copy-button {
    background: var(--gradient);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
}

.copy-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(226, 35, 26, 0.4);
}

.copy-button.copied {
    background: #28a745;
}

.revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

.coming-soon {
    padding: 4rem 2rem;
    text-align: center;
    background: var(--bg-color);
    position: relative;
    overflow: hidden;
}

.gen2-image {
    max-width: 600px;
    width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    margin-bottom: 2rem;
    transition: transform 0.3s ease;
}

.gen2-image:hover {
    transform: scale(1.02);
}

.soon-text {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--text-color);
    animation: pulseText 2s ease-in-out infinite;
}

@keyframes pulseText {
    0%, 100% { 
        opacity: 1;
        transform: scale(1);
    }
    50% { 
        opacity: 0.7;
        transform: scale(1.05);
    }
}

footer {
    background: var(--nav-bg);
    color: white;
    padding: 3rem 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}

.footer-content {
    display: flex;
    justify-content: center;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-section h4 {
    margin-bottom: 1rem;
}

.footer-section ul {
    list-style: none;
}

.footer-section a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-section a:hover {
    color: white;
}

@media (max-width: 768px) {
    nav ul {
        display: none;
    }
    
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
    }
    
    .copy-section {
        margin: 1rem;
        padding: 1.5rem;
    }
    
    .code-container {
        flex-direction: column;
    }
    
    .copy-button {
        width: 100%;
        margin-top: 0.5rem;
    }
}
