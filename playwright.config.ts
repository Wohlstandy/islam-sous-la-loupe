import { defineConfig, devices } from '@playwright/test';
const port=4173;
const prefix=process.env.NEXT_PUBLIC_BASE_PATH||'';
const origin='http://127.0.0.1:'+port;
export default defineConfig({
 testDir:'./tests/e2e',
 use:{baseURL:origin+prefix+'/',trace:'retain-on-failure'},
 webServer:{command:'npm run preview',url:origin+prefix+'/',reuseExistingServer:false,env:{PORT:String(port)}},
 projects:[{name:'Ordinateur',use:{...devices['Desktop Chrome']}},{name:'Mobile',use:{...devices['Pixel 7']}}],
});
