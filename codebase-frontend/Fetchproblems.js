// fetchProblems.js
// Run this ONCE with: node fetchProblems.js
// It fetches 25 problems (with full question HTML) from your local
// alfa-leetcode-api and saves them into problemlist.json
 
import fs from 'fs';
 
const LIMIT = 25;
 
async function main() {
  console.log('Fetching problem list...');
  const listRes = await fetch(`http://localhost:3001/problems?limit=${LIMIT}`);
  const listData = await listRes.json();
 
  const questions = listData.problemsetQuestionList;
  console.log(`Got ${questions.length} problems. Fetching full details for each...`);
 
  const fullProblems = [];
 
  for (const q of questions) {
    console.log(`Fetching: ${q.titleSlug}`);
    try {
      const detailRes = await fetch(`http://localhost:3001/select?titleSlug=${q.titleSlug}`);
      const detailData = await detailRes.json();
 
      fullProblems.push({
        questionFrontendId: q.questionFrontendId,
        title: q.title,
        titleSlug: q.titleSlug,
        difficulty: q.difficulty,
        acRate: q.acRate,
        question: detailData.question, // full HTML description
      });
    } catch (err) {
      console.error(`Failed to fetch ${q.titleSlug}:`, err.message);
    }
  }
 
  const output = { problemsetQuestionList: fullProblems };
 
  fs.writeFileSync('./problemlist.json', JSON.stringify(output, null, 2));
  console.log(`Done! Saved ${fullProblems.length} problems to problemlist.json`);
}
 
main();