#!/usr/bin/env node

const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { updateManifest } = require('../services/manifestService');

async function main() {
    console.log('Destiny 2 Manifest Update Tool');
    console.log('==============================\n');
    
    try {
        console.log('Checking for manifest updates...');
        const updated = await updateManifest();
        
        if (updated) {
            console.log('\n✅ Manifest updated successfully!');
        } else {
            console.log('\n✅ Manifest is already up to date.');
        }
        
        process.exit(0);
    } catch (error) {
        console.error('\n❌ Failed to update manifest:', error.message);
        process.exit(1);
    }
}

// Run the update
main();