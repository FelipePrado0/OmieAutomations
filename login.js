const { chromium } = require('playwright');
const path = require('path');
const { exec } = require('child_process');

async function loginOmie() {
    console.log('🌸 Felipe-chan, preparando seu Chrome real! ✨');

    // Garante que o Chrome está fechado para liberar o perfil
    await new Promise(r => exec('taskkill /F /IM chrome.exe /T', (err) => r()));
    await new Promise(r => setTimeout(r, 2000));

    const userDataDir = path.join(process.env.LOCALAPPDATA, 'Google/Chrome/User Data');
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

    try {
        const context = await chromium.launchPersistentContext(userDataDir, {
            executablePath: chromePath,
            headless: false,
            // IMPORTANTE: remove a flag de automação para o Chrome carregar sua conta real!
            ignoreDefaultArgs: ['--enable-automation'],
            args: [
                '--start-maximized',
                '--profile-directory=Default'
            ],
            viewport: null
        });

        const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

        console.log('🚀 Voando para o OMIE com sua conta logada...');

        await page.goto('https://app.omie.com.br/gestao/kip-58vjq760/#VEN', {
            waitUntil: 'networkidle',
            timeout: 60000
        });

        console.log('✅ Pronto! Agora você deve estar vendo o seu OMIE de verdade! 💕🌷');

    } catch (error) {
        console.error('❌ Erro ao abrir o Chrome:', error.message);
        console.log('Verifique se o Chrome está fechado e tente novamente! ✨');
    }
}

loginOmie();
