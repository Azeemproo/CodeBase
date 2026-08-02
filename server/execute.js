import express from 'express';
import axios from 'axios';
 
const router = express.Router();
 
router.post('/api/execute', async (req, res) => {
  const { code, language_id, stdin } = req.body;
 
  try {
    // Encode to base64 as Judge0 requires
    const encodedCode = Buffer.from(code || '').toString('base64');
    const encodedStdin = Buffer.from(stdin || '').toString('base64');
 
    const submission = await axios.post(
      'https://ce.judge0.com/submissions?base64_encoded=true&wait=true',
      {
        source_code: encodedCode,
        language_id: language_id || 71,
        stdin: encodedStdin
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
 
    // Decode the response fields back from base64
    const decode = (val) => (val ? Buffer.from(val, 'base64').toString('utf-8') : val);
 
    res.json({
      status: submission.data.status,
      stdout: decode(submission.data.stdout),
      stderr: decode(submission.data.stderr),
      compile_output: decode(submission.data.compile_output),
      time: submission.data.time,
      memory: submission.data.memory
    });
  } catch (err) {
    console.error('Judge0 error:', err.response?.data || err.message);
    res.status(500).json({
      error: 'Execution failed',
      details: err.response?.data || err.message
    });
  }
});
 
export default router;