import fs from 'fs';
import path from 'path';

function walk(dir: string) {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let altered = false;
  
  if (content.includes('#da251d') || content.includes('#1a1a1a') || content.includes('font-serif') || content.includes('HB Insights') || content.includes('HB<span') || content.includes('HBInsights')) {
    content = content.replace(/#da251d/g, '#22d3ee');
    content = content.replace(/#1a1a1a/g, '#0f172a');
    content = content.replace(/bg-\[\#fcf8f8\]/g, 'bg-[#0f172a]');
    content = content.replace(/font-serif/g, 'font-display');
    content = content.replace(/HB Insights/g, 'BH Insights');
    content = content.replace(/HB<span/g, 'BH<span');
    content = content.replace(/HBInsights/g, 'BHInsights');
    content = content.replace(/HB(?=Tips)/g, 'BH');
    content = content.replace(/border-black/g, 'border-indigo-500/20');
    
    fs.writeFileSync(file, content, 'utf8');
    altered = true;
  }
});
console.log("Colors and fonts updated!");
